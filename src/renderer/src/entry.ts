import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

// global app entry
export const entry = () => {
  // extend dayjs plugins
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.tz.setDefault('Asia/Shanghai')
  // dayjs.extend(advancedFormat)
  // dayjs.extend(customParseFormat)
  // dayjs.extend(duration)
  // init realtime ticker
  setTimeZone()
}

const setTimeZone = () => {
  // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  console.log(dayjs.tz().format('YYYY-MM-DD HH:mm:ss'))
}
