var http = require("http")
http.get(process.argv[2], (res) =>{
    
    res.setEncoding('utf8')
    res.on("data", (chunk) => console.log(chunk))
    // res.on("error", (chunk) => console.log(chunk))
    // res.on("end", (chunk) => console.log(chunk))
    
      
})