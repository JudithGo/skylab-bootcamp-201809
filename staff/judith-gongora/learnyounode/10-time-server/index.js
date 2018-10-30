let net = require('net')  

const {argv:[,,port]} = process

let date = new Date()
let month = date.getMonth()+1
let data = date.getFullYear() + '-' + month + '-' + date.getDate()+ ' ' + date.getHours()+ ':' + date.getMinutes()

let server = net.createServer((socket) => {        
    socket.write(data)
    socket.end("\n")
}).on('error', (err) => {
    throw err;
})  
server.listen(port)  