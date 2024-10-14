const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback: (statistics: any) => void) => {
    electron.ipcRenderer.on("statistics", (_, stats) => {
      callback(stats);
    });
  },
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
  // invoke excepts a response from the main process.
  // just giving an event as a parameter is enough since it will return the value which ipc main process returns as a promise.
});
// contextBridge is used to expose the electron object to the window object of the renderer process.
// This is done to prevent the renderer process from accessing the electron object directly.
// The electron object is used to communicate between the main and renderer processes.
