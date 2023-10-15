// ========== Open Cart Container Function
const cartContainer = document.querySelector(".cart-container"),
openCart = document.querySelector("#open-cart"),
closeCart = document.querySelector("#close-cart");
openCart.onclick = () => {
    cartContainer.classList.add("active");
}
closeCart.onclick = () => {
    cartContainer.classList.remove("active");
}

// ========== Merchandise
// Data List
let merchandiseList = [
    {
        id: 1,
        product_image: 'image-1.jpg',
        product_category: 'cosmetic',
        product_name: 'white cream',
        product_price: 200
    },
    {
        id: 2,
        product_image: 'image-2.jpg',
        product_category: 'cosmetic',
        product_name: 'toners',
        product_price: 56
    },
    {
        id: 3,
        product_image: 'image-3.jpg',
        product_category: 'cosmetic',
        product_name: 'radiance booster',
        product_price: 82
    },
    {
        id: 4,
        product_image: 'image-4.jpg',
        product_category: 'cosmetic',
        product_name: 'foundation',
        product_price: 49.45
    },
    {
        id: 5,
        product_image: 'image-5.jpg',
        product_category: 'cosmetic',
        product_name: 'serum',
        product_price: 63.13
    },
    {
        id: 6,
        product_image: 'image-6.jpg',
        product_category: 'cosmetic',
        product_name: 'body scrub',
        product_price: 94
    }
]
// Load Data List to Display
const merchandiseContainer = document.querySelector('.merchandise-container');
function pushProductList(){
    merchandiseList.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('product-box');
        newDiv.innerHTML = `
        <div class="product-image">
            <img src="./merchandise_img/${value.product_image}" alt="" class="product-img">
        </div>
        <div class="product-desc">
            <span class="product-category">${value.product_category}</span>
            <span class="product-title">${value.product_name}</span>
            <span class="price">$${value.product_price}</span>
        </div>
        <button class="add-cart" onclick="addToCart(${key})">
            add to cart
        </button>`;
        merchandiseContainer.appendChild(newDiv);
    })
}
pushProductList();

// ========== Cart
// Data List
let cartList = []

// Add items to cart list
function addToCart(key){
    if(cartList[key] == null){
        
        cartList[key] = JSON.parse(JSON.stringify(merchandiseList[key]));
        cartList[key].quantity = 1;
    }
    reloadCart();
}

// Reload cart condition
function reloadCart(){
    const cartContent = document.querySelector(".cart-content")
    cartContent.innerHTML = '';
    let totalPrice = 0;
    cartList.forEach((value, key)=>{
        totalPrice = totalPrice + value.product_price;
        if(value != null){
            var cartShopBox = document.createElement("div");
            cartShopBox.classList.add("cart-box");
            // Build HTML Structure to display item
            cartShopBox.innerHTML = `
                <img class="cart-img" src="./merchandise_img/${value.product_image}" alt="">
                <div class="detail-box">
                    <div class="cart-product-title">${value.product_name}</div>
                    <div class="cart-price">$${value.product_price.toLocaleString()}</div>
                    <div class="product-quantity">
                        <button onclick="changeQuantity(${key}, ${value.quantity - 1})"><i class="fa-solid fa-minus"></i></button>
                        <div class="count-quantity">${value.quantity}</div>
                        <button onclick="changeQuantity(${key}, ${value.quantity + 1})"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <i class="fa-regular fa-trash-can cart-remove" onclick="removeCartItem(event, ${key})"></i>`;
            // Add the item data to cart list and show it
            cartContent.appendChild(cartShopBox);
        }
    })
    // Change the total price of all items in the cart
    document.getElementsByClassName("total-price")[0].innerText = "$" + totalPrice.toLocaleString();
}

// Remove items from cart list
function removeCartItem(event, key) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove()
    buttonClicked.parentElement.getElementsByClassName("count-quantity")[0].innerHTML = delete cartList[key];
    reloadCart();
} 

// Change quantity and price of each items
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete cartList[key];
    }else{
        cartList[key].quantity = quantity;
        cartList[key].product_price = quantity * merchandiseList[key].product_price;
    }
    reloadCart();
}

// Buy Button Function
document.getElementsByClassName("btn-buy")[0].addEventListener("click", () => {
    alert("buy successfully")
    // Delete the item display in the cart
    var cartContent = document.getElementsByClassName("cart-content")[0]
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    // Set cart list to empty
    cartList = []
    // Set total price to default
    document.getElementsByClassName("total-price")[0].innerText = "$" + 0;
})