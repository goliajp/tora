// grpc-handler.ts
import { BrowserWindow, ipcMain } from 'electron'
import * as protoLoader from '@grpc/proto-loader'
import * as grpc from '@grpc/grpc-js'

let call: grpc.ClientDuplexStream<any, any> | null = null

export const registerGrpcHandler = (mainWindow: BrowserWindow) => {
  ipcMain.handle('grpc', async (_event, flag) => {
    return new Promise((resolve, reject) => {
      if (flag) {
        // call.write({ id: `exit:${userKey}` })
        call?.cancel()
        console.log('Ending call')
        resolve('end')
        return
      }

      let userKey = ''
      const packageDefinition = protoLoader.loadSync('resources/hello_server.proto')
      const proto = grpc.loadPackageDefinition(packageDefinition).tora as any
      const client = new proto.ChatService('localhost:50052', grpc.credentials.createInsecure())
      call = client.Chat()

      call?.on('data', (response: any) => {
        if (response.id.startsWith('Hello')) {
          mainWindow?.webContents.send('grpc-message', { data: response.id })
          console.log('Received message:', response.id)
        } else {
          userKey = response.id
          console.log('Authenticated with key:', userKey)
          mainWindow?.webContents.send('grpc-key', { data: userKey })
        }
      })

      call?.on('end', () => {
        console.log('Stream ended.')
        // call = null
      })

      call?.on('error', (err) => {
        console.error('Stream error:', err)
        // call = null // Clear the call reference on error
      })

      call?.write({ id: 'auth' })

      if (call) {
        resolve('success')
      } else {
        reject('error')
      }
    })
  })
}
