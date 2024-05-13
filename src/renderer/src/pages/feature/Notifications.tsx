import { observer } from 'mobx-react-lite'
import { useRef, useState } from 'react'

const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked!'

const Notifications = observer(() => {
  const output = useRef<HTMLDivElement | null>(null)
  const [message, setMessage] = useState('')

  new window.Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY }).onclick = () => {
    // output.current?.innerText = CLICK_MESSAGE
    setMessage(CLICK_MESSAGE)
  }
  return (
    <div className="mx-auto w-3/5">
      <div id="output" className="mt-4" ref={output}>
        {message}
      </div>
    </div>
  )
})
export default Notifications
