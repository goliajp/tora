import { observer } from 'mobx-react-lite'
import { useTour } from '@reactour/tour'
import { useEffect, useState } from 'react'

//从服务器获取最新版本号
const latestVersion = '1.0.1'

const Tour = observer(() => {
  const { setIsOpen } = useTour()
  const [version, setVersion] = useState('')
  useEffect(() => {
    getVersion().then()
  }, [])

  const getVersion = async () => {
    const version = await window.api.getAppVersion()
    const localVersion = localStorage.getItem('version')
    setVersion(version)
    //如果本地版本号不是最新版本号，则弹出新版本提示
    if (version === latestVersion && localVersion !== latestVersion) {
      localStorage.setItem('version', latestVersion)
      setIsOpen(true)
    }
  }

  return (
    <div className="mx-auto w-3/5">
      <div className="flex mt-4 flex-wrap">
        <div>最新版本:{latestVersion}</div>
        <div className="ml-4">当前版本:{version}</div>
        <div>当第一次更新到最新版本到时候，会触发引导提示</div>
      </div>
      <div className="flex mt-40">
        <div className="first-step">first-step</div>
        <div className="second-step ml-14">second-step</div>
      </div>
    </div>
  )
})
export default Tour
