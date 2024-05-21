import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { formatSize } from '@/renderer/src/utils'

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
    const res = await window.electron.ipcRenderer.invoke('ffmpeg-convert', video.filename)
    console.log(res, 'res')
  }

  const postMessage = () => {
    window.electronMessagePort.postMessage('123')
  }

  // useEffect(() => {
  //   window.electronMessagePort.onmessage = (event) => {
  //     console.log('hahaha', event)
  //   }
  // }, [])

  return (
    <div>
      <div>
        <button className="mb-6" onClick={postMessage}>
          通信
        </button>{' '}
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
