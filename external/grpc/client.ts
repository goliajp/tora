const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('hello_server.proto');
const proto = grpc.loadPackageDefinition(
  packageDefinition
).tora

const client = new proto.ChatService('localhost:50052', grpc.credentials.createInsecure());
const client2 = new proto.HelloServer('localhost:50052', grpc.credentials.createInsecure());



const call = client.Chat();

let userKey = '';

call.on('data', (response) => {
  if (response.id.startsWith("Hello")) {
    console.log('Received message:', response.id);
  } else {
    userKey = response.id;
    console.log('Authenticated with key:', userKey);
    // setInterval(() => {
    //   call.write({ id: "keepalive" });
    // }, 5000);
  }
});

call.on('end', () => {
  console.log('Stream ended.');
});

call.write({ id: 'auth' });

// Simulate client sending exit message after 30 seconds
setTimeout(() => {
  if (userKey) {
    call.cancel(); // 在这里调用 call.end() 方法

  }
}, 10000);