const { app, BrowserWindow, ipcMain, dialog, clipboard, Menu, shell } = require("electron");
const fs = require("fs");
const path = require("path");

const dataFile = () => path.join(app.getPath("userData"), "juicecalc.json");

function readData() {
  const file = dataFile();
  if (!fs.existsSync(file)) return {};
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch {
    // keep the unreadable file so nothing is lost, then start fresh
    const keep = file.replace(/\.json$/, `.unreadable-${Date.now()}.json`);
    try { fs.renameSync(file, keep); } catch {}
    dialog.showErrorBox("Juice Calc", `Your data file couldn't be read, so it was kept as ${path.basename(keep)} in the data folder and the app started empty.`);
    return {};
  }
}

let data = {};
function writeData() {
  const file = dataFile();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = file + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, file);
}

ipcMain.on("store-get", (e, key) => { e.returnValue = key in data ? data[key] : null; });
ipcMain.on("store-set", (e, key, value) => {
  data[key] = value;
  try { writeData(); e.returnValue = true; } catch (err) { e.returnValue = false; }
});
ipcMain.on("backup", (e) => {
  try {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    fs.writeFileSync(path.join(app.getPath("userData"), `juicecalc-backup-${stamp}.json`), JSON.stringify(data, null, 2));
    e.returnValue = true;
  } catch { e.returnValue = false; }
});
ipcMain.on("app-version", (e) => { e.returnValue = app.getVersion(); });
ipcMain.on("copy", (e, text) => { clipboard.writeText(String(text)); e.returnValue = true; });

ipcMain.handle("export-recipes", async (e, payload) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  const stamp = new Date().toISOString().slice(0, 10);
  const { canceled, filePath } = await dialog.showSaveDialog(win, {
    title: "Export recipes",
    defaultPath: path.join(app.getPath("documents"), `juice-calc-recipes-${stamp}.json`),
    filters: [{ name: "Juice Calc recipes", extensions: ["json"] }],
  });
  if (canceled || !filePath) return false;
  fs.writeFileSync(filePath, JSON.stringify({ app: "juice-calc", format: 2, ...payload }, null, 2));
  return true;
});

ipcMain.handle("import-recipes", async (e) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  const { canceled, filePaths } = await dialog.showOpenDialog(win, {
    title: "Import recipes",
    properties: ["openFile"],
    filters: [{ name: "Juice Calc recipes", extensions: ["json"] }],
  });
  if (canceled || !filePaths.length) return null;
  try { return JSON.parse(fs.readFileSync(filePaths[0], "utf8")); } catch { return { recipes: "invalid" }; }
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1320,
    height: 900,
    minWidth: 420,
    minHeight: 500,
    title: "Juice Calc",
    icon: path.join(__dirname, "icon.png"),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: "deny" }; });
  win.webContents.on("will-navigate", (ev) => ev.preventDefault());
  win.loadFile(path.join(__dirname, "index.html"));
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) app.quit();
app.on("second-instance", () => {
  const win = BrowserWindow.getAllWindows()[0];
  if (win) { if (win.isMinimized()) win.restore(); win.focus(); }
});

app.whenReady().then(() => {
  if (!gotLock) return;
  data = readData();
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: "File", submenu: [
      { label: "Open data folder", click: () => shell.openPath(app.getPath("userData")) },
      { type: "separator" },
      { role: "quit" },
    ] },
    { role: "editMenu" },
    { role: "viewMenu" },
  ]));
  createWindow();
});

app.on("window-all-closed", () => app.quit());
