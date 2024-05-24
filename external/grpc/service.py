import grpc
import hello_server_pb2
import hello_server_pb2_grpc
import time
import random
import string
from concurrent import futures


class HelloServerServicer(hello_server_pb2_grpc.HelloServerServicer):
    def GetServerInfo(self, request, context):
        message = f"Hello, {request.name}! Server version is {request.version}"
        return hello_server_pb2.ServerInfoResponse(message=message, name=request.name)


class ChatServiceServicer(hello_server_pb2_grpc.ChatServiceServicer):
    def __init__(self):
        self.users = {}

    def Chat(self, request_iterator, context):
        for request in request_iterator:
            if request.id == "auth":
                user_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
                self.users[user_id] = True
                yield hello_server_pb2.ChatMessage(id=user_id)
                while user_id in self.users:
                    time.sleep(5)
                    yield hello_server_pb2.ChatMessage(id=f"Hello from python-grpc at {time.ctime()}")
            elif request.id.startswith("exit:"):
                user_id = request.id.split(":")[1]
                if user_id in self.users:
                    del self.users[user_id]
                    context.cancel()
                    break


def run():
    grpc_server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    hello_server_pb2_grpc.add_HelloServerServicer_to_server(HelloServerServicer(), grpc_server)
    hello_server_pb2_grpc.add_ChatServiceServicer_to_server(ChatServiceServicer(), grpc_server)
    grpc_server.add_insecure_port('[::]:50052')
    print('Starting server. Listening on port 50052')
    grpc_server.start()
    grpc_server.wait_for_termination()


if __name__ == '__main__':
    run()
