import { autorun, makeAutoObservable } from 'mobx'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

type LocalStoreType = {
  timeZone: string
  setTimeZone: (timeZone: string) => void
}

dayjs.extend(timezone)
dayjs.extend(utc)

const getDefaultLocalStore = () => {
  // 尝试从localStorage中获取之前保存的数据
  const stored = localStorage.getItem('localStore')
  if (stored) {
    // 如果有保存的数据，就解析这些数据来作为初始值
    return JSON.parse(stored)
  } else {
    // 如果没有保存的数据，返回一个默认的初始值对象
    return {
      timeZone: dayjs.tz.guess()
    }
  }
}

export const localStore = makeAutoObservable<LocalStoreType>({
  ...getDefaultLocalStore(), // 使用从localStorage获取的数据来初始化
  setTimeZone(timeZone: string) {
    this.timeZone = timeZone
  }
})

autorun(() => {
  // 使用JSON.stringify将对象序列化为字符串存储在localStorage中
  localStorage.setItem(
    'localStore',
    JSON.stringify({
      timeZone: localStore.timeZone
      // anotherValue: localStore.anotherValue
      // ... 也保存其他需要同步的值
    })
  )
})
