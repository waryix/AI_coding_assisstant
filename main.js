// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 450,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
  });

  mainWindow.loadFile('index.html');
  
  // Send the API key to the renderer process once the window is ready
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('api-key', process.env.API_KEY);
  });

  mainWindow.setOpacity(0.9);

  ipcMain.on('close-app', () => {
    mainWindow.close();
  });

  ipcMain.on('set-opacity', (event, opacity) => {
    mainWindow.setOpacity(parseFloat(opacity));
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
