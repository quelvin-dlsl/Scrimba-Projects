import { menuArray } from "./data.js";

let orders = []

document.addEventListener('click',function(e){
        if(e.target.classList.contains('add-to-order')){
            const item = e.target.dataset.name

            orders.push(item)
            renderOrder()
        } else if(e.target.classList.contains('remove-btn')){
            const itemToRemove = e.target.dataset.remove

            handleRemoveClick(itemToRemove)
            renderOrder()
        } else if(e.target.classList.contains('complete-order-btn')){
            document.querySelector('.modal').classList.remove('hidden')
            renderModal()

            setupFormValidation()

            disableCompleteOrderButton()
        } else if(e.target.classList.contains('pay-btn')){
            e.preventDefault()
            handlePayment()
        } else if(e.target.classList.contains('modal')){
            e.target.classList.add('hidden')

            enableCompleteOrderButton()
        }

})

// Prevent clicks inside modal content from closing modal
document.addEventListener('click', function(e){
    if(e.target.closest('#modal-content')){
        e.stopPropagation()
    }
})

function disableCompleteOrderButton() {
    const completeBtn = document.getElementById('complete-order-btn')
    if (completeBtn) {
        completeBtn.disabled = true
        completeBtn.style.opacity = '0.5'
        completeBtn.style.cursor = 'not-allowed'
    }
}

function enableCompleteOrderButton() {
    const completeBtn = document.getElementById('complete-order-btn')
    if (completeBtn) {
        completeBtn.disabled = false
        completeBtn.style.opacity = '1'
        completeBtn.style.cursor = 'pointer'
    }
}

function setupFormValidation(){
    const nameInput = document.getElementById('name')
    const cardInput = document.getElementById('card-number')
    const cvvInput = document.getElementById('cvv')
    const payBtn = document.getElementById('pay-btn')

    // Validate name - only letters and spaces
    nameInput.addEventListener('input', function(e) {
        // Remove any non-letter characters (except spaces)
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '')
        checkFormValidity()
    })

     // Validate card number - format as ####-####-####-####
    cardInput.addEventListener('input', function(e) {
        // Remove all non-digits
        let value = this.value.replace(/\D/g, '')

        // Limit to 16 digits
        value = value.substring(0, 16)

        // Add dashes every 4 digits
        let formatted = value.match(/.{1,4}/g)?.join('-') || value

        this.value = formatted
        checkFormValidity()
    })

    // Validate CVV - limit to 3 digits
    cvvInput.addEventListener('input', function(e) {
        // Only allow digits
        this.value = this.value.replace(/\D/g, '')

        // Limit to 3 characters
        if (this.value.length > 3) {
            this.value = this.value.substring(0, 3)
        }
        checkFormValidity()
    })

    function checkFormValidity() {
        const nameValid = nameInput.value.trim().length > 0
        const cardValid = cardInput.value.replace(/-/g, '').length === 16
        const cvvValid = cvvInput.value.length === 3

        // Enable or disable pay button based on all inputs being valid
        if (nameValid && cardValid && cvvValid) {
            payBtn.disabled = false
            payBtn.style.opacity = '1'
            payBtn.style.cursor = 'pointer'
        } else {
            payBtn.disabled = true
            payBtn.style.opacity = '0.5'
            payBtn.style.cursor = 'not-allowed'
        }
    }

    // Initial check
    checkFormValidity()

}

function handlePayment() {
    const nameInput = document.getElementById('name')
    const customerName = nameInput.value.trim()

    // Hide modal
    document.querySelector('.modal').classList.add('hidden')

    enableCompleteOrderButton()

    // Clear orders
    orders = []

    // Display thank you message
    document.getElementById('order').innerHTML = `
        <div class="thank-you-message">
            <h2>Thanks, ${customerName}! Your order is on its way!</h2>
        </div>
    `
}

function handleRemoveClick(item){
    const index = orders.indexOf(item)

    if(index > -1) {
        orders.splice(index, 1)
    }

    if(orders.length === 0){
        document.getElementById('order').innerHTML = ''
    }
}


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
        const itemPrice = menuItem ? menuItem.price : 0 //If item exist
        const lineTotal = itemPrice * count

        totalPrice += lineTotal

        orderItemsHtml += `<div class="list-remove-style"><li id="${itemName}-item">${itemName} x${count}</li>
                            <button class="remove-btn" id="remove-btn" data-remove="${itemName}">remove</button></div>`
        orderPricesHtml += `<li>$${lineTotal}</li>`
    }

    const orderHtml = `<div class="order-menu" id="order-menu">
                            <h2 class="order-heading"> Your order </h2>
                            <div class="order-list">
                                <ul id="order-list-name">
                                    ${orderItemsHtml}
                                </ul>
                                <ul id="order-list-price">
                                    ${orderPricesHtml}
                                </ul>
                            </div>
                            <hr>
                            <p class="total-price" id="total-price"><span>Total price:</span> <span>$${totalPrice}</span></p>
                            <button class="complete-order-btn" id="complete-order-btn">Complete order</button>
                        </div>
                `
    return orderHtml
}

function renderOrder(){
    if (orders.length === 0) return

    document.getElementById('order').innerHTML = getOrderHtml()
}

function getModalHtml(){
    const modalHtml = `<h2> Enter card details</h2>
                        <form>
                            <input type="text" id="name" placeholder="Enter your name" required>
                            <input type="text" id="card-number" placeholder="Enter card number" required>
                            <input type="text" id="cvv" placeholder="Enter CVV" required>
                            <button type="submit" class="pay-btn" id="pay-btn"> Pay </button>
                        </form>
                                `

    return modalHtml
}

function renderModal(){
    document.getElementById('modal-content').innerHTML = getModalHtml()
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
