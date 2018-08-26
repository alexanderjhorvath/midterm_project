$(document).ready(function() {
  // Keep cart items if they exist in session, else use empty array 
  let itemsArray;
  if (localStorage.getItem('items')) {
    itemsArray = JSON.parse(localStorage.getItem('items'));
  } else {
    itemsArray = [];
  }

  localStorage.setItem('items', JSON.stringify(itemsArray));
  const data = JSON.parse(localStorage.getItem('items'));
console.log(data);

  // Render all cart items on page load
  function renderAllCart() {
    data.forEach(function(item) {
      let $cartItem = createCartElement(item);
      $('CART CONTAINER').append($cartItem);
    })
  }
  renderAllCart();


  // Render latest cart item
  function renderNewCartItem(item) {
    let $cartItem = createCartElement(item);
    $('CART CONTAINER').append($cartItem);
  }

  // Create html element 
  function createCartElement(data) {
    let $text = $("<article>").addClass("cart-item");

    let insert = 
      `<div>
        <p>${data.name} - $${data.price}</p>
      </div>`
    $text.html(insert);
    return $text;
  }


  // On add to cart button click, add item to local storage and call render new cart item funciton
  $('.btn').on('click', function() {
    // Grabbing ID of button clicked
    let uniqueID = this.id;

    // Retreiving item information
    const itemName = document.getElementById(`item-${uniqueID}-name`).innerText;
    const itemPrice = parseFloat(document.getElementById(`item-${uniqueID}-price`).innerText);

    // Creating object to push into cart array
    let itemInfo = { id: uniqueID, name: itemName, price: itemPrice };

    // Pushing and setting local storage
    itemsArray.push(itemInfo);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    const data = JSON.parse(localStorage.getItem('items'));
    console.log(data);
    renderNewCartItem(data[data.length - 1]);

  })

  $('CHECKOUT-FORM').on('click', function() {
    console.log(localStorage.getItem('items'));
    var x = localStorage.getItem('items');
    $('#submit-order').val(x);
  })


  // Clears cart
  $('CLEAR CART BUTTON').on('click', function() {
    localStorage.clear();
    renderAllCart();
  })

})
