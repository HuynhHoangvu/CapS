var renderProductList = function(arr){
    var contentHTML = "";
    for(var i = 0; i < arr.length;i++){
        var product = arr[i];
        var  content = `
        <div class="product-box">
            <img src="https://cdn.tgdd.vn/Products/Images/42/114115/iphone-x-64gb-hh-600x600.jpg" alt="" class="product-img">
            <h2 class="product-title">${product.name}</h2>
            <span class="price">$${product.price}</span>
            <i class='bx bx-shopping-bag add-cart' ></i>
        </div>
        `
        contentHTML = content
    }
    //dom toi tbody
    document.getElementById('t-body').innerHTML= contentHTML;
;}