const vars = process.argv.slice(2)
// const {argv:[,,...urls]} = process
var http = require("http")

vars.forEach(url => {
    http.get(url, (res) =>{
    
        res.setEncoding('utf8')
    
        let allData = ''
        res.on("data", (chunk) => allData += chunk)
        res.on("end", (chunk) => {
            console.log(allData)
        })    
          
    })
})


