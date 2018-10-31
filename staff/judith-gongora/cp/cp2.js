var fs = require('fs');
const {argv: [,,source, destination]} = process
fs.createReadStream(source).pipe(fs.createWriteStream(destination))