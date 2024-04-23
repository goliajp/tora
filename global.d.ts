import { ElectronAPI } from '@electron-toolkit/preload'
import { Stat } from '@/renderer/src/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getPerformanceInfo: () => Promise<Stat>
    }
  }
}
