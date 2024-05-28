import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

const Grpc = observer(() => {
  const [message, setMessage] = useState('')
  const [key, setKey] = useState('')

  useEffect(() => {
    // sendProto().then()
    getProto().then()
    return () => {
      breakMessage().then()
    }
  }, [])

  const sendProto = async () => {
    const res = await window.electron.ipcRenderer.invoke('grpc-chat', { type: 'auth' })
    console.log(res, 'res')
  }

  const getProto = async () => {
    window.electron.ipcRenderer.on('grpc-message', (_event, args) => {
      setMessage(args.data)
      console.log('grpc-message', args)
    })
    window.electron.ipcRenderer.on('grpc-key', (_event, args) => {
      if (args.error) {
        alert('密码错误')
        return
      }
      setKey(args.data)
      console.log('grpc-message', args)
    })
  }
  const clientBreakMessage = async () => {
    const client = await window.electron.ipcRenderer.invoke('grpc-chat', { type: 'client-exit' })
    console.log(client, 'client')
  }

  const breakMessage = async () => {
    const client = await window.electron.ipcRenderer.invoke('grpc-chat', { type: 'exit' })
    console.log(client, 'client')
  }

  const hello = async () => {
    const res = await window.electron.ipcRenderer.invoke('grpc-hello')
    alert(res.message)
    console.log(res, 'res')
  }

  return (
    <div>
      <div>key:{key}</div>
      <div>message:{message}</div>
      <div className="flex my-4">
        <button onClick={hello}>c2s单向</button>
        <button className="ml-4" onClick={sendProto}>
          c2s双向
        </button>
      </div>
      <button className="mt-4" onClick={clientBreakMessage}>
        从客户端断开
      </button>
      <button className="mt-4" onClick={breakMessage}>
        从服务端断开
      </button>
    </div>
  )
})
export default Grpc
