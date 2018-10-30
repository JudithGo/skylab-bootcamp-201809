var http = require('http')
var url = require('url')

console.log(process.argv[2])

http.createServer((req, res) => {
    var data = url.parse(req.url,true)

    if (data.pathname==='/api/parsetime'){
        var date = new Date(data.query.iso)

        data = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }
        res.writeHead({'Content-type' : 'aplication/json'})
        res.end(JSON.stringify(data))
    } else if (data.pathname==='/api/unixtime'){
        var date = new Date(data.query.iso)

        res.writeHead({'Content-type' : 'aplication/json'})
        res.end(JSON.stringify(data))
    }else {
        res.end('not valid method')

    }

    // if (req.method === 'POST') {
    //     req.pipe(map((chunk) => {
    //         return chunk.toString().toUpperCase()
    //     })).pipe(res)
    // }
}).listen(process.argv[2])