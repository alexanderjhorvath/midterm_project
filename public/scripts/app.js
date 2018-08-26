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
<<<<<<< HEAD

  let $orderTotal = 0;
=======
console.log(data);
>>>>>>> 63d961a5d08655b15eadb3fd75c3e73c9abda14b

  // Render all cart items on page load
  function renderAllCart() {
    data.forEach(function(item) {
      let $cartItem = createCartElement(item);
      $orderTotal += item.price;
      console.log($orderTotal);
      $('#order-items').append($cartItem);
    })
  }
  renderAllCart();


  // Render latest cart item
  function renderNewCartItem(item) {
    let $cartItem = createCartElement(item);
    $orderTotal += item.price;
    console.log($orderTotal);
    $('#order-items').append($cartItem);
  }

  // Create html element
  function createCartElement(data) {
    let $text = $("<tr>").addClass("item");

    let insert =
    `<td data-th="Product">
        <div class="row">
          <div class="col-sm-2 hidden-xs"></div>
          <div class="col-sm-10" style="padding-left: 50px;">
            <h4 class="nomargin">${data.name}</h4>
          </div>
        </div>
      </td>
      <td data-th="Price">$${data.price}.00</td>
      <td data-th="Quantity">
        1
      </td>
      <td data-th="Subtotal" class="text-center">$${data.price}.00</td>
      <td class="actions" data-th="">
        <button class="btn btn-info btn-sm"><i class="fas fa-sync-alt"></i></button>
        <button class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
      </td>`
    $text.html(insert);
    return $text;
  }


  // On add to cart button click, add item to local storage and call render new cart item funciton
<<<<<<< HEAD
  $('.btn-info').on('click', function() {
=======
  $('.btn').on('click', function() {
>>>>>>> 63d961a5d08655b15eadb3fd75c3e73c9abda14b
    // Grabbing ID of button clicked
    $('#collapseBasket').collapse('show');
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
<<<<<<< HEAD
=======
    console.log(data);
>>>>>>> 63d961a5d08655b15eadb3fd75c3e73c9abda14b
    renderNewCartItem(data[data.length - 1]);

  })

  $('CHECKOUT-FORM').on('click', function() {
    console.log(localStorage.getItem('items'));
    var x = localStorage.getItem('items');
    $('#submit-order').val(x);
  })


  // Clears cart
  $('.clearcart').on('click', function() {
    localStorage.clear();
    $('#order-items').empty();
    $orderTotal = 0;
    // renderAllCart();
  })

})
