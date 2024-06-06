// grpc-handler.ts
import { BrowserWindow, ipcMain } from 'electron'
import * as protoLoader from '@grpc/proto-loader'
import * as grpc from '@grpc/grpc-js'

let call: grpc.ClientDuplexStream<any, any> | null = null
let key = ''

const connectService = () => {
  const packageDefinition = protoLoader.loadSync('resources/hello_server.proto')
  const proto = grpc.loadPackageDefinition(packageDefinition).tora as any
  return new proto.ChatService('localhost:50052', grpc.credentials.createInsecure())
}

export const registerGrpcHandler = (mainWindow: BrowserWindow) => {
  ipcMain.handle('grpc-hello', async () => {
    return new Promise((resolve, reject) => {
      const client = connectService()
      client.GetServerInfo(
        { name: 'electron-tora', version: '1.0.1' },
        (err: unknown, response: { name: string; message: string }) => {
          if (err) {
            console.error('Error:', err)
            reject('error')
            return
          }
          console.log('Server Info:', response)
          resolve(response)
        }
      )
    })
  })

  ipcMain.handle(
    'grpc-chat',
    async (_event, { type }: { type: 'auth' | 'exit' | 'client-exit' }) => {
      return new Promise((resolve, reject) => {
        if (type === 'client-exit') {
          call?.cancel()
          console.log('Ending call')
          resolve('end')
          return
        }

        if (type === 'exit') {
          console.log('exit', call?.write)
          call?.write(
            { password: '123456', type: 'exit', user: 'electron-tora', key },
            (error: unknown) => {
              if (error) {
                console.error('Error sending exit message:', error)
                return
              }
              console.log('Exit message sent successfully.')
            }
          )
          return
        }

        const client = connectService()
        call = client.Chat()

        call?.on('data', (response: any) => {
          if (response.message && response.message.startsWith('Hello')) {
            mainWindow?.webContents.send('grpc-message', { data: response.message })
            console.log('Received message:', response)
          } else {
            key = response.key
            console.log('Received key:', response)
            mainWindow?.webContents.send('grpc-key', { data: response.id, error: response.error })
          }
        })

        call?.on('end', () => {
          console.log('Stream ended.')
        })

        call?.on('error', (err) => {
          console.error('Stream error:', err)
        })

        call?.write({ password: '123456', type: 'auth', user: 'electron-tora', key })

        if (call) {
          resolve('success')
        } else {
          reject('error')
        }
      }).catch((err) => {
        console.error('Error:', err)
      })
    }
  )
}
