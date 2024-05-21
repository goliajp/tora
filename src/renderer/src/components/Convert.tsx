import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

enum ConvertStatus {
  IDLE,
  CONVERTING,
  DONE,
  ERROR
}

const Convert = observer(() => {
  const [percent, setPercent] = useState('')
  const [status, setStatus] = useState(ConvertStatus.IDLE)

  useEffect(() => {
    window.electron.ipcRenderer.on('convert-progress', (_event, args) => {
      console.log('progress', args)
      setPercent(args.percent)
      setStatus(ConvertStatus.CONVERTING)
    })
    window.electron.ipcRenderer.on('convert-done', (_event) => {
      setStatus(ConvertStatus.DONE)
      window.electronMessagePort.postMessage('convert-confirm')
    })
    window.electron.ipcRenderer.on('convert-error', (_event) => {
      setStatus(ConvertStatus.ERROR)
    })
    return () => {
      window.electron.ipcRenderer.removeAllListeners('convert-progress')
      window.electron.ipcRenderer.removeAllListeners('convert-done')
      window.electron.ipcRenderer.removeAllListeners('convert-error')
    }
  }, [])

  const postMessage = () => {
    window.electronMessagePort.postMessage('123')
  }

  return (
    <div>
      <button className="mb-6" onClick={postMessage}>
        通信
      </button>
      {status === ConvertStatus.IDLE && <div>准备转换</div>}
      {status === ConvertStatus.CONVERTING && <div>转换中...{percent}%</div>}
      {status === ConvertStatus.DONE && <div>转换完成，将在3秒后关闭窗口</div>}
      {status === ConvertStatus.ERROR && <div>转换失败</div>}
    </div>
  )
})
export default Convert
