import asyncio
import grpc
import hello_server_pb2
import hello_server_pb2_grpc


class GRPCChatClient:
    def __init__(self):
        self.channel = grpc.aio.insecure_channel('localhost:50052')
        self.stub = hello_server_pb2_grpc.ChatServiceStub(self.channel)
        self.call = None

    async def handle_message(self, message_type):
        if message_type == 'client-exit':
            if self.call:
                await self.call.cancel()
                print('Ending call')
                return 'end'

        if message_type == 'exit':
            if self.call:
                await self.call.write(
                    hello_server_pb2.ChatMessageRequest(password='123456', type='exit', user='electron-tora', key=''))
                print('Exit message sent successfully.')
                return

        self.call = self.stub.Chat()

        self.call.add_done_callback(lambda call: print('Stream ended.'))

        try:
            request = hello_server_pb2.ChatMessageRequest(password='123456', type='auth', user='electron-tora', key='')
            await self.call.write(request)

            async for response in self.call:
                if response.message and response.message.startswith('Hello'):
                    print('Received message:', response.message)
                else:
                    print('Received key:', response.key)
        except grpc.aio.AioRpcError as err:
            print('Stream error:', err)

        if self.call:
            return 'success'
        else:
            return 'error'


async def main():
    client = GRPCChatClient()
    print(await client.handle_message('auth'))


if __name__ == '__main__':
    asyncio.run(main())
