function ProductService() {
  this.productListArray = [];
  this.getProductList = function () {
      return axios({
      method: "get",
      url: "https://64709e373de51400f724a075.mockapi.io/PHONE",
      });
  };

  this.addProduct = function (product) {
      return axios({
      method: "post",
      url: "https://64709e373de51400f724a075.mockapi.io/PHONE",
      data: product,
      });
  };

  this.updateProduct = function (product, id) {
      return axios({
      method: "put",
      url: `https://64709e373de51400f724a075.mockapi.io/PHONE/${id}`,
      data: product,
      });
  };

  this.deleteProduct = function (id) {
      return axios({
          method: "delete",
          url: `https://64709e373de51400f724a075.mockapi.io/PHONE/${id}`,
      });
  };

  this.getProductDetail = function (id) {
      return axios({
      method: "get",
      url: `https://64709e373de51400f724a075.mockapi.io/PHONE/${id}`,
      });
  };
}


