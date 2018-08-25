// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });
$(document).ready(function() {

  // Appends menu item to container based on what category it belongs to
  function renderMenuItems(item, category) {
    item.forEach(function(input) {
      let $menuItem = createMenuItems(input);
      $(`.${category}`).append($menuItem);
    });
  }

  // Loads all menu items in database, called once on page load
  function loadAllMenuItems() {
    $.getJSON('/menu', function(data) {
      renderMenuItems(data);
    });
  }

  // Makes html article from data input properties
  function createMenuItems(data) {

    let $text = $("<article>").addClass("menu-item");

    // Item properties
    let name = data.name;
    let price = data.price
    let photo = data.picture_url;
    let description = data.description;
    let category = data.category;
    let inventory = data.inventory;
    let id = data.id;

    // HTML to append
    let insert =
    `
      <article class=${category} id=${id}>
      <header>
        <img class="item-photo" src="${photo}"></img>
        <h3 class="item-name">${name}</h3>
        <p class="item-price">${price}</p>
      </header>
        <p class="item-text">${description}</p>
      <footer>
        <button type="button" class="btn btn-info">Add to Cart</button>
      </footer>
      </article>
    `
      $text.html(insert);
      return $text;
  }

  // Code for creating the Compose button and revealing the new tweet box
  // $("#new_item_header").click(function() {
  //   console.log("clicked header!");
  //     $( "#new_item").slideToggle( "400", function() {
  //       $( "#name").focus();
  //     });
  // });
})
