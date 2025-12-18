const getColor = document.getElementById('get-color-scheme')

const colorObj = document.querySelectorAll('.color-one, .color-two, .color-three, .color-four, .color-five')
const hexObj = document.querySelectorAll('#hex-color-one, #hex-color-two, #hex-color-three, #hex-color-four, #hex-color-five')

const defaultColors = ['#000000', '#333333', '#666666', '#999999', '#CCCCCC']

colorObj.forEach((element, index) => {
    element.style.background = defaultColors[index]
})

hexObj.forEach((element, index) => {
    element.innerHTML = defaultColors[index]
})


getColor.addEventListener('submit', function(e){
    e.preventDefault()

    const hexId = document.getElementById('color-picker')
    const scheme = document.getElementById('color-scheme')

    fetch(`https://www.thecolorapi.com/scheme?hex=${hexId.value.slice(1)}&mode=${scheme.value}`)
        .then(res => res.json())
        .then(data => {
            data.colors.forEach((color, i) => {
                colorObj[i].style.background = color.hex.value
                hexObj[i].innerHTML = color.hex.value
            })
        })

})

