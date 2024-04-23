import { ElectronAPI } from '@electron-toolkit/preload'
import { Stat } from '@/renderer/src/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getPerformanceInfo: () => Promise<Stat>
      showOpenDialog: (
        directory: boolean,
        filters: { name: string; extensions: string[] }[],
        title: string
      ) => Promise<string>
      readEntireFile: (filePath: string) => Promise<string>
    }
  }
}
