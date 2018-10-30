var http = require("http")

http.get(process.argv[2], (res) =>{
    
    res.setEncoding('utf8')

    let allData = ''
    res.on("data", (chunk) => allData += chunk)
    res.on("end", (chunk) => {
        console.log(allData.length)
        console.log(allData)
    })    
      
})