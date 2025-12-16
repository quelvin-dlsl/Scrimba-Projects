import { menuArray } from "./data.js";

let orders = []

document.addEventListener('click',function(e){
        if(e.target.classList.contains('add-to-order')){
            const item = e.target.dataset.name
            console.log(`${item} clicked`)

            orders.push(item)
            renderOrder()
        }

})


function getOrderHtml() {

    const itemCounts = {}
    // Count number of occurences (multiple added items)
    orders.forEach(item => {
        itemCounts[item] = (itemCounts[item] || 0) + 1
    })

    let orderItemsHtml = ''
    let orderPricesHtml = ''
    let totalPrice = 0

    for (let itemName in itemCounts) {
        const count = itemCounts[itemName]

        const menuItem = menuArray.find(item => item.name === itemName)
        const itemPrice = menuItem ? menuItem.price : 0
        const lineTotal = itemPrice * count

        totalPrice += lineTotal

        orderItemsHtml += `<li id="${itemName}-item">${itemName} x${count}</li>`
        orderPricesHtml += `<li>$${lineTotal}</li>`
    }

    const orderHtml = `<div class="order-menu" id="order-menu">
                    <h2 class="order-heading"> Your order </h2>
                    <ul id="order-list-name">
                        ${orderItemsHtml}
                    </ul>
                    <ul id="order-list-price">
                        ${orderPricesHtml}
                    </ul>
                    <p class="total-price" id="total-price">Total price: $${totalPrice}</p>
                    <button class="complete-order-btn" id="complete-order-btn">Complete order</button>
                </div>
                `
    return orderHtml
}

function countOccurrences(item) {
    return orders.filter(order => order === item).length
}

function renderOrder(){
    if (orders.length === 0) return

    document.getElementById('order').innerHTML = getOrderHtml()
}

function getMenuHtml() {
    let menuHtml = ''

    menuHtml = (menuArray.map(items =>
            `<div class="menu-item-card">
                <h2 class="emoji"> ${items.emoji} </h2>
                <div class="item-details">
                    <h2 class="item-name"> ${items.name} </h2>
                    <p class="ingredients"> ${items.ingredients.map(ingredient => `${ingredient}`).join(', ')} </p>
                    <p class="price"> ${'$' + items.price} </p>
                </div>
                <button class="add-to-order" id="add-to-order" data-name="${items.name}"> + </button>
            </div>`).join(''))

    return menuHtml
}

function render() {
    document.getElementById('menu').innerHTML = getMenuHtml()
}

render()

console.log(getMenuHtml())

console.log(getOrderHtml())