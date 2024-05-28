import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import image from '../../assets/img/troll.jpg'

const ImageFilter = observer(() => {
  const canvas = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // 仅加载图像，不应用滤镜
    const img = new Image()
    img.src = image
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const ctx = canvas.current?.getContext('2d') as CanvasRenderingContext2D
      ctx.drawImage(img, 0, 0, 500, 500)
    }
  }, [])

  const applyFilter = () => {
    // 点击按钮时才导入Photon库并应用滤镜
    import('@/renderer/src/plugins/photon/photon_rs').then((photon) => {
      const ctx = canvas.current?.getContext('2d') as CanvasRenderingContext2D
      const image = photon.open_image(canvas.current!, ctx)

      photon.filter(image, 'radio') // 应用特定滤镜，可按实际需求更换
      photon.grayscale(image) // 应用灰度滤镜
      photon.alter_red_channel(image, 100) //
      photon.putImageData(canvas.current!, ctx, image)
    })
  }

  return (
    <div>
      <div className="mt-4">
        <canvas ref={canvas} height={400} width={400}></canvas>
        <button onClick={applyFilter} className="mt-4">
          应用滤镜
        </button>
      </div>
    </div>
  )
})
export default ImageFilter
