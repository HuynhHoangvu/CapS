// đồng bộ ~ bất đồng bộ

setTimeout(function () {
  console.log(5);
}, 0);

console.log(1);
console.log(3);

// event loop

// call api

// promise : pending, resolve ( success ), reject ( error )

let promise = axios();
console.log(" promise", promise);

let productArr = [];
axios({
  url: "https://633ec05b0dbc3309f3bc5455.mockapi.io/product",
  method: "GET",
})
  .then(function (res) {
    console.log(" res", res.data);
    productArr = res.data;
    console.log(productArr);
  })
  .catch(function (err) {
    console.log(" err", err);
  });
