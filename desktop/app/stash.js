// Stash (inventory) helpers. Pure functions, no DOM.
// stash = { items: [{id, name, brand, profile, base, remainingMl, bottleMl, price, lowMl, purchases:[{at, ml, price}]}],
//           base: { pg: {remainingMl, bottleMl, price}, vg: {...}, nic: {...} }, currency }

const BASE_KEYS = ["nic", "pg", "vg"];
const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function itemLabel(it) { return it.brand ? `${it.name} (${it.brand})` : it.name; }

/** Find the stash item a recipe flavour name refers to: exact label first, then plain name. */
function matchItem(items, flavourName) {
  const n = norm(flavourName);
  if (!n) return null;
  const pick = (list) => list.sort((a, b) => (b.remainingMl || 0) - (a.remainingMl || 0))[0] || null;
  return pick(items.filter((it) => norm(itemLabel(it)) === n)) || pick(items.filter((it) => norm(it.name) === n));
}

/** Price per ml from the bottle price and size, or null when unknown. */
function perMl(x) { return x && x.price > 0 && x.bottleMl > 0 ? x.price / x.bottleMl : null; }

/**
 * Compare a calculated batch (rows from calc) with the stash.
 * Returns lines [{kind, name, needMl, haveMl, item?, status: "ok"|"short"|"missing"|"untracked", cost}]
 * plus totals: cost (known parts), costComplete (all priced), canMix.
 */
function stockCheck(rows, stash) {
  const lines = [];
  let cost = 0, costComplete = true, canMix = true;
  const usedSoFar = {}; // a flavour listed twice draws on the same bottle
  for (const r of rows) {
    let line;
    if (r.kind === "flav") {
      const it = matchItem(stash.items, r.fname);
      if (!it) line = { kind: "flav", name: r.name, needMl: r.ml, haveMl: 0, status: "missing" };
      else {
        const have = Math.max(0, (it.remainingMl || 0) - (usedSoFar[it.id] || 0));
        usedSoFar[it.id] = (usedSoFar[it.id] || 0) + r.ml;
        line = { kind: "flav", name: r.name, needMl: r.ml, haveMl: have, item: it, status: have + 1e-9 >= r.ml ? "ok" : "short", unit: perMl(it) };
      }
    } else if (BASE_KEYS.includes(r.kind)) {
      const b = stash.base[r.kind] || {};
      const tracked = b.remainingMl != null && b.remainingMl !== "";
      line = { kind: r.kind, name: r.name, needMl: r.ml, haveMl: tracked ? +b.remainingMl : null, status: !tracked ? "untracked" : (+b.remainingMl + 1e-9 >= r.ml ? "ok" : "short"), unit: perMl(b) };
    } else {
      line = { kind: r.kind, name: r.name, needMl: r.ml, haveMl: null, status: "untracked", unit: null };
    }
    if (line.status === "missing" || line.status === "short") canMix = false;
    if (line.unit != null) { line.cost = line.unit * r.ml; cost += line.cost; }
    else if (r.kind !== "other") costComplete = false;
    lines.push(line);
  }
  return { lines, cost, costComplete, canMix };
}

/**
 * Take a mixed batch out of the stash. Returns { stash, used } where used records exactly what was
 * removed (never more than was there), so the mix can be undone.
 */
function applyMix(stash, rows) {
  const s = structuredClone(stash), used = [];
  for (const r of rows) {
    if (r.kind === "flav") {
      const it = matchItem(s.items, r.fname);
      if (!it) continue;
      const take = Math.min(it.remainingMl || 0, r.ml);
      it.remainingMl = round3((it.remainingMl || 0) - take);
      used.push({ kind: "flav", id: it.id, ml: take });
    } else if (BASE_KEYS.includes(r.kind)) {
      const b = s.base[r.kind];
      if (!b || b.remainingMl == null || b.remainingMl === "") continue;
      const take = Math.min(+b.remainingMl, r.ml);
      b.remainingMl = round3(+b.remainingMl - take);
      used.push({ kind: r.kind, ml: take });
    }
  }
  return { stash: s, used };
}

function undoMix(stash, used) {
  const s = structuredClone(stash);
  for (const u of used) {
    if (u.kind === "flav") { const it = s.items.find((x) => x.id === u.id); if (it) it.remainingMl = round3((it.remainingMl || 0) + u.ml); }
    else if (s.base[u.kind] && s.base[u.kind].remainingMl != null) s.base[u.kind].remainingMl = round3(+s.base[u.kind].remainingMl + u.ml);
  }
  return s;
}

/**
 * Record a purchase of `bottles` bottles of `ml` each at `price` per bottle. Adds to stock and updates
 * the bottle size and price used for costs.
 */
function addPurchase(item, ml, price, at, bottles = 1) {
  const it = structuredClone(item);
  const n = Math.max(1, Math.floor(bottles) || 1);
  it.remainingMl = round3((it.remainingMl || 0) + ml * n);
  if (ml > 0) it.bottleMl = ml;
  if (price > 0) it.price = price;
  if (ml > 0) it.purchases = [...(it.purchases || []), { at: at || Date.now(), ml: ml * n, bottles: n, bottleMl: ml, price: price > 0 ? price : null }];
  return it;
}

/** Split stock into full bottles plus what's left in the open one. Null when the bottle size is unknown. */
function bottlesOnHand(it) {
  const size = +it.bottleMl, rem = Math.max(0, +it.remainingMl || 0);
  if (!(size > 0)) return null;
  let full = Math.floor((rem + 1e-6) / size), open = round3(rem - full * size);
  if (open < 0.05) open = 0;
  return { full, openMl: open };
}

function describeBottles(it) {
  const b = bottlesOnHand(it);
  if (!b) return "";
  const fullTxt = b.full ? `${b.full} full bottle${b.full === 1 ? "" : "s"}` : "";
  const openTxt = b.openMl ? `${+b.openMl.toFixed(1)} ml in the open one` : "";
  if (!fullTxt && !openTxt) return "Empty";
  return [fullTxt, openTxt].filter(Boolean).join(" + ");
}

function isLow(it) { return (it.remainingMl || 0) <= (it.lowMl != null ? it.lowMl : 5); }

const round3 = (n) => Math.round(n * 1000) / 1000;

if (typeof module !== "undefined") module.exports = { itemLabel, matchItem, perMl, stockCheck, applyMix, undoMix, addPurchase, bottlesOnHand, describeBottles, isLow, norm };
