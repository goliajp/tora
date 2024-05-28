// grpc-handler.ts
import { BrowserWindow, ipcMain, MessageChannelMain } from 'electron'
import log from 'electron-log'
import { join } from 'path'
import ffmpegStatic from 'ffmpeg-static'
import { is } from '@electron-toolkit/utils'

const ffmpeg = require('fluent-ffmpeg')
const ffprobePath = require('@ffprobe-installer/ffprobe').path

ffmpeg.setFfmpegPath(ffmpegStatic)
ffmpeg.setFfprobePath(ffprobePath)
let childWindow: BrowserWindow | null = null
let ffmpegInstance: any = null

export const registerFfmpegHandler = (mainWindow: BrowserWindow) => {
  //ffmpeg start
  ipcMain.handle('ffmpeg-read-file', async (_event, filePath: string) => {
    log.info(ffmpeg.ffprobe)
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err: any, data: { format: any; streams: any }) => {
        if (err) return reject(err)
        const { format, streams } = data
        log.info(format, streams)
        const { format_name, duration, size, bit_rate } = format
        let audioBitrate = bit_rate,
          videoBitrate = bit_rate,
          codec = '',
          width = 0,
          height = 0,
          channels = 1
        const video = streams.find((item: { codec_type: string }) => item.codec_type === 'video')
        if (video) {
          width = video.width
          height = video.height
          codec = video.codec_name
          videoBitrate = Math.round(video.bit_rate / 1000) + 'k'
        }
        const audio = streams.find((item: { codec_type: string }) => item.codec_type === 'audio')
        if (audio) {
          audioBitrate = Math.round(audio.bit_rate / 1000) + 'k'
          channels = audio.channels
          codec += `/${audio.codec_name}`
        }
        resolve({
          filename: filePath,
          format_name,
          width,
          height,
          size,
          duration,
          videoBitrate,
          audioBitrate,
          codec,
          channels
        })
      })
    })
  })

  //convert
  ipcMain.handle('ffmpeg-convert', async (_event, filePath: string) => {
    return new Promise((resolve) => {
      childWindow = new BrowserWindow({
        width: 400,
        height: 300,
        // show: true,
        resizable: true,
        // frame: false,
        autoHideMenuBar: true,
        // ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      })
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        childWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/convert.html`).then()
      } else {
        childWindow.loadFile(join(__dirname, '../renderer/convert.html')).then()
      }

      childWindow.once('ready-to-show', () => {
        childWindow?.show()
        initMessageChannelMain()
      })

      childWindow?.on('closed', () => {
        ffmpegInstance?.kill()
      })

      const output = filePath.replace('.mp4', '-convert.avi')
      ffmpegInstance = ffmpeg(filePath)
        .toFormat('avi')
        .output(output)
        .on('progress', (progress: { percent: number }) => {
          const percent = Math.floor(progress.percent)
          console.log(`Processing: ${percent} % done`)
          if (childWindow && !childWindow.isDestroyed()) {
            childWindow.webContents.send('convert-progress', { percent })
          }
        })
        .on('end', () => {
          console.log(output, 'output')
          if (childWindow && !childWindow.isDestroyed()) {
            childWindow.webContents.send('convert-done')
          }
        })
        .on('error', (err: any) => {
          log.error(err, 'ffmpeg-convert error')
          if (childWindow && !childWindow.isDestroyed()) {
            childWindow.webContents.send('convert-error')
          }
        })

      ffmpegInstance.run()
      resolve('success')
    })
  })

  const initMessageChannelMain = () => {
    const { port1, port2 } = new MessageChannelMain()

    console.log('port1port1')
    mainWindow?.webContents.postMessage('main-world-port', null, [port1])
    childWindow?.webContents.postMessage('convert-world-port', null, [port2])
  }
}
