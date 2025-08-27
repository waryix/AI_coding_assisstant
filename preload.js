// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  closeApp: () => ipcRenderer.send('close-app'),
  setOpacity: (opacity) => ipcRenderer.send('set-opacity', opacity),
  // Function to receive the API key from the main process
  receive: (channel, func) => {
    let validChannels = ['api-key']; // Whitelist of valid channels
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
