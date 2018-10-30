module.exports = function(path, exte, callback) {
    let filter = '.' + exte
    let fs = require('fs')  
    fs.readdir(path, (err, list) => {

        if (err) return callback(err) 
          
        var path = require('path')
        let res = list.filter(file => path.extname(file) === filter)        
        callback(null, res)
    
    })
}