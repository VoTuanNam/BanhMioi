window.onload = function () {
  const a = new URLSearchParams(window.location.search);
  const uuDaiID = a.get("uudaiID");

  function getAllProd() {
    var promise = axios({
      url: `https://banhmioi-nvpaf9d6.b4a.run/news/${uuDaiID}`,
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
      "uudai_header"
    ).innerHTML = `<strong>${news.title}</strong>`;
    document.getElementById(
      "uudai_author"
    ).innerHTML = `Người viết: ${news.author} lúc ${news.created_at}`;
    document.getElementById("uudai_subtitle").innerHTML = news.subtitle;
    document.getElementById("uudai_ht").innerHTML = news.content;
  }
};
