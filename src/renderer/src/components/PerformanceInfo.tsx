import FPSStats from '@/renderer/src/components/FpsStats'
import { useEffect, useState } from 'react'
import { useInterval } from 'react-use'
import { Stat } from '@/renderer/src/types'

type AppInfoType = {
  appName: string
  version: string
  platform: NodeJS.Platform
  arch: string
}

export const PerformanceInfo = () => {
  const [performanceInfo, setPerformanceInfo] = useState<Stat | Record<string, never>>({})
  const [appInfo, setAppInfo] = useState<AppInfoType>({} as AppInfoType)
  useInterval(async () => {
    const info = (await window.electron.ipcRenderer.invoke('get-performance-info')) as Stat
    setPerformanceInfo(info)
  }, 1000)

  useEffect(() => {
    getAppInfo()
  }, [])

  const getAppInfo = () => {
    window.electron.ipcRenderer.invoke('get-app-info').then((appInfo) => {
      setAppInfo(appInfo)
    })
  }

  return (
    <div className="w-[260px] bg-[#77e7a0ff] h-full flex flex-col items-center py-6 right-0 top-0">
      <FPSStats />
      <div className="my-2 text-center">
        <div className="text-sm">CPU : {performanceInfo.cpu && performanceInfo.cpu.toFixed()}%</div>
        {/*memory 用 mb 来当作展示单位*/}
        <div className="text-sm">
          Memory :
          {performanceInfo.memory && Math.round(performanceInfo.memory / 1024 / 1024).toFixed(2)} MB
        </div>
        <div className="text-sm mt-4">
          {Object.entries(appInfo).map(([key, value]) => (
            <div key={key}>
              <span>{key}: </span>
              <span className="text-blue-600">{value}</span>
            </div>
          ))}
          <div>
            <span>timezone：</span>
            <span className="text-blue-600">
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
