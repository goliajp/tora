import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import useMessagePort from '@/renderer/src/hooks/UseMessagePort.tsx'

enum ConvertStatus {
  IDLE,
  CONVERTING,
  DONE,
  ERROR
}

const Convert = observer(() => {
  const [percent, setPercent] = useState('')
  const [status, setStatus] = useState(ConvertStatus.IDLE)
  const [input, setInput] = useState('')
  const { isHasMessagePort } = useMessagePort({
    callBack: setInput
  })

  useEffect(() => {
    window.electron.ipcRenderer.on('convert-progress', (_event, args) => {
      console.log('progress', args)
      setPercent(args.percent)
      setStatus(ConvertStatus.CONVERTING)
    })
    window.electron.ipcRenderer.on('convert-done', (_event) => {
      setStatus(ConvertStatus.DONE)
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

  return (
    <div>
      {isHasMessagePort && (
        <div className="my-4">
          <div>与父窗口同步：</div>
          <input
            className="border"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              console.log(window.electronMessagePort)
              window.electronMessagePort.postMessage(e.target.value)
            }}
          />
        </div>
      )}

      {status === ConvertStatus.IDLE && <div>准备转换</div>}
      {status === ConvertStatus.CONVERTING && <div>转换中...{percent}%</div>}
      {status === ConvertStatus.DONE && <div>转换完成</div>}
      {status === ConvertStatus.ERROR && <div>转换失败</div>}
    </div>
  )
})
export default Convert
