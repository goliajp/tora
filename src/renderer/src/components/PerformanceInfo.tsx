import FPSStats from '@/renderer/src/components/FpsStats'
import { useState } from 'react'
import { useInterval } from 'react-use'
import { Stat } from '@/renderer/src/types'

export const PerformanceInfo = () => {
  const [performanceInfo, setPerformanceInfo] = useState<Stat | Record<string, never>>({})

  useInterval(async () => {
    const info = await window.api.getPerformanceInfo()
    setPerformanceInfo(info)
  }, 1000)

  return (
    <div
      className={'w-36 bg-[#77e7a0ff] h-full fixed flex flex-col items-center py-6 right-0 top-0'}
    >
      <FPSStats />
      <div className={'my-2 text-center'}>
        <div className={'text-sm'}>
          CPU : {performanceInfo.cpu && performanceInfo.cpu.toFixed()}%
        </div>
        {/*memory 用 mb 来当作展示单位*/}
        <div className={'text-sm'}>
          Memory :
          {performanceInfo.memory && Math.round(performanceInfo.memory / 1024 / 1024).toFixed(2)} MB
        </div>
      </div>
    </div>
  )
}
