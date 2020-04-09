const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

function createMainWindow() {
    let streamWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    streamWindow.loadURL('http://127.0.0.1:5555/stream')

    let viewWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    viewWindow.loadURL('http://127.0.0.1:5555/view');
}

app.whenReady().then(createMainWindow);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});

module.exports = app;