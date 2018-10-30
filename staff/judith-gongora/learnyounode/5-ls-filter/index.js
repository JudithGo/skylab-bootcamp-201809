let fs = require('fs')  
var path = require('path')

fs.readdir(process.argv[2], 'utf8', (error, files) => { 
    if (error === null){

        files.forEach(file => { 
            var ext = path.extname(file)
            var ext1 = '.' + process.argv[3]
            if (ext === ext1){
                console.log(file)
            }
        })
    }
 } )