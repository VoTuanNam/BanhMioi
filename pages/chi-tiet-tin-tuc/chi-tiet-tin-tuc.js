window.onload = function () {
  const a = new URLSearchParams(window.location.search);
  const tintucID = a.get("tintucID");

  function getAllProd() {
    var promise = axios({
      url: `https://banhmioi-nvpaf9d6.b4a.run/news/${tintucID}`,
      method: "GET",
    });

    promise.then(function (res) {
      console.log(res.data);
      renderProd(res.data);
    });

    promise.catch(function (err) {
      console.log(err);
    });
  }
  getAllProd();
  function renderProd(news) {
    let content = "";
    document.getElementById(
      "tintuc_header"
    ).innerHTML = `<strong>${news.title}</strong>`;
    document.getElementById(
      "tintuc_author"
    ).innerHTML = `Người viết: ${news.author} lúc ${news.created_at}`;
    document.getElementById("tintuc_ht").innerHTML = news.content;
  }
};
