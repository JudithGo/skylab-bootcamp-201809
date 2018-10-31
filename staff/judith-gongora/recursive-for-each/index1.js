const nums = [1, 2, 3]

let i = 0

function forEachRecurisve (nums, callback) {
    
    callback(nums[i])

    if (i < nums.length-1) {
        i++
        forEachRecurisve(nums, callback)
    }
}   

forEachRecurisve(nums, num => console.log(num))