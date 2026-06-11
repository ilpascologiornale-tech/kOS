const { app, BrowserWindow, autoUpdater } = require('electron');
const path = require('path');
autoUpdater.setFeedURL('https://github.com/Ilpascologiornale-tech/kOS-XP/releases/latest');
function createWindow() {
  const win = new BrowserWindow({
    width: 1024, height: 768,
    icon: path.join(__dirname, 'icon.ico'),
    title: 'kOS XP Professional',
    autoHideMenuBar: true,
    webPreferences: { nodeIntegration: false, contextIsolation: true, webSecurity: false }
  });
  win.loadFile('kOS.html');
  win.webContents.on('did-finish-load', () => autoUpdater.checkForUpdates());
  setInterval(() => autoUpdater.checkForUpdates(), 1800000);
}
app.whenReady().then(createWindow);
autoUpdater.on('update-downloaded', () => autoUpdater.quitAndInstall());
app.on('window-all-closed', () => app.quit());
