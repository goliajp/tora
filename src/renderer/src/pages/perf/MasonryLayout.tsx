import { Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { makeAutoObservable, observable, runInAction } from 'mobx'

// todo load more

const imgUrls = [
  'https://images.pexels.com/photos/2014401/pexels-photo-2014401.jpeg',
  'https://images.pexels.com/photos/2014402/pexels-photo-2014402.jpeg',
  'https://images.pexels.com/photos/2014403/pexels-photo-2014403.jpeg',
  'https://images.pexels.com/photos/2014404/pexels-photo-2014404.jpeg',
  'https://images.pexels.com/photos/2014406/pexels-photo-2014406.jpeg',
  'https://images.pexels.com/photos/2014407/pexels-photo-2014407.jpeg',
  'https://images.pexels.com/photos/2014413/pexels-photo-2014413.jpeg',
  'https://images.pexels.com/photos/2014414/pexels-photo-2014414.jpeg',
  'https://images.pexels.com/photos/2014415/pexels-photo-2014415.jpeg',
  'https://images.pexels.com/photos/2014416/pexels-photo-2014416.jpeg',
  'https://images.pexels.com/photos/2014417/pexels-photo-2014417.jpeg',
  'https://images.pexels.com/photos/2014418/pexels-photo-2014418.jpeg',
  'https://images.pexels.com/photos/2014419/pexels-photo-2014419.jpeg',
  'https://images.pexels.com/photos/2014420/pexels-photo-2014420.jpeg',
  'https://images.pexels.com/photos/2014421/pexels-photo-2014421.jpeg',
  'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg',
  'https://images.pexels.com/photos/2014424/pexels-photo-2014424.jpeg',
  'https://images.pexels.com/photos/2014425/pexels-photo-2014425.jpeg',
  'https://images.pexels.com/photos/2014426/pexels-photo-2014426.jpeg',
  'https://images.pexels.com/photos/2014427/pexels-photo-2014427.jpeg',
  'https://images.pexels.com/photos/2014428/pexels-photo-2014428.jpeg',
  'https://images.pexels.com/photos/2014430/pexels-photo-2014430.jpeg',
  'https://images.pexels.com/photos/2014431/pexels-photo-2014431.jpeg'
  // 'https://images.pexels.com/photos/2014432/pexels-photo-2014432.jpeg',
  // 'https://images.pexels.com/photos/2014433/pexels-photo-2014433.jpeg',
  // 'https://images.pexels.com/photos/2014434/pexels-photo-2014434.jpeg',
  // 'https://images.pexels.com/photos/2014438/pexels-photo-2014438.jpeg',
  // 'https://images.pexels.com/photos/2014439/pexels-photo-2014439.jpeg',
  // 'https://images.pexels.com/photos/2014440/pexels-photo-2014440.jpeg',
  // 'https://images.pexels.com/photos/2014442/pexels-photo-2014442.jpeg',
  // 'https://images.pexels.com/photos/2014443/pexels-photo-2014443.jpeg',
  // 'https://images.pexels.com/photos/2014444/pexels-photo-2014444.jpeg',
  // 'https://images.pexels.com/photos/2014444/pexels-photo-2014444.jpeg',
  // 'https://images.pexels.com/photos/2014444/pexels-photo-2014444.jpeg'
]

const data: Obj[][] = observable([] as Obj[][])

const columns = 5
const picWidth = 100
const spaceX = 16
const spaceY = 16

class Obj {
  url: string
  width: number
  height: number
  offsetX: number
  offsetY: number
  row: number
  col: number

  constructor({ url, row, col }: { url: string; row: number; col: number }) {
    this.url = url
    this.width = picWidth
    this.offsetX = col * (picWidth + spaceX)
    this.offsetY = 0
    this.row = row
    this.col = col
    this.height = 0
    makeAutoObservable(this)
  }

  fetchHeight(i: number) {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = this.url
      img.onload = () => {
        runInAction(() => {
          this.height = picWidth * (img.height / img.width)
          resolve(true)

          if (this.row > 0) {
            const topHeight = data[this.row - 1][i % 5].height
            this.offsetY = topHeight + spaceY + data[this.row - 1][i % 5].offsetY
          }
        })
      }
    })
  }
}

const MasonryLayout = observer(() => {
  const init = async () => {
    // 标记为异步函数
    for (let i = 0; i < imgUrls.length; i++) {
      const row = Math.floor(i / columns)
      const col = i % columns

      // 确保对应行数组已经初始化
      if (!data[row]) {
        data[row] = []
      }

      // 如果没有相应的对象，则创建
      if (!data[row][col]) {
        data[row][col] = new Obj({ url: imgUrls[i], row, col })
      }

      // 等待当前这张图片完全处理完成，包括加载和设置位置
      await data[row][col].fetchHeight(i) // 注意，使用await确保按序执行
    }
    // 所有图片处理完成后的操作可以在这里继续
  }

  useEffect(() => {
    init().then()
  }, [])

  return (
    <div>
      {data.map((row, index) => {
        return (
          <Fragment key={index}>
            {row.map((item, colIndex) => {
              return (
                <img
                  key={colIndex}
                  className="absolute h-auto max-w-full rounded-lg"
                  style={{
                    width: item.width,
                    transform: `translate(${item.offsetX}px, ${item.offsetY}px)`
                  }}
                  src={item.url}
                  alt=""
                />
              )
            })}
          </Fragment>
        )
      })}
    </div>
  )
})
export default MasonryLayout
