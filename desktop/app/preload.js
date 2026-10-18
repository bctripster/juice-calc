const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("juiceStore", {
  version: ipcRenderer.sendSync("app-version"),
  get: (key) => ipcRenderer.sendSync("store-get", key),
  set: (key, value) => { if (!ipcRenderer.sendSync("store-set", key, value)) throw new Error("save failed"); },
  backup: () => ipcRenderer.sendSync("backup"),
  copy: (text) => ipcRenderer.sendSync("copy", text),
  exportRecipes: (payload) => ipcRenderer.invoke("export-recipes", payload),
  importRecipes: () => ipcRenderer.invoke("import-recipes"),
});
