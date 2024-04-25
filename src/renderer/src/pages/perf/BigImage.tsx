import { observer } from 'mobx-react-lite'
import { ChangeEvent, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-types

const BigImage = observer(() => {
  const [systemImagePath, setSystemImagePath] = useState('')
  const [browserImagePath, setBrowserImagePath] = useState('')
  const [width, setWidth] = useState(400)

  const importImage = async () => {
    try {
      const fileList = await window.api.showOpenDialog(
        false,
        [{ name: 'Image', extensions: ['jpg', 'png', 'gif', 'jpeg', 'webp'] }],
        'Select Big Image'
      )
      if (fileList && fileList.length > 0) {
        const imageBuffer = await window.api.readEntireFile(fileList[0])
        const imageBlob = new Blob([imageBuffer], { type: 'image/*' })
        const imageUrl = URL.createObjectURL(imageBlob)

        setSystemImagePath(imageUrl)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] // 获取选中的文件
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && e.target.result !== null) {
          const blob = new Blob([e.target.result], { type: file.type })
          const url = URL.createObjectURL(blob)
          setBrowserImagePath(url)
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  return (
    <div className="mx-auto w-3/5">
      <div className="bg-white py-4 flex flex-col items-center mx-auto inset-x-0 z-[2]">
        <h1 className="text-2xl font-bold">Big Image</h1>
        <div className="text-center">
          <div className="py-4">超过 250MB 可能会导致图片加载失败</div>
          <div>使用 blob 格式需要在 index.html 文件里的 meta 加上 img-src * data: blob:</div>
          <div className="flex justify-center mt-4">
            <button className="mr-4" onClick={() => setWidth((w) => w - 10)}>
              -
            </button>
            <button onClick={() => setWidth((w) => w + 10)}>+</button>
          </div>
        </div>
      </div>
      <div className="w-full flex mt-10">
        <div className="flex-1">
          <div>System Api</div>
          <button className="my-4" onClick={importImage}>
            import image
          </button>
          {systemImagePath && (
            <img style={{ width }} className="my-4 mt-8" src={systemImagePath} alt="bigimage" />
          )}
        </div>
        <div className="flex-1">
          <div>Browser Api</div>
          <input className="my-4 mt-6" type="file" accept="image/*" onChange={handleFileChange} />
          {browserImagePath && (
            <img src={browserImagePath} alt="Selected" style={{ width }} className="my-4" />
          )}
        </div>
      </div>
    </div>
  )
})
export default BigImage
