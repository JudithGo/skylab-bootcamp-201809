let fs = require('fs')  
fs.readFile(process.argv[2],function callback (error, text) { 
    if (error === null){
        var str = text.toString()
        var div = str.split('\n');
        console.log(div.length-1)
    }
 } )
