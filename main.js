// Processo principale per avviare kOS come applicazione desktop nativa
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // Crea la finestra del browser con le proporzioni tipiche degli schermi CRT retrò
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    title: "kOS - Retro Operating System",
    icon: path.join(__dirname, 'kOS.ico'),
    autoHideMenuBar: true, // Nasconde la barra dei menu classica di Chromium per un look pulito
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  // Carica il file principale del sistema operativo
  win.loadFile('index.html');
}

// Inizializza l'applicazione quando Electron è pronto
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Esci dal programma quando tutte le finestre vengono chiuse (tranne su macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
