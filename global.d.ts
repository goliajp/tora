import { ElectronAPI } from '@electron-toolkit/preload'
import { Stat } from '@/renderer/src/types'

declare global {
  module '*.png?asset'
  interface Window {
    electron: ElectronAPI
    api: {
      getPerformanceInfo: () => Promise<Stat>
      showOpenDialog: (
        directory: boolean,
        filters: { name: string; extensions: string[] }[],
        title: string
      ) => Promise<string>
      saveFile: (
        content: string,
        filters: { name: string; extensions: string[] }[],
        title: string
      ) => Promise<string>
      readEntireFile: (filePath: string, encoding?: undefined | BufferEncoding) => Promise<Buffer>
      getAppVersion: () => Promise<string>
    }
  }
}
