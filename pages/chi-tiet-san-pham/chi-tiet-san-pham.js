let items = [];
let product_price = 0;
let formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("productid");
  let product_id = Number(urlParams.get("productid"));
  console.log(myParam);
  function getAllProd() {
    let promise = axios({
      url: `https://banhmioi-nvpaf9d6.b4a.run/products`,
      method: "GET",
    });
    promise.then(function (res) {
      items = res.data.data.map((item) => {
        return {
          name: item.name,
          price: item.price,
          id: item.id,
          product_url: item.product_url,
        };
      });
      let product = res.data.data[myParam];
      product_price = Number(product.list_price);
      renderProd(product);
    });
    promise.catch(function (err) {
      console.log(err);
    });
  }

  getAllProd();
  let count = 1;
  function renderProd(product) {
    handleTang = () => {
      if (count < product.stock_qty) {
        count += 1;
        price = count * pd_price;
        console.log("tang");
        document.getElementById("quantity").innerHTML = `${count}`;
        document.getElementById(
          "price"
        ).innerHTML = `${price.toLocaleString()}`;
      }
      if (count > 0) {
        document.getElementById("my-button").disabled = false;
      }
    };
    handleGiam = () => {
      if (count > 0) {
        count--;
        price = count * pd_price;
        console.log("giam");
        document.getElementById("quantity").innerHTML = `${count}`;
        document.getElementById(
          "price"
        ).innerHTML = `${price.toLocaleString()}`;
      }
      if (count == 0) {
        document.getElementById("my-button").disabled = true;
      }
    };
    var pd_price = Number(product.list_price);
    var price = count * pd_price;
    var content = "";
    content += `<img src="${product.product_url}" alt=""/>`;
    var content1 = "";
    content1 += `
        <h1 id="prod_name">${product.name}</h1>
        <div class="price"><span id="price">${price.toLocaleString()}</span></div>
        <div class="purchase">
        <input type="button" value="-" class="qty-btn" onclick=handleGiam() />
        <span id="quantity">${count}</span>
        <input type="button" value="+" class="qty-btn" onclick=handleTang() />
      </div>
    `;
    var content2 = "";
    content2 += `
    <p>
    ${product.description}
  </p>
  `;
    document.getElementById("dtLeft").innerHTML = content;
    document.getElementById("dtR1").innerHTML = content1;
    document.getElementById("dtR2").innerHTML = content2;

    let prod_name = document
      .getElementById("prod_name")
      .innerText.substring(0, 9)
      .toLowerCase();
    console.log(prod_name);
    const fitem = items.filter((item) => {
      if (
        item.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(prod_name) ||
        item.name.toLowerCase().includes(prod_name)
      ) {
        return item;
      }
    });
    console.log(fitem);

    const content3 = fitem
      .map((product, index) => {
        if (index < 3) {
          return ` 
  <div>
  <a href="./chi-tiet-san-pham.html?productid=${product.id - 1}"
    ><img src="${product.product_url}" alt=""
  /></a>
  <a href="./chi-tiet-san-pham.html?productid=${product.id - 1}">${
            product.name
          }</a></div>
`;
        }
      })
      .join("");

    document.getElementById("sp_container").innerHTML = content3;
  }
  var frm = $("#add-cart");

  frm.submit(function (e) {
    if (!sessionStorage.getItem("token")) {
      alert("Vui lòng đăng nhập");
      window.location.href = "../dang-nhap/dang-nhap.html";
    }
    e.preventDefault();
    var body = {};
    var dataArray = frm.serializeArray();
    for (var i = 0; i < dataArray.length; i++) {
      body[dataArray[i].name] = dataArray[i].value;
    }
    fetch("https://banhmioi-nvpaf9d6.b4a.run/carts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product_id + 1,
        variation: {},
        note: body.note,
        qty: Number(document.getElementById("quantity").innerHTML),
        price:
          Number(document.getElementById("quantity").innerHTML) * product_price,
      }),
    }).then((res) =>
      res.json().then((data) => {
        alert("Đã thêm vào giỏ hàng");
        // window.location.href = "../cart/cart.html";
      })
    );
  });
};
