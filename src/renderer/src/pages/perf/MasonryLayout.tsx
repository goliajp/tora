import { Fragment, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { makeAutoObservable, observable, runInAction } from 'mobx'

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
  'https://images.pexels.com/photos/2014418/pexels-photo-2014418.jpeg'
  // 'https://images.pexels.com/photos/2014419/pexels-photo-2014419.jpeg',
  // 'https://images.pexels.com/photos/2014420/pexels-photo-2014420.jpeg',
  // 'https://images.pexels.com/photos/2014421/pexels-photo-2014421.jpeg',
  // 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg',
  // 'https://images.pexels.com/photos/2014424/pexels-photo-2014424.jpeg',
  // 'https://images.pexels.com/photos/2014425/pexels-photo-2014425.jpeg',
  // 'https://images.pexels.com/photos/2014426/pexels-photo-2014426.jpeg',
  // 'https://images.pexels.com/photos/2014427/pexels-photo-2014427.jpeg',
  // 'https://images.pexels.com/photos/2014428/pexels-photo-2014428.jpeg',
  // 'https://images.pexels.com/photos/2014430/pexels-photo-2014430.jpeg',
  // 'https://images.pexels.com/photos/2014431/pexels-photo-2014431.jpeg',
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
const picWidth = 200
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

  fetchHeight() {
    const img = new Image()
    img.src = this.url
    img.onload = () => {
      console.log(img.height, 'height')
      runInAction(() => {
        this.height = picWidth * (img.height / img.width)
        if (this.row > 0) {
          const upItem = data[this.row - 1][this.col]
          this.offsetY = upItem.offsetY + upItem.height + spaceY
        }
      })
    }
  }
}

const MasonryLayout = observer(() => {
  const init = () => {
    for (let i = 0; i < imgUrls.length; i++) {
      const row = Math.floor(i / columns)
      const col = i % columns

      // init data item
      if (!data[row]) {
        data[row] = [] as Obj[]
      }
      if (!data[row][col]) {
        data[row][col] = {} as Obj
      }

      // set data item
      runInAction(() => {
        data[row][col] = new Obj({ url: imgUrls[i], row, col })
      })
      data[row][col].fetchHeight()
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="mx-auto w-3/5">
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
      {/*{imgUrl.map((url, index) => {*/}
      {/*  const img = new Image()*/}
      {/*  // let width*/}
      {/*  // let height*/}
      {/*  const padding = 16*/}
      {/*  img.onload = function () {*/}
      {/*    console.log(img.width, img.height)*/}
      {/*  }*/}
      {/*  img.src = url*/}
      {/*  const rowX = Math.ceil(index / 3)*/}
      {/*  const rowY = index % 3*/}
      {/*  const imgItem = {*/}
      {/*    width: 340,*/}
      {/*    height: 340 * (img.height / img.width),*/}
      {/*    rowX,*/}
      {/*    rowY,*/}
      {/*    positionY: rowY * (340 + padding),*/}
      {/*    positionX: rowX * (340 + padding)*/}
      {/*  }*/}
      {/*  console.log(imgItem)*/}
      {/*  return (*/}
      {/*    <div key={index} className="mb-4">*/}
      {/*      <img className="h-auto max-w-full rounded-lg" src={url} alt="" />*/}
      {/*    </div>*/}
      {/*  )*/}
      {/*})}*/}
    </div>
  )
})
export default MasonryLayout
