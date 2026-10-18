# Juice Calc for Android

The same web app as the desktop version (`../desktop/app`), wrapped in an Android WebView.

- `src/org/juicecalc/app/MainActivity.java`: the WebView plus `AndroidBridge`, which handles storage in `files/juicecalc.json`, backups, the clipboard, and export/import through the system file picker.
- `android-bridge.js`: gives the page the same `window.juiceStore` API that Electron's preload provides.
- `build.sh`: copies `../desktop/app` into `assets/www` and builds a signed APK in `build/`. It doesn't use Gradle because Google's SDK download site is blocked in the build container. It uses Ubuntu packages instead (`android-sdk`, `android-sdk-platform-23`, `aapt2`, `apksigner`, `zipalign`, `dalvik-exchange`, JDK 17).
- Signing key: `juicecalc.keystore` is not in this repository. `build.sh` creates a new one if it's missing. Android only installs an update over an existing install when both are signed with the same key, so a build made with a new key needs the old app uninstalled first.
- Version: bump `versionCode` and `versionName` in `AndroidManifest.xml` for each build.

## Changelog
- 1.0.8: first Android build. It has the same features as desktop 1.0.7, with data stored on the phone.
- 1.0.9: follows the phone's light or dark theme, including when it changes while the app is open.
