const net = require('net')

const [,,port] = process.argv

var sockets=[];

net.createServer(socket => {

    sockets.push(socket)
    
    socket.on('data', data => {
        process.stdout.write(data)
        write(socket)
    })

    function write(socket){
        sockets.forEach(client => {
            if (client==!socket) process.stdin.on('data', data => socket.write(data))
        })
    }
    
}).listen(port)