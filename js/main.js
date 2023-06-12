//Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
getLocalStorage();
//Open Cart
cartIcon.onclick = () =>cart.classList.add("active");

//Close Cart
closeCart.onclick= () =>cart.classList.remove("active");

//Cart Working JS
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

// Making Function
function ready(){
    // Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for(var i = 0;i < removeCartButtons.length;i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
   
    }
    //Quantity Change
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0;i < quantityInputs.length;i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Add To Cart
    var addCart = document.getElementsByClassName('add-cart');
    for(var i = 0;i < addCart.length;i++){
        var button = addCart[i];
        button.addEventListener('click',addCartClicker);
       
    }
//Buy Button Work
document.getElementsByClassName("btn-buy")[0].addEventListener('click', buyButtonClicked);
}

//Buy Butoon
function buyButtonClicked(){
    alert('Your Order is placed')
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
    setLocalStorage();
    updateCartIcon();
}
// remove Item From Cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    setLocalStorage();
    updateCartIcon();
}
//Quantity Change
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value)||input.value <=0){
        input.value = 1
    }
    updatetotal();
    setLocalStorage();
    updateCartIcon();
}
//Add to Cart
function addCartClicker(event){
    var button = event.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName('product-title')[0].innerText;
    var price = shopProduct.getElementsByClassName("price")[0].innerText;
    var productImg = shopProduct.getElementsByClassName("product-img")[0].src;
    addProductToCart(title,price,productImg);
    updatetotal();
    setLocalStorage();
    updateCartIcon();
}
function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add("cart-box")
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(var i = 0;i < cartItemsNames.length;i++){
        if(cartItemsNames[i].innerText==title){alert("You have already add this item to cart");
        return;
    }
}

var cartBoxContent = `
                    <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove Cart -->
                        <i class='bx bxs-trash cart-remove' ></i>
`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener('click',removeCartItem)
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener('change',quantityChanged)
setLocalStorage();
updateCartIcon()
}
//Update Total
function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i = 0;i < cartBoxes.length;i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        //If price Contain some Cents Value
        total = Math.round(total *100) /100;
        document.getElementsByClassName('total-price')[0].innerText = "$" + total;

}
function setLocalStorage(){
    var cartContent= document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box'); 
    var cartItems = [];
    for(var i = 0;i < cartBoxes.length;i++){
        var cartBox = cartBoxes[i];
        var title = cartBox.getElementsByClassName('cart-product-title')[0].innerText;
        var price = cartBox.getElementsByClassName('cart-price')[0].innerText;
        var quantity = cartBox.getElementsByClassName('cart-quantity')[0].value;
        var productImg = cartBox.getElementsByClassName('cart-img')[0].src;
    var cartItem = {
        title:title,price:price,quantity:quantity,productImg:productImg
    };
    cartItems.push(cartItem);
    }
    var jsonString = JSON.stringify(cartItems);
    localStorage.setItem("Items",jsonString);
}
function getLocalStorage(){
    var jsonString = localStorage.getItem("Items");
    if(jsonString){
        var cartItems = JSON.parse(jsonString);
        for(var i = 0;i < cartItems.length;i++){
            var cartItem = cartItems[i];
            var title = cartItem.title;
            var price = cartItem.price;
            var productImg = cartItem.productImg;
        addProductToCart(title,price,productImg);
        }
        updatetotal();
        updateCartIcon()
    }
}
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}
else{
    ready();
}
//Quantity In Cart Icon
function updateCartIcon(){
    var cartBoxes= document.getElementsByClassName('cart-box');
    var quantity = 0;
    for(var i = 0;i < cartBoxes.length;i++){
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        quantity += parseInt(quantityElement.value);
    }
    var cartIcon = document.querySelector('#cart-icon')
    cartIcon.setAttribute('data-quantity',quantity);
}