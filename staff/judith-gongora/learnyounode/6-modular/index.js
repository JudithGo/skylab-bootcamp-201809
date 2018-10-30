let myModule = require('./module.js')


myModule(process.argv[2], process.argv[3], (err, list) => {
    if (err) return console.error('Error: ,' + err)
    list.forEach(file => console.log(file))
})