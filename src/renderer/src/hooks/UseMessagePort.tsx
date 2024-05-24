import { useEffect, useState } from 'react'

let interval: NodeJS.Timeout

const useMessagePort = <T,>({ callBack }: { callBack: (data: T) => void }) => {
  const [isHasMessagePort, setIsHasMessagePort] = useState(false)

  const initInterval = useCallback(() => {
    interval = setInterval(() => {
      if (window.electronMessagePort) {
        window.electronMessagePort.onmessage = (event) => {
          callBack && callBack(event.data)
        }
        setIsHasMessagePort(true)
      } else {
        console.log('no message port')
      }
    }, 500)
  }, [callBack])

  useEffect(() => {
    initInterval()
    return () => {
      clearInterval(interval)
    }
  }, [initInterval])

  return { isHasMessagePort }
}

export default useMessagePort
