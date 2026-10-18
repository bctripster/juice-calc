# Juice Calc

An e-liquid mixing calculator with a recipe library and a flavour stash, for Linux desktop and Android.

- **Mix:** enter batch size, target nicotine, PG/VG ratio and flavour percentages to get the amount of each
  ingredient. You can mix by volume (ml, the default) or by weight (grams), and a Max VG mode is included.
- **Recipes:** save, search and copy recipes, with a suggested steep time based on the flavours.
- **Stash:** track flavour bottles, base liquids, prices and stock. "I mixed this batch" takes the amounts
  out of stock, with a mix log and undo. It also shows what you can make, a shopping list, and pairing ideas
  from a built-in flavour guide.
- **Export/Import:** move everything between computers and phones in one file, merging with or replacing
  what's there.

All data stays on your device. Nothing is sent anywhere.

## Download
Get the Linux AppImage or Android APK from [Releases](https://github.com/bctripster/juice-calc/releases).

- **Linux:** `chmod +x JuiceCalc-*.AppImage`, then run it.
- **Android:** install the APK with `adb install`, or open it on the phone after allowing installs from
  unknown apps.

## Source
- [`desktop/`](desktop): the Electron app. The UI and mixing maths are in `desktop/app/` (see its README).
- [`android/`](android): a WebView wrapper that builds an APK from the same `desktop/app` files (see its README).

## License
[MIT](LICENSE). The bundled fonts (Bricolage Grotesque, Figtree, JetBrains Mono) are under the SIL Open Font License.
