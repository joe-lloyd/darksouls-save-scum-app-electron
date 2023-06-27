const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { settings } = require("./helpers/getConfig");
const { writeFileSync } = require("fs");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  mainWindow.loadFile(path.join(__dirname, './dist/index.html'));

  mainWindow.on('closed', function () {
    mainWindow = null;
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

ipcMain.handle('open-file-dialog', async (event) => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  if (result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

ipcMain.handle('get-settings', () => {
  return settings; // using the getSettings function from the previous example
});

ipcMain.handle('update-settings', async (event, newSettings) => {
  const settingsPath = path.resolve(__dirname, 'settings.json');
  try {
    writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2));
    return true;
  } catch (error) {
    console.error(`Failed to write settings to ${settingsPath}`, error);
    return false;
  }
});
