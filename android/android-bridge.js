// Gives the page the same window.juiceStore API the desktop app gets from Electron's preload script.
(function () {
  const B = window.AndroidBridge;
  if (!B) return;
  let exportResolve = null, importResolve = null;
  window.__juiceExportDone = (ok) => { const r = exportResolve; exportResolve = null; if (r) r(!!ok); };
  window.__juiceImportDone = (text) => {
    const r = importResolve; importResolve = null; if (!r) return;
    if (text == null) return r(null);
    try { r(JSON.parse(text)); } catch { r({ recipes: "invalid" }); }
  };
  window.juiceStore = {
    version: B.version(),
    savedWhere: "Saved on this phone",
    backupNote: "A backup of your old data was kept inside the app.",
    get: (key) => { const v = B.get(key); return v == null ? null : JSON.parse(v); },
    set: (key, value) => { if (!B.set(key, JSON.stringify(value))) throw new Error("save failed"); },
    backup: () => B.backup(),
    copy: (text) => B.copy(String(text)),
    exportRecipes: (payload) => new Promise((resolve) => {
      exportResolve = resolve;
      const stamp = new Date().toISOString().slice(0, 10);
      B.exportFile(`juice-calc-recipes-${stamp}.json`, JSON.stringify({ app: "juice-calc", format: 2, ...payload }, null, 2));
    }),
    importRecipes: () => new Promise((resolve) => { importResolve = resolve; B.importFile(); }),
  };
})();
