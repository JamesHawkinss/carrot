const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

function createMainWindow() {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    //mainWindow.setMenu(null);

    mainWindow.loadURL('http://127.0.0.1:5555/')
}

app.whenReady().then(createMainWindow);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});

module.exports = app;