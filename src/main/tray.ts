import { BrowserWindow, Menu, Tray } from 'electron'
import trayIcon from '../../resources/tray.png?asset'
import pressedIcon from '../../resources/pressed.png?asset'

export const setTray = (mainWindow: BrowserWindow) => {
  const tray = new Tray(trayIcon)
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
  console.log(tray, 'tray')
  tray.setToolTip('tora')
  tray.setPressedImage(pressedIcon)
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    // mainWindow.show()
  })
}
