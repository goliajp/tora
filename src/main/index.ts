import { app, BrowserWindow, dialog, globalShortcut, ipcMain, Menu, shell, Tray } from 'electron'
import { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import trayIcon from '../../resources/tray.png?asset'
import pressedIcon from '../../resources/pressed.png?asset'
import pidusage from 'pidusage'
import log from 'electron-log'
import fs from 'fs'
import { setupAutoUpdater } from './auto-updater.ts'
import * as path from 'node:path'

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null

//python test url
const server = 'http://127.0.0.1:8000'

if (process.defaultApp) {
  console.log(process.argv)
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [
      path.resolve(process.argv[1])
    ])
  }
} else {
  app.setAsDefaultProtocolClient('electron-fiddle')
}

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  console.log(import.meta.env.MODE)
  // 检查更新
  if (import.meta.env.MODE !== 'development') {
    setupAutoUpdater(server)
  }

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url).then()
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']).then()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html')).then()
  }
}

// app.commandLine.appendSwitch('force_high_performance_gpu')
// app.commandLine.appendSwitch('disable-frame-rate-limit')
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  //设置托盘
  tray = new Tray(trayIcon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show window',
      type: 'radio',
      accelerator: 'CmdOrCtrl+T',
      click: () => {
        mainWindow?.show()
      }
    },
    { label: 'This is a tray', type: 'radio' },
    { type: 'separator' },
    { label: 'This is a tray', type: 'radio', checked: true },
    { label: 'This is a tray', type: 'radio' }
  ])
  tray.setToolTip('tora')
  tray.setPressedImage(pressedIcon)
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
  })

  // Register a shortcut listener.

  const ret = globalShortcut.register('CommandOrControl+T', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    mainWindow.show()
  })

  if (!ret) {
    console.log('registration failed')
  }

  app.on('open-url', (_event, url) => {
    dialog.showErrorBox('欢迎回来', `导向自: ${url}`)
  })

  app.on('will-quit', () => {
    // 注销快捷键
    globalShortcut.unregister('CommandOrControl+T')

    // 注销所有快捷键
    globalShortcut.unregisterAll()
  })

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS, it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('get-performance-info', async () => {
  return await pidusage(process.pid)
})

ipcMain.handle(
  'show-open-dialog',
  (
    _event,
    directory = false,
    filters: { name: string; extensions: string[] }[] = [],
    title: string
  ) => {
    log.info(`Showing open dialog directory=${directory} filters=${filters.join(';')}`)

    if (mainWindow === null) {
      log.error('Aborting open dialog, mainWindow is null')
      return []
    }

    return dialog
      .showOpenDialog(mainWindow, {
        properties: [directory ? 'openDirectory' : 'openFile'],
        filters,
        title
      })
      .then((value) => {
        log.info(value, 'ShowOpenDialog Success')
        if (value.canceled) return []
        return value.filePaths
      })
      .catch((e) => log.error(e))
  }
)

ipcMain.handle(
  'save-file',
  (
    _event,
    content: string,
    filters: { name: string; extensions: string[] }[] = [],
    title: string
  ) => {
    if (mainWindow === null) {
      log.error('Aborting open dialog, mainWindow is null')
      return []
    }

    return dialog
      .showSaveDialog(mainWindow, {
        filters,
        title
      })
      .then((result) => {
        if (!result.canceled && result.filePath) {
          fs.writeFile(result.filePath, content, (err) => {
            if (err) {
              log.error(err)
            } else {
              log.info(`File saved to ${result.filePath}`)
            }
          })
        }
      })
      .catch((e) => log.error(e))
  }
)

ipcMain.handle(
  'read-entire-file',
  async (_event, filePath, encoding?: undefined | BufferEncoding) => {
    log.info('read-entire-file start', filePath)
    try {
      return await fs.promises.readFile(filePath, encoding)
    } catch (err) {
      console.error('Failed to read file:', err)
      return null
    }
  }
)

ipcMain.handle('get-app-version', async (_event) => {
  return app.getVersion()
})
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
