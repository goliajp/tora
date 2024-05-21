import { ElectronAPI } from '@electron-toolkit/preload'
import { MessagePortMain } from 'electron'

declare global {
  module '*.png?asset'
  interface Window {
    electron: ElectronAPI
    api: object
    electronMessagePort: MessagePortMain & { onmessage: (event: any) => void }
  }
}
