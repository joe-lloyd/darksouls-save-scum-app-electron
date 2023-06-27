const { ipcRenderer } = require('electron')

window.ipcRendererInvoke = (...args) => ipcRenderer.invoke(...args)
