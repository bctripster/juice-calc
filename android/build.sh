#!/bin/bash
# Builds Juice Calc for Android without Gradle: javac -> dx -> aapt2 -> zipalign -> apksigner.
# Needs: JDK, Ubuntu packages android-sdk-platform-23 aapt apksigner zipalign dalvik-exchange.
set -euo pipefail
unset JAVA_TOOL_OPTIONS
cd "$(dirname "$0")"
WEB=${WEB:-../desktop/app}
JAR=/usr/lib/android-sdk/platforms/android-23/android.jar
VER=$(sed -n 's/.*android:versionName="\([^"]*\)".*/\1/p' AndroidManifest.xml)
rm -rf build && mkdir -p build/classes build/dex build/res assets/www

# web assets: the desktop page, minus Electron's CSP, plus the Android bridge
rm -rf assets/www/* && cp -r "$WEB"/fonts "$WEB"/fonts.css "$WEB"/pairings.js "$WEB"/stash.js assets/www/
cp android-bridge.js assets/www/
python3 - "$WEB/index.html" assets/www/index.html <<'PY'
import sys, re
s = open(sys.argv[1]).read()
s = re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]*>\n', '', s)
s = s.replace('<script src="pairings.js"></script>', '<script src="android-bridge.js"></script>\n<script src="pairings.js"></script>', 1)
s = s.replace('</head>', '<script>try { document.documentElement.dataset.theme = AndroidBridge.isDark() ? "dark" : "light"; } catch (e) {}</script>\n</head>', 1)
assert 'android-bridge.js' in s and 'AndroidBridge.isDark' in s
open(sys.argv[2], 'w').write(s)
PY

# icons
python3 - <<'PY'
from PIL import Image
src = Image.open("../desktop/app/icon.png").convert("RGBA")
for d, px in {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}.items():
    src.resize((px, px), Image.LANCZOS).save(f"res/mipmap-{d}/ic_launcher.png")
PY

javac -nowarn -Xlint:-options --release 8 -cp "$JAR" -d build/classes $(find src -name '*.java')
dalvik-exchange --dex --min-sdk-version=21 --output=build/dex/classes.dex build/classes
aapt2 compile --dir res -o build/res.zip
aapt2 link -I "$JAR" --manifest AndroidManifest.xml -A assets -o build/unsigned.apk build/res.zip --auto-add-overlay
(cd build/dex && zip -q ../unsigned.apk classes.dex)
zipalign -f -p 4 build/unsigned.apk build/aligned.apk
[ -f juicecalc.keystore ] || keytool -genkeypair -keystore juicecalc.keystore -alias juicecalc -keyalg RSA -keysize 2048 -validity 10000 \
  -storepass juicecalc -keypass juicecalc -dname "CN=Juice Calc" >/dev/null 2>&1
apksigner sign --ks juicecalc.keystore --ks-pass pass:juicecalc --key-pass pass:juicecalc --out "build/JuiceCalc-$VER.apk" build/aligned.apk
apksigner verify --print-certs "build/JuiceCalc-$VER.apk" | head -1
ls -la "build/JuiceCalc-$VER.apk"
