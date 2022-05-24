const menuItemsDiv = document.getElementById("menu-items");

const dishImage = document.getElementById("dish-image");
const dishName = document.getElementById("dish-name");
const dishDescription = document.getElementById("dish-description");
const dishPrice = document.getElementById("dish-price");

const cartAmount = document.getElementById("cart-amount");
const numberInCart = document.getElementById("number-in-cart");


const cartForm = document.getElementById("cart-form");
cartForm.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(cartAmount.value);
    console.log(numberInCart.textContent);

    const total = parseInt(cartAmount.value) + parseInt(numberInCart.textContent);

    numberInCart.textContent = total;
});

fetch("http://localhost:3000/menu")
.then(response => response.json())
.then(json => {
    console.log(json)

    for (const item of json) {
        const spanElement = document.createElement("span");
        spanElement.textContent = item.name;
        console.log(spanElement);

        spanElement.addEventListener('click', (event) => {
            showItem(item)
        });

        menuItemsDiv.appendChild(spanElement);
    }

    console.log(json[0]);

    showItem(json[0]);

});

function showItem(itemJson) {
    dishImage.src = itemJson.image;

    dishName.textContent = itemJson.name;
    dishDescription.textContent = itemJson.description;
    dishPrice.textContent = itemJson.price;
}