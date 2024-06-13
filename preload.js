const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    loadURL: (url) => ipcRenderer.send('load-url', url),
    goBack: () => ipcRenderer.send('go-back'),
    goForward: () => ipcRenderer.send('go-forward'),
    reload: () => ipcRenderer.send('reload'),
    // fillUsername: (value) => ipcRenderer.send('fill-username', value),
    // setPassword: (value) => ipcRenderer.send('fill-password', value),
});
