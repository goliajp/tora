import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Stat } from '@/renderer/src/types'

// Custom APIs for renderer
const api = {
  getPerformanceInfo: async (): Promise<Stat> => {
    return await ipcRenderer.invoke('get-performance-info')
  },
  showOpenDialog: (
    directory: boolean,
    filters: { name: string; extensions: string[] }[] = [],
    title: string
  ) => {
    return ipcRenderer.invoke('show-open-dialog', directory, filters, title)
  },
  //传递所有的参数给invoke的方法
  saveFile: (
    content: string,
    filters: { name: string; extensions: string[] }[] = [],
    title: string
  ) => {
    return ipcRenderer.invoke('save-file', content, filters, title)
  },
  readEntireFile: async (filePath: string, encoding: undefined | BufferEncoding) => {
    return await ipcRenderer.invoke('read-entire-file', filePath, encoding)
  },
  getImageData: (filePath: string) => ipcRenderer.invoke('get-image-data', filePath)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
