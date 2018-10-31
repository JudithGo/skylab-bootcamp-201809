const net = require('net')

const [,,port] = process.argv

var sockets=[];

const server = net.createServer(socket => {

    sockets.push(socket)
    
    socket.on('data', data => process.stdout.write(data))

    process.stdin.on('data', data => socket.write(data))
})

server.listen(port)