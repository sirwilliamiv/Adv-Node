const server = require('net').createServer();
let counter = 0;
let sockets ={};

server.on('connection', socket => {
  socket.id = counter++;
  sockets[socket.id] = socket;
  console.log('Client is connected')
  socket.write('Welcome to the Chat! \n')

  socket.on('data', data => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    Object.entries(sockets).forEach(([key,clientSocket]) => {
      if(socket.id === key) return;
      clientSocket.write(`${socket.id}: `)
      clientSocket.write(data)

    })
  })
// socket.write default is utf8 but can be set globally with:
  socket.setEncoding('utf8')

  socket.on('end', ()=> {
    delete sockets[socket.id];
    console.log("client disconnected")
  })
});

server.listen(8900, () => console.log('Server listening'));
