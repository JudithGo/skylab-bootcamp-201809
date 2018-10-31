
let i = 0

function forEachRecurisve (nums, callback) {
    
    callback(nums[i],i)

    if (i < nums.length-1) {
        i++
        forEachRecurisve(nums, callback)
    }
}   

module.exports = forEachRecurisve
