import { menuArray } from "./data.js";

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
                <button class="add-to-order" id="add-to-order"> + </button>
            </div>`).join(''))

    return menuHtml
}

function render() {
    document.getElementById('menu').innerHTML = getMenuHtml()
}

render()

console.log(getMenuHtml())
