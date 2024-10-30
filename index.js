// index.js
const { app, BrowserWindow, ipcMain } = require('electron'); // Import ipcMain here
const path = require('node:path');
const axios = require('axios');

// Automatically reload Electron on file changes
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});
const preloadPath = path.join(__dirname, 'preload.js');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: preloadPath,
      nodeIntegrationInWorker: true,
      contextIsolation: true,
      nodeIntegration: true,
      enableRemoteModule: false,
    },
  });

  win.loadFile('index.html'); // Load your HTML file
}

app.whenReady().then(createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handler to get users
ipcMain.handle('get-users', async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/users'); // Adjust URL if necessary
    return response.data; // Return the users data
  } catch (error) {
    console.error('Error fetching users:', error);
    return []; // Return an empty array on error
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
