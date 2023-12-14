function getAllProd() {
  var promise = axios({
    url: `https://banhmioi-nvpaf9d6.b4a.run/news?category=promotion`,
    method: "GET",
  });

  promise.then(function (res) {
    console.log(res);
    renderProd(res.data.data);
  });

  promise.catch(function (err) {
    console.log(err);
  });
}

getAllProd();
function renderProd(arr) {
  let content = "";
  for (let i = 0; i < arr.length; i++) {
    let product = arr[i];
    content += ` 
      <div>
      <h2>
        <a href="../../pages/chi-tiet-uu-dai/chi-tiet-uu-dai.html?uudaiID=${product.id}">
          <img src="${product.image_url}" alt="" />
          ${product.title}
        </a>
      </h2>
      <p>
      </p>
    </div>`;
  }
  document.getElementById("uudai1").innerHTML = content;
}
