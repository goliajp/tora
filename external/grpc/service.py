import grpc
import hello_server_pb2
import hello_server_pb2_grpc
import time
import random
import string
from concurrent import futures
import asyncio
import threading


# def createTimer():
#     print('create')
#     t = threading.Timer(2, interval)
#     t.start()
#
#
# def interval():
#     createTimer()
#     yield hello_server_pb2.ChatMessageResponse(
#         message="Hello", time=time.ctime(),
#         message_from="python-grpc")
#     print('Now:', time.strftime('%H:%M:%S', time.localtime()))


class ChatServiceServicer(hello_server_pb2_grpc.ChatServiceServicer):
    def __init__(self):
        self.users = {}

    def Chat(self, request_iterator, context):

        def response_stream():
            key = None
            for request in request_iterator:
                if request.password == "123456" and request.type == "auth":
                    key = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
                    self.users[key] = True
                    yield hello_server_pb2.ChatMessageResponse(key=key, message="You are authenticated",
                                                               time=time.ctime(),
                                                               message_from="python-grpc")

                    def auth_loop():
                        while key in self.users and request.type == "auth":
                            print(self.users)
                        #     time.sleep(5)
                        #     yield hello_server_pb2.ChatMessageResponse(
                        #         message="Hello", time=time.ctime(),
                        #         message_from="python-grpc")

                    threading.Thread(target=auth_loop).start()

                elif request.type == "exit":
                    if key in self.users:
                        del self.users[key]
                        context.cancel()
                        break
                else:
                    yield hello_server_pb2.ChatMessageResponse(message="error", error="error")
                    context.cancel()

        return response_stream()

    def GetServerInfo(self, request, context):
        message = f"Hello, {request.name}! Server version is 1.0.0"
        return hello_server_pb2.ServerInfoResponse(message=message, name='python-grpc')


def run():
    grpc_server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    hello_server_pb2_grpc.add_ChatServiceServicer_to_server(ChatServiceServicer(), grpc_server)
    grpc_server.add_insecure_port('[::]:50052')
    print('Starting server. Listening on port 50052')
    grpc_server.start()
    grpc_server.wait_for_termination()


if __name__ == '__main__':
    run()
