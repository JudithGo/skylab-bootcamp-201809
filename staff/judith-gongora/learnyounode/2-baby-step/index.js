let suma = 0
for (i=2; i < process.argv.length; i++){
    suma += parseFloat(process.argv[i])
}
console.log(suma)