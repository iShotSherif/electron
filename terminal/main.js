const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let childWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

ipcMain.on('open-child-window', (event) => {
  if (childWindow) {
    childWindow.focus();
    return;
  }

  childWindow = new BrowserWindow({
    width: 400,
    height: 300,
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  childWindow.loadFile(path.join(__dirname, 'src', 'js', 'child.html'));

  childWindow.on('closed', () => {
    childWindow = null;
  });
});

ipcMain.on('child-window-closed', (event) => {
  console.log('Received child-window-closed message');
  if (mainWindow) {
    mainWindow.webContents.send('reopen-component');
  }
});

ipcMain.on('child-window-closed', (event) => {
  console.log('Main process: Received child-window-closed message');
  if (mainWindow) {
    mainWindow.webContents.send('reopen-component');
  }
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
