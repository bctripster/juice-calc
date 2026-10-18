package org.juicecalc.app;

import android.app.Activity;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.res.Configuration;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/** A WebView around the Juice Calc page, with a small bridge for saving, sharing and opening files. */
public class MainActivity extends Activity {
    private static final int REQ_EXPORT = 1, REQ_IMPORT = 2;
    private static final Charset UTF8 = Charset.forName("UTF-8");

    private WebView web;
    private JSONObject data = new JSONObject();
    private String pendingExport;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        loadData();
        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowContentAccess(false);
        web.addJavascriptInterface(new Bridge(), "AndroidBridge");
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                Uri u = Uri.parse(url);
                if ("file".equals(u.getScheme())) return false;
                try { startActivity(new Intent(Intent.ACTION_VIEW, u)); } catch (Exception ignored) { }
                return true;
            }

            @Override
            public void onPageFinished(WebView view, String url) { applyTheme(); }
        });
        setContentView(web);
        applyTheme();
        if (state != null) web.restoreState(state);
        else web.loadUrl("file:///android_asset/www/index.html");
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    // ---------- data file ----------
    private File dataFile() { return new File(getFilesDir(), "juicecalc.json"); }

    private void loadData() {
        File f = dataFile();
        if (!f.exists()) return;
        try {
            data = new JSONObject(readAll(new java.io.FileInputStream(f)));
        } catch (Exception e) {
            // keep the unreadable file so nothing is lost, then start fresh
            File keep = new File(getFilesDir(), "juicecalc.unreadable-" + System.currentTimeMillis() + ".json");
            f.renameTo(keep);
            data = new JSONObject();
            Toast.makeText(this, "Your saved data couldn't be read, so the app started empty. The old file was kept.", Toast.LENGTH_LONG).show();
        }
    }

    private synchronized boolean writeData() {
        try {
            File f = dataFile(), tmp = new File(getFilesDir(), "juicecalc.json.tmp");
            OutputStream o = new FileOutputStream(tmp);
            o.write(data.toString(2).getBytes(UTF8));
            o.close();
            return tmp.renameTo(f);
        } catch (Exception e) {
            return false;
        }
    }

    private static String readAll(InputStream in) throws Exception {
        ByteArrayOutputStream b = new ByteArrayOutputStream();
        byte[] buf = new byte[8192];
        int n;
        while ((n = in.read(buf)) > 0) b.write(buf, 0, n);
        in.close();
        return new String(b.toByteArray(), UTF8);
    }

    private void callJs(final String fn, final String jsonArg) {
        runOnUiThread(new Runnable() {
            public void run() { web.evaluateJavascript(fn + "(" + jsonArg + ")", null); }
        });
    }

    // ---------- export / import through Android's document picker ----------
    @Override
    protected void onActivityResult(int req, int res, Intent intent) {
        super.onActivityResult(req, res, intent);
        Uri uri = (res == RESULT_OK && intent != null) ? intent.getData() : null;
        if (req == REQ_EXPORT) {
            boolean ok = false;
            if (uri != null && pendingExport != null) {
                try {
                    OutputStream o = getContentResolver().openOutputStream(uri, "wt");
                    o.write(pendingExport.getBytes(UTF8));
                    o.close();
                    ok = true;
                } catch (Exception e) {
                    Toast.makeText(this, "Couldn't write the export file.", Toast.LENGTH_LONG).show();
                }
            }
            pendingExport = null;
            callJs("window.__juiceExportDone", ok ? "true" : "false");
        } else if (req == REQ_IMPORT) {
            String text = null;
            if (uri != null) {
                try { text = readAll(getContentResolver().openInputStream(uri)); } catch (Exception ignored) { }
            }
            callJs("window.__juiceImportDone", text == null ? "null" : JSONObject.quote(text));
        }
    }

    private boolean isDark() {
        return (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES;
    }

    /** Match the phone's light or dark setting: window bars, WebView background, and the page's data-theme. */
    private void applyTheme() {
        boolean dark = isDark();
        int bg = Color.parseColor(dark ? "#0f141b" : "#eef1f4");
        web.setBackgroundColor(bg);
        getWindow().setStatusBarColor(bg);
        getWindow().setNavigationBarColor(bg);
        if (Build.VERSION.SDK_INT >= 23) {
            View d = getWindow().getDecorView();
            int f = d.getSystemUiVisibility();
            f = dark ? (f & ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR) : (f | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
            if (Build.VERSION.SDK_INT >= 26) f = dark ? (f & ~0x10) : (f | 0x10); // SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
            d.setSystemUiVisibility(f);
        }
        web.evaluateJavascript("document.documentElement.dataset.theme='" + (dark ? "dark" : "light") + "'", null);
    }

    @Override
    public void onConfigurationChanged(Configuration c) {
        super.onConfigurationChanged(c);
        applyTheme();
    }

    private class Bridge {
        @JavascriptInterface
        public boolean isDark() { return MainActivity.this.isDark(); }

        @JavascriptInterface
        public String get(String key) {
            synchronized (MainActivity.this) {
                Object v = data.opt(key);
                return v == null ? null : v.toString();
            }
        }

        @JavascriptInterface
        public boolean set(String key, String json) {
            synchronized (MainActivity.this) {
                try {
                    Object v = new org.json.JSONTokener(json).nextValue();
                    data.put(key, v);
                } catch (Exception e) {
                    return false;
                }
                return writeData();
            }
        }

        @JavascriptInterface
        public boolean backup() {
            synchronized (MainActivity.this) {
                try {
                    String stamp = new SimpleDateFormat("yyyy-MM-dd'T'HH-mm-ss", Locale.US).format(new Date());
                    OutputStream o = new FileOutputStream(new File(getFilesDir(), "juicecalc-backup-" + stamp + ".json"));
                    o.write(data.toString(2).getBytes(UTF8));
                    o.close();
                    return true;
                } catch (Exception e) {
                    return false;
                }
            }
        }

        @JavascriptInterface
        public void copy(String text) {
            final String t = text;
            runOnUiThread(new Runnable() {
                public void run() {
                    ClipboardManager cm = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                    cm.setPrimaryClip(ClipData.newPlainText("Juice Calc", t));
                }
            });
        }

        @JavascriptInterface
        public String version() {
            try {
                PackageInfo p = getPackageManager().getPackageInfo(getPackageName(), 0);
                return p.versionName;
            } catch (Exception e) {
                return "";
            }
        }

        @JavascriptInterface
        public void exportFile(String fileName, String json) {
            pendingExport = json;
            Intent i = new Intent(Intent.ACTION_CREATE_DOCUMENT);
            i.addCategory(Intent.CATEGORY_OPENABLE);
            i.setType("application/json");
            i.putExtra(Intent.EXTRA_TITLE, fileName);
            startActivityForResult(i, REQ_EXPORT);
        }

        @JavascriptInterface
        public void importFile() {
            Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT);
            i.addCategory(Intent.CATEGORY_OPENABLE);
            i.setType("*/*");
            startActivityForResult(i, REQ_IMPORT);
        }
    }
}
