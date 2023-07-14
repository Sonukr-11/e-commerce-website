const searchInput = document.getElementById('searchInput');

// Capture user input when they press Enter
searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const query = searchInput.value;
    performSearch(query);
  }
});

function performSearch(query) {
  // Perform search logic based on the query
  // You can search through an array, filter data, or make an API request

  // Example: Search through an array of objects
  const results = products.filter((item) => {
    const lowercaseQuery = query.toLowerCase();
    return item.keywords.some((keyword) => keyword.toLowerCase().includes(lowercaseQuery)) 
    ||  item.name.toLowerCase().includes(lowercaseQuery)  ;
  });

  // Display the search results
  displayResults(results);
}



function displayResults( filteredProducts )
{
  let productshtml = '';

// generate html 

filteredProducts.forEach((product) => {
    productshtml+= `<div class="product-container">
     <div class="product-image-container">
       <img class="product-image"
         src="${product.image}">
     </div>

     <div class="product-name limit-text-to-2-lines">
     ${product.name} 
     </div>

     <div class="product-rating-container">
       <img class="product-rating-stars"
         src="images/ratings/rating-${product.rating.stars*10}.png">
       <div class="product-rating-count link-primary">
       ${product.rating.count}
       </div>
     </div>

     <div class="product-price">
     $${(product.pricecents/100).toFixed(2)}
     </div>

     <div class="product-quantity-container">
       <select>
         <option selected value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option>
         <option value="7">7</option>
         <option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option>
       </select>
     </div>

     <div class="product-spacer"></div>

     <div class="added-to-cart">
       <img src="images/icons/checkmark.png">
       Added
     </div>

     <button class="add-to-cart-button button-primary  js-add-to-cart"
     data-product-id="${product.id}">
       Add to Cart
     </button>
   </div>
     `;
});

// console.log(productshtml);

// take this html & put it on to the page by using dom 
document.querySelector('.js-products-grid').innerHTML = productshtml ;


document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click' , () =>{
        const productId = button.dataset.productId;

        let matchingItem = "";

        cart.forEach((item) =>{
            if (productId === item.productId)
            {
                matchingItem = item ;
            }
        });

        if (matchingItem)
        {
            matchingItem.quantity++ ;
        }
        else{
            cart.push({
                productId: productId ,
                quantity : 1 
            });
        }

        let cartquantity = 0 ;
       cart.forEach((item) =>{
        cartquantity+= item.quantity ;
       });
 
       document.querySelector('.js-cart-quantity').innerHTML = cartquantity;
    });
});
}

displayResults(products);