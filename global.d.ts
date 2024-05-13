import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  module '*.png?asset'
  interface Window {
    electron: ElectronAPI
    api: object
  }
}
