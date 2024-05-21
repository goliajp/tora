import { observer } from 'mobx-react-lite'
import { useTour } from '@reactour/tour'
import { useEffect, useState } from 'react'

//从服务器获取最新版本号
const latestVersion = '1.0.0'

const Tour = observer(() => {
  const { setIsOpen } = useTour()
  const [version, setVersion] = useState('')
  useEffect(() => {
    const getVersion = async () => {
      const version = await window.electron.ipcRenderer.invoke('get-app-version')
      const localVersion = localStorage.getItem('version')
      setVersion(version)
      //如果本地版本号不是最新版本号，则弹出新版本提示
      if (version === latestVersion && localVersion !== latestVersion) {
        localStorage.setItem('version', latestVersion)
        setIsOpen(true)
      }
    }
    getVersion().then()
  }, [setIsOpen])

  return (
    <div className="mx-auto">
      <div className="flex mt-4 flex-wrap">
        <div>最新版本:{latestVersion}</div>
        <div className="ml-4">当前版本:{version}</div>
      </div>
      <div className="mt-40">
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <div className="first-step">first-step</div>
        {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
        <div className="second-step mt-10">second-step</div>
      </div>
    </div>
  )
})
export default Tour
