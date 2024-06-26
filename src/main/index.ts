import {
  app,
  BrowserWindow,
  crashReporter,
  dialog,
  globalShortcut,
  ipcMain,
  Menu,
  MenuItem,
  nativeTheme,
  pushNotifications,
  shell,
  Tray
} from 'electron'
import { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import trayIcon from '../../resources/tray.png?asset'
import pressedIcon from '../../resources/pressed.png?asset'
import pidusage from 'pidusage'
import log from 'electron-log'
import fs from 'fs'
import { setupAutoUpdater } from './auto-updater.ts'
import * as path from 'node:path'
import * as os from 'node:os'
import Screenshots from 'electron-screenshots'
import { registerGrpcHandler } from './grpc-handler.ts'
import { registerFfmpegHandler } from './ffmpeg-handler.ts'
// import * as process from 'node:process'


if(require('electron-squirrel-startup')) app.quit()

let mainWindow: BrowserWindow | null = null

let tray: Tray | null = null

if (process.platform === 'darwin') {
  //push notification
  pushNotifications.registerForAPNSNotifications().then((token) => {
    // 转发令牌到您的远程通知服务器
    console.log(token, 'token')
  })
  pushNotifications.on('received-apns-notification', (event, userInfo) => {
    // 通过相关用户信息字段生成一个新的通知对象
    console.log(event, userInfo, 'userInfo')
  })
}

//python test url
const server = 'http://127.0.0.1:8000'
// const NOTIFICATION_TITLE = 'Basic Notification'
// const NOTIFICATION_BODY = 'Notification from the Main process'

crashReporter.start({
  productName: 'electron-tora',
  submitURL: 'http://',
  uploadToServer: true
})

if (process.defaultApp) {
  console.log(process.argv)
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-tora', process.execPath, [
      path.resolve(process.argv[1])
    ])
  }
} else {
  app.setAsDefaultProtocolClient('electron-tora')
}

// console.log(!!port1, 'port1port1')

//消息端口

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    titleBarStyle: 'hidden',
    minWidth: 640,
    trafficLightPosition: { x: 20, y: 10 }, //偏移量
    show: false,
    resizable: true,
    autoHideMenuBar: true,
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    }
  })

  mainWindow.webContents.openDevTools()
  // 检查更新
  if (import.meta.env.MODE !== 'development') {
    setupAutoUpdater(server)
  }

  // Register grpc handler
  if (mainWindow) {
    registerGrpcHandler(mainWindow)
    registerFfmpegHandler(mainWindow)
  }

  mainWindow.webContents.on('context-menu', (_event, params) => {
    const menu = new Menu()
    menu.append(
      new MenuItem({
        role: 'shareMenu',
        sharingItem: {
          filePaths: [trayIcon]
        }
        // click: () => {}
      })
    )
    mainWindow && menu.popup({ window: mainWindow, x: params.x, y: params.y })
  })

  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    console.log('ready-to-show')
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

  //设置截图
  const screenshot = new Screenshots()
  globalShortcut.register('CommandOrControl+Shift+S', () => {
    screenshot.startCapture()
  })
  //设置消息端口

  // new Notification({
  //   title: NOTIFICATION_TITLE,
  //   body: NOTIFICATION_BODY
  // }).show()

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

//获取性能信息
ipcMain.handle('get-performance-info', async () => {
  return await pidusage(process.pid)
})

//system theme start -- macOS only
ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})
//system theme end

//打开文件
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

//保存文件
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

//读取文件
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

//获取app版本
ipcMain.handle('get-app-version', async (_event) => {
  return app.getVersion()
})

//获取app信息
ipcMain.handle('get-app-info', async (_event) => {
  return {
    appName: app.getName(),
    version: app.getVersion(),
    platform: os.platform(),
    arch: os.arch()
  }
})

//打开外部链接
ipcMain.handle('open-external', async (_event, url: string) => {
  return await shell.openExternal(url)
})

//屏幕截图
ipcMain.handle('screenshot', async (_event) => {
  const screenshot = new Screenshots()
  await screenshot.startCapture()
  return
})
