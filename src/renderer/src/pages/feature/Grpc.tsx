import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

// const packageDefinition = protoLoader.loadSync('resources/hello_server.proto')

const Grpc = observer(() => {
  const [message, setMessage] = useState('')
  const [key, setKey] = useState('')

  useEffect(() => {
    // console.log(312)
    sendProto().then()
    getProto().then()
    return () => {
      breakMessage().then()
    }
  }, [])

  const sendProto = async () => {
    const res = await window.electron.ipcRenderer.invoke('grpc')
    console.log(res, 'res')
  }

  const getProto = async () => {
    window.electron.ipcRenderer.on('grpc-message', (_event, args) => {
      setMessage(args.data)
      console.log('grpc-message', args)
    })
    window.electron.ipcRenderer.on('grpc-key', (_event, args) => {
      setKey(args.data)
      console.log('grpc-message', args)
    })
  }
  const breakMessage = async () => {
    const client = await window.electron.ipcRenderer.invoke('grpc', true)
    console.log(client, 'client')
  }

  return (
    <div>
      <div>key:{key}</div>
      <div>message:{message}</div>
      <button className="mt-4" onClick={breakMessage}>
        断开
      </button>
    </div>
  )
})
export default Grpc
