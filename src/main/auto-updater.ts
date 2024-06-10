import { app, autoUpdater, dialog } from 'electron'
import log from 'electron-log'
import * as os from 'node:os'

export const setupAutoUpdater = (server: string) => {
  const feed = `${server}/update/${process.platform}/${os.arch()}/${app.getVersion()}`

  console.log(feed, 'feedfeedfeedfeedfeed')
  // 设置 feed URL
  autoUpdater.setFeedURL({ url: feed })

  // 检查更新
  autoUpdater.checkForUpdates()

  // 自动更新事件监听
  autoUpdater.on('error', (message) => {
    log.error('自动更新发生错误')
    log.error(message)
  })

  autoUpdater.on('checking-for-update', () => {
    log.info('开始检查更新')
  })

  autoUpdater.on('update-available', () => {
    log.info('发现可用更新')
  })

  autoUpdater.on('update-downloaded', () => {
    log.info('下载完成')
    const clickId = dialog.showMessageBoxSync({
      type: 'info',
      title: '更新提示',
      message: '更新下载完成，是否立即更新？',
      buttons: ['是', '否'],
      cancelId: 1
    })
    if (clickId === 0) {
      autoUpdater.quitAndInstall()
      app.quit()
    }
  })
}
