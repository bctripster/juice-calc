# Juice Calc (desktop)

Electron app for Linux. All data is saved to `~/.config/juice-calc/juicecalc.json`
(File > Open data folder in the app): recipes, nicotine base settings, flavour stash and mix log.

- Run from source: `npm install && npm start`
- Build the AppImage: `npm run dist` (output in `dist/`)
- Versioning: bump the last number for each build (1.0.1, 1.0.2, ...) until a major feature release.

## Files
- `app/index.html`: the UI and mixing maths
- `app/stash.js`: stock matching, deductions, undo, costs
- `app/pairings.js`: flavour types, keyword detection and the built-in pairing guide

## Changes
- 1.0.7: "By volume / By weight" switch on the mixing sheet (saved as supplies.mixBy, volume by default).
  Volume mode hides grams and shows running bottle readings in ml; copied recipe text follows the mode.
- 1.0.6: Suggested steep time on the Mix screen, based on the slowest flavour type in the recipe (rules in
  pairings.js, STEEP_BY_FAMILY / STEEP_BY_PROFILE), with a "Use N days" button. Mix log shows a "ready" date
  for each batch.
- 1.0.5: New flavour types: boysenberry, cranberry, root beer, fizz/soda, cream soda, ginger, energy drink,
  elderberry/elderflower, gooseberry, plum and papaya, plus 17 new pairing ideas (78 types, 72 combos).
- 1.0.4: Multiple bottles per flavour. Add flavour and Bought more take a bottle count, the stash list shows
  "N full bottles + X ml in the open one", and Edit sets full bottles plus the open bottle's level.
- 1.0.3: Bug fixes from a code review. Only one copy of the app can run at a time, because two copies used to
  overwrite each other's saves. An unreadable data file is kept instead of being overwritten. A flavour listed
  twice in a recipe is checked against one bottle. Renaming a stash flavour updates recipes that use it. Merging
  no longer overwrites nicotine settings edited in the same session. Imported mix log entries can't be undone
  locally. A nicotine base set to over 100% PG+VG now shows a warning. Adding a flavour with no bottle size no
  longer logs an empty purchase.
- 1.0.2: Import reads everything in an export (recipes, stash, base liquids, nicotine settings, mix log) and asks
  whether to merge or replace. Replace saves a backup of the current data in the data folder first.
  Re-importing the same file no longer duplicates recipes.
- 1.0.1: Flavour stash with purchases, stock levels and low-stock warnings; base liquid tracking;
  cost per batch; "I mixed this batch" deducts stock with a mix log and undo; what-can-I-make,
  shopping list, pairing ideas from your stash and "worth buying next".
- 1.0.0: Calculator, recipe library, export/import.
