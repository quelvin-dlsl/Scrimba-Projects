/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

let meter = 0
let liter = 0
let kilogram = 0
let feet = 0
let gallon = 0
let pound = 0

const ft = 3.281
const gln = 0.264
const pnd = 2.204

const inputValue = document.getElementById("input-value")
const convertBtn = document.getElementById("convert-btn")

const length = document.getElementById("length")
const volume = document.getElementById("volume")
const mass = document.getElementById("mass")

convertBtn.addEventListener('click', function(){
    let num = inputValue.value
    length.innerHTML = "<h3>Length (Meter/Feet)</h3>"
    volume.innerHTML = "<h3>Volume (Liters/Gallons)</h3>"
    mass.innerHTML = "<h3>Mass (Kilograms/Pounds)</h3>"
    let convertLength = ""
    let convertVolume = ""
    let convertMass = ""

    convertLength = `<p>${num} meters = ${(num * ft).toFixed(3)} feet | ${num} feet = ${(num / ft).toFixed(3)} meters</p>`
    convertVolume = `<p>${num} liters = ${(num * gln).toFixed(3)} gallons | ${num} gallons = ${(num / gln).toFixed(3)} liters</p>`
    convertMass = `<p>${num} kilos = ${(num * pnd).toFixed(3)} pounds | ${num} pounds = ${(num / pnd).toFixed(3)} kilos</p>`

    length.innerHTML += convertLength
    volume.innerHTML += convertVolume
    mass.innerHTML += convertMass

})