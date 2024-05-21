import { observer } from 'mobx-react-lite'
import TimezoneSelect, { type ITimezone } from 'react-timezone-select'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { localStore } from '@/renderer/src/store/local.ts'

const TimeZone = observer(() => {
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const [nowTime, setNowTime] = useState(dayjs.tz().format('YYYY-MM-DD HH:mm:ss'))
  // const [value, setValue] = useLocalStorage('timezone', dayjs.tz.guess())
  useEffect(() => {
    if (typeof selectedTimezone !== 'string') {
      dayjs.tz.setDefault(selectedTimezone.value)
      localStore.setTimeZone(selectedTimezone.value)
      setNowTime(dayjs().tz().format('YYYY-MM-DD HH:mm:ss'))
    }
  }, [selectedTimezone])

  return (
    <div>
      <TimezoneSelect value={selectedTimezone} onChange={setSelectedTimezone} />
      <div>时间: {nowTime}</div>
      <div>时区: {localStore.timeZone}</div>
    </div>
  )
})
export default TimeZone
