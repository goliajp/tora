import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { formatSize } from '@/renderer/src/utils'
import useMessagePort from '@/renderer/src/hooks/UseMessagePort.tsx'

const Ffmpeg = observer(() => {
  const [video, setVideo] = useState({
    filename: '',
    format_name: '',
    width: 0,
    height: 0,
    size: 0,
    duration: 0,
    videoBitrate: '',
    audioBitrate: '',
    codec: '',
    channels: 0
  })

  const [input, setInput] = useState('')
  const { isHasMessagePort } = useMessagePort({
    callBack: setInput
  })
  const fileSelect = async () => {
    const filePath = await window.electron.ipcRenderer.invoke(
      'show-open-dialog',
      false,
      [{ name: 'Movies', extensions: ['mp4'] }],
      '请选择文件'
    )
    const res = await window.electron.ipcRenderer.invoke('ffmpeg-read-file', filePath[0])
    setVideo(res)
  }

  const convert = async () => {
    await window.electron.ipcRenderer.invoke('ffmpeg-convert', video.filename)

    //加载messagePort

    if (window.electronMessagePort) {
      window.electronMessagePort.onmessage = (event) => {
        setInput(event)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('paste', async (e) => {
      const files = e.clipboardData!.files
      if (files.length > 0) {
        const filePath = files[0]
        const res = await window.electron.ipcRenderer.invoke('ffmpeg-read-file', filePath.path)
        setVideo(res)
      }
    })
  }, [])

  return (
    <div>
      <div>
        {isHasMessagePort && (
          <div className="my-4">
            <div>与子窗口同步：</div>
            <input
              className="border"
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                window.electronMessagePort.postMessage(e.target.value)
              }}
            />
          </div>
        )}

        <div
          className="size-60 border flex items-center justify-center cursor-pointer hover:border-blue-500 transition-all hover:text-blue-500"
          onClick={fileSelect}
          onDrop={async (e) => {
            e.preventDefault()
            const files = e.dataTransfer!.files
            if (files.length > 0) {
              const filePath = files[0]
              console.log(files)
              const res = await window.electron.ipcRenderer.invoke(
                'ffmpeg-read-file',
                filePath.path
              )
              setVideo(res)
            }
          }}
          onDragOver={(e) => {
            e.preventDefault()
            e.dataTransfer!.dropEffect = 'copy'
          }}
        >
          选择或将mp4文件拖到这里
        </div>
        <div className="mt-6">
          <ul>
            <li>文件: {video.filename}</li>
            <li>格式: {video.format_name}</li>
            <li>
              宽高: {video.width}x{video.height}
            </li>
          </ul>
          <ul>
            <li>大小: {formatSize(video.size)}</li>
            <li>时长: {video.duration}</li>
            <li>视频比特率: {video.videoBitrate}</li>
          </ul>
          <ul>
            <li>音频比特率: {video.audioBitrate}</li>
            <li>编码: {video.codec}</li>
            <li>声道: {video.channels}</li>
          </ul>
        </div>
      </div>
      {video.filename && (
        <>
          <button className="mt-6" onClick={convert}>
            转成avi
          </button>
        </>
      )}
    </div>
  )
})
export default Ffmpeg
