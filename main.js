const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let browserView;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
        },
    });

    browserView = new BrowserView({
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.setBrowserView(browserView);
    browserView.setBounds({ x: 0, y: 40, width: 1200, height: 760 });
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
    // Handle Content Security Policy
    // mainWindow.webContents.on('did-finish-load', () => {
    //     mainWindow.webContents.executeJavaScript(`
    //         const meta = document.createElement('meta');
    //         meta.httpEquiv = 'Content-Security-Policy';
    //         meta.content = "script-src 'self';";
    //         document.getElementsByTagName('head')[0].appendChild(meta);
    //     `);
    // });
}

app.whenReady().then(createWindow).catch(err => console.error('Failed to create window:', err));


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// IPC Handlers
ipcMain.on('load-url', (event, url) => {
    if (browserView) {
        browserView.webContents.loadURL(url);
    }
});

ipcMain.on('go-back', () => {
    if (browserView && browserView.webContents.canGoBack()) {
        browserView.webContents.goBack();
    }
});

ipcMain.on('go-forward', () => {
    if (browserView && browserView.webContents.canGoForward()) {
        browserView.webContents.goForward();
    }
});

ipcMain.on('reload', () => {
    if (browserView) {
        browserView.webContents.reload();
    }
});
ipcMain.on('fill-username', (event, value) => {
    console.log(value)
    if (browserView) {
        browserView.webContents.executeJavaScript(`
            const input = document.getElementById('username');
            if (input) {
                input.value = '${value}';
            }
        `);
    }
});
// ipcMain.on('fill-password', (event, value) => {
//     console.log(value)
//     browserView.webContents.executeJavaScript(`
//         const input = document.getElementById('password');
//         if (input) {
//             input.value = '${value}';
//         }
//     `);
// });