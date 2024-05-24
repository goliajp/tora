# coding:utf-8

import grpc
import hello_server_pb2
import hello_server_pb2_grpc


def run():
    channel = grpc.insecure_channel('localhost:50052')
    stub = hello_server_pb2_grpc.HelloServerStub(channel)
    response = stub.GetServerInfo(hello_server_pb2.ServerInfoRequest(name='electron-tora', version='1.0.0'))
    print('client received:', response.message)


if __name__ == '__main__':
    run()
