var renderProductList = function (productArr) {
  console.log("productArr", productArr);
  var contentHTML = "";
  for (var i = 0; i < productArr.length; i++) {
    var product = productArr[i];
    var contentTr = `
    <tr>
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td><img width='100px' src='${product.img}'></td>
    <td>${product.desc}</td>
    <td>
    <button 
    onclick="xoaSP(${product.id})"
    class="btn btn-danger">Xoa</button>
    <button class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick="suaSP(${product.id})">Sua</button>
    </td>
    </tr>`;
    contentHTML += contentTr;
  }
  //   dom toi tbody
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
  //   forEach map w3/ mdn
};

var getEle = function (id) {
  return document.getElementById(id);
};

var layThongTinNguoiDung = function (id) {
  var tenSP = getEle("TenSP").value;
  var gia = getEle("GiaSP").value;
  var hinh = getEle("HinhSP").value;
  var moTa = getEle("MoTa").value;

  //tao doi tuong product tu Product
  var product = new Product(id, tenSP, gia, hinh, moTa);

  return product;
};
