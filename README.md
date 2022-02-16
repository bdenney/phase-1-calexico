# Calexico

![Finished Product](./assets/finished-project.png "Finished Product")

You've worked up quite the hunger after a long day of coding. Fortunately, your favorite tex-mex restuarant is open for delivery! Unfortunately, some jerk deleted all the javascript from their site!

ONLY YOU can fix Calexico's website and earn yourself some delicious fare.

---

## Setup

Run json-server from this directory.

```
json-server --watch db.json
```

Test your server by visiting this route in the browser:

[http://localhost:3000/menu](http://localhost:3000/menu)

Then, open the `index.html` file on your browser to run the application.

Write your code in the `index.js` file.

## Challenge #1
Fetch all the menu items from `http://localhost:3000/menu`. For each menu item create a `span` element that contains the name of the menu item, and add it to the `#menu-items` div.

## Challenge #2
When the page loads, display the first menu item. You should set the image, name, description, and price. All the correct elements to set are located in the `#dish` `section` element.

## Challenge #3
When the user clicks on the menu items on the left, they should see all the details for that specific menu item.

## Challenge #4
The user should be able to add the menu items to their cart. When the user presses the 'Add to Cart' button, that number should be added to however many are currently in the cart.

For example, if there are currently 2 burritos in the cart, and the user adds 2 more, the total should be 4.

> *It is okay if the value resets in-between clicking on the menu items! It does not need to save state!*
---
# Bonus Challenges!

## Bonus Challenge #1
The value of the cart for each item should persist when clicking through the various menu items.

## Bonus Challenge #2 
Calculate the *total cost* of what is currently in the cart and display it somewhere on the page.

## Bonus Challenge #3
Use PATCH requests to maintain the value of the cart in-between refreshes.
