function Api() {
  this.callApi = function (uri, method, data) {
    var url = "https://64709e373de51400f724a075.mockapi.io";
    return axios({
      url: `${url}/${uri}`,
      method: method,
      data: data,
    });
  };
}
