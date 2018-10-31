const forEachRecurisve = require('./foreach')

const { argv:[ , , ...nums] } = process

forEachRecurisve(nums, (num,index) => console.log(num + ', position: ' + index))