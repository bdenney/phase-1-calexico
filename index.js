let menuItemsDiv = document.getElementById("menu-items")
let menuItemImg = document.getElementById("dish-image")
let menuItemName = document.getElementById("dish-name")
let menuItemDesc = document.getElementById("dish-description")
let menuItemPrice = document.getElementById("dish-price")
let cartForm = document.getElementById("cart-form")
let cartAmt = document.getElementById("cart-amount")
let numSpan = document.getElementById("number-in-cart")
let dishSection = document.getElementById("dish")

let menuItemsArr = [] //"state" -  always should mirror DB

const BASE_URL = "http://localhost:3000/"

function renderMenuItem(menuItem) {
  let itemSpan = document.createElement("span")
  itemSpan.textContent = menuItem.name
  itemSpan.addEventListener("click", () => displayItem(menuItem))
  menuItemsDiv.append(itemSpan)
}

function displayItem(menuItem) {
  dishSection.dataset.id = menuItem.id
    //write helper function
  let currentId = parseInt(dishSection.dataset.id)
  let currentItem = menuItemsArr.find(item => item.id === currentId)

  menuItemImg.src = currentItem.image
  menuItemName.textContent = currentItem.name
  menuItemDesc.textContent = currentItem.description
  let price = currentItem.price.toFixed(2)
  menuItemPrice.textContent = `$${price}`
  numSpan.textContent = currentItem.number_in_bag
}

function addToCart(e) {
  e.preventDefault()

  let amt = parseInt(e.target["cart-amount"].value)
  amt = amt || 0 
    //write helper function
  let currentId = parseInt(dishSection.dataset.id)
  let currentItem = menuItemsArr.find(item => item.id === currentId)

  let idx = menuItemsArr.findIndex(item => item.id === currentId)
  let total = currentItem.number_in_bag + amt

  currentItem = { ...currentItem, number_in_bag: total }
  menuItemsArr.splice(idx, 1, currentItem)

  numSpan.textContent = total
  e.target.reset()

  updateDB(total)
  //calculate and put total price somewhere on page
}

function updateDB(total) {
  let id = dishSection.dataset.id // write a getDatasetId function
  fetch(BASE_URL + `menu/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      number_in_bag: total,
    }),
  })
    .then(r => r.json())
    .then(data => console.log(data))
}

function app() {
  fetch(BASE_URL + "menu")
    .then(r => r.json())
    .then(menuItems => {
      menuItems.forEach(menuItem => {
        menuItemsArr.push(menuItem)
        renderMenuItem(menuItem)
      })
      dishSection.setAttribute("data-id", menuItemsArr[0].id)
      displayItem(menuItemsArr[0])
    })
  cartForm.addEventListener("submit", addToCart)
}

app()
