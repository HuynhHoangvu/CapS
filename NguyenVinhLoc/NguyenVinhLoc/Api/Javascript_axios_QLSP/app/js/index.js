var api = new Api();

// render danh sach sp tu server

function fetchProductList() {
    var promise = api.callApi("PHONE", "GET", null);
    promise
        .then(function(res) {
            renderProductList(res.data);
        })
        .catch(function(err) {
            console.log(err);
        });
}
fetchProductList();

//   xoa sp tren server
function xoaSP(id) {
    // forEach map reduce findIndex
    api
        .callApi(`PHONE/${id}`, "DELETE", null)
        .then(function(res) {
            // goi lai api lay danh sach sp moi nhat tu sever
            fetchProductList();
        })
        .catch(function(err) {
            console.log(err);
        });
}

/**
 * Add Product
 */
function themSP() {
    var product = layThongTinNguoiDung("");

    api
        .callApi("PHONE", "POST", product)
        .then(function() {
            //fetch list data
            fetchProductList();
            //close modal
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function(err) {
            console.log(err);
        });
}

getEle("btnThemSP").addEventListener("click", function() {
    var btnAddProduct = "<button class='btn btn-success' onclick='themSP()'>Add</button>";
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnAddProduct;
});

/**
 * Sua SP
 */
function suaSP(id) {
    var btnUpdateProduct = `<button class='btn btn-success' onclick='updateProduct(${id})'>Update</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML =
        btnUpdateProduct;

    axios({
            url: `https://64709e373de51400f724a075.mockapi.io/PHONE/${id}`,
            method: "GET",
        })
        .then(function(result) {
            //show product ra các thẻ input
            getEle("TenSP").value = result.data.name;
            getEle("GiaSP").value = result.data.price;
            getEle("HinhSP").value = result.data.img;
            getEle("MoTa").value = result.data.desc;
        })
        .catch(function(err) {
            console.log(err);
        });
}

/**
 * Cap nhat SP
 */
function updateProduct(id) {
    var product = layThongTinNguoiDung(id);

    axios({
            url: `https://64709e373de51400f724a075.mockapi.io/PHONE/${product.id}`,
            method: "PUT",
            data:product,
        })
        .then(function() {
            //fetch data
            fetchProductList();
            //close modal
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function(err) {
            console.log(err);
        });
}

// tim san pham 
function timKiemSP() {
    var findProductID = document.getElementById("basic-addon2").value;
    axios({
            url: `https://64709e373de51400f724a075.mockapi.io/PHONE?name=${findProductID}`,
            method: "GET",
        })
        .then(function(result) {
            var foundProductID = result.data;
            // console.log(foundProductID);
            renderProductList(foundProductID);
        })
        .catch(function(error) {
            console.log(error);
        });

}

function sortPriceIncrease() {
    axios({
            url: `https://64709e373de51400f724a075.mockapi.io/PHONE`,
            method: "GET",
        })
        .then(function(result) {
            var productSort = result.data;
            productSort.sort((a, b) => a.price - b.price)
            renderProductList(productSort);
        })
        .catch(function(error) {
            console.log(error);
        });

}

function sortPriceDecrease() {
    axios({
            url: `https://64709e373de51400f724a075.mockapi.io/PHONE`,
            method: "GET",
        })
        .then(function(result) {
            var productSort = result.data;
            productSort.sort((a, b) => b.price - a.price)
            renderProductList(productSort);
        })
        .catch(function(error) {
            console.log(error);
        });

}


// validation Price
function validatePrice() {
    var price = document.getElementById("GiaSP").value;
    if (isNaN(price) || price < 0) {
        console.log("Giá sản phẩm không hợp lệ");
    }
    var priceRegex = /^\d$/;
    if (!priceRegex.test(price)) {
        $("#GiaSP").css("border", "1px solid red");
    } else {
        $("#GiaSP").css("border", "1px solid green");
    }
}


// validation Name
function validateName() {
    var name = document.getElementById("TenSP").value; // get value
    var specialCharacters = /^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/; // special characters 
    var numbers = /^\d$/; // check number

    if (name.trim() === "") {
        $("#TenSP").css("border", "1px solid red");
    } else if (specialCharacters.test(name)) {
        $("#TenSP").css("border", "1px solid red");
    } else if (numbers.test(name)) {
        $("#TenSP").css("border", "1px solid red");
    } else {
        $("#TenSP").css("border", "1px solid green");
    }
}

// validation IMG
function validateImg() {
    var imgFile = document.getElementById("HinhSP").value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.test(imgFile)) {
        $("#HinhSP").css("border", "1px solid red");
    } else {
        $("#HinhSP").css("border", "1px solid green");
    }
}



$(document).ready(function() {
    $("#GiaSP").blur(function(e) {
        validatePrice();
    });
    $("#HinhSP").blur(function(e) {
        validateImg();
    });
    $("#TenSP").blur(function(e) {
        validateName();
    });
    $("#btnDK").click(function(e) {

        if (validatePrice() && validateImg() && validateName()) {
            let name = $("#TenSP").val();
            let img = $("#HinhSP").val();
            let price = $("#GiaSP").val();
            let decribe = $("#MoTa").val();
            let obj = { name, img, price, decribe };
            api
                .callApi("PHONE", "POST", obj)
                .then(function() {
                    //fetch list data
                    fetchProductList();
                    //close modal
                    document.getElementsByClassName("close")[0].click();
                })
                .catch(function(err) {
                    console.log(err);
                });
        }

    });
});