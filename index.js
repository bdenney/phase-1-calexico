// Write your code here...
const menuURL = "http://localhost:3000/menu"

document.addEventListener('DOMContentLoaded', () => {
    initialize()
})



function initialize() {
    fetch(menuURL)
        .then(res => res.json())
        .then(foodItems => {
            renderMenuItems(foodItems)
        })
    pageLoad()
    // submitForm()
}

function renderMenuItems(foodItems) {
    foodItems.forEach(foodItem => {
        const menuItems = document.querySelector("#menu-items");
        const span = document.createElement("span")
        span.textContent = foodItem.name
        menuItems.appendChild(span)
        span.setAttribute('identification', `${foodItem.id}`)
        span.addEventListener('click', () => {
            let attribute = span.getAttribute("identification");
            pageLoad(attribute)
        })
    })
}

function pageLoad(attribute = 1) {
    fetch(`${menuURL}/${attribute}`)
        .then(res => res.json())
        .then((foodItem) => {
            const dishImage = document.querySelector("#dish-image")
            const dishName = document.querySelector("#dish-name")
            const dishDescription = document.querySelector("#dish-description")
            const dishPrice = document.querySelector("#dish-price")
            const cartNumber = document.querySelector("#number-in-cart")
            const cartPrice = document.querySelector("#price-of-cart")
            dishImage.src = foodItem.image
            dishName.textContent = foodItem.name
            dishName.setAttribute("identification", attribute)
            dishDescription.textContent = foodItem.description
            dishPrice.textContent = `${foodItem.price}$`
            cartNumber.textContent = Number(foodItem.number_in_bag);
            const span = document.querySelector("#number-in-cart")
            cartPrice.textContent = `Your total price is ${Number(dishPrice.textContent.slice(0, -1)) * Number(span.textContent)}$`
        })
}

function handleClick(e) {
    const form = document.querySelector("#cart-form")
    e.preventDefault()
    let span = document.querySelector("#number-in-cart")
    span.textContent = Number(span.textContent) + Number(form["cart-amount"].value)
    const dishName = document.querySelector("#dish-name")
    const dishPrice = document.querySelector("#dish-price")
    const cartPrice = document.querySelector("#price-of-cart")
    let attribute = dishName.getAttribute("identification");
    fetch(`${menuURL}/${attribute}`, {
        method: 'PATCH',
        body: JSON.stringify({
            number_in_bag: Number(span.textContent),
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(() => {
        form.reset()
        cartPrice.textContent = `Your total price is ${Number(dishPrice.textContent.slice(0, -1)) * Number(span.textContent)}$`
    })
}