let label = document.getElementById("label");
let productRows = document.getElementById("product-rows");
let basket = [];
let formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

document.addEventListener("DOMContentLoaded", (event) => {
  if (!sessionStorage.getItem("token")) {
    alert("Vui lòng đăng nhập");
    window.location.href = "../dang-nhap/dang-nhap.html";
  }
});

fetch("https://banhmioi-nvpaf9d6.b4a.run/carts", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${sessionStorage.token}`,
  },
}).then((res) =>
  res.json().then((data) => {
    basket = data.data || [];
    if (basket.length == 0) {
      document.getElementById("dat-hang-button").disabled = true;
    } else {
      document.getElementById("dat-hang-button").disabled = false;
    }
    generateCartItems();
    totalAmount();
    cart_ids();
  })
);

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (productRows.innerHTML = basket
      .map((x) => {
        let {
          id,
          edges: {
            product: { product_url: img },
          },
          edges: {
            product: { name },
          },
          edges: {
            product: { list_price: lprice },
          },
          price,
          qty: item,
        } = x;
        console.log("đây là price", price);
        return `
            <div class="product-row">
            <div class="item-info">
                <div class="item-img-container">
                    <img src="${img}" alt="img" class = "item-img">
                </div>
                <div class="item-name-item-price">
                    <p class = "item-name"><b>${name}</b></p>
                    <p class="item-price"><b>Giá: ${formatter.format(
                      lprice
                    )}</b></p>
										<p class="no-of-quantity" id = "${id}">SL: ${item}</p>
                </div>
            </div>
            <div class="item-price-sum">
                <h5><b>Tổng: ${formatter.format(price)}</b></h5>
            </div>
        </div>
            `;
      })
      .join(""));
  } else {
    productRows.innerHTML = `<h5 style="padding-left: 300px">Chưa có sản phẩm nào trong giỏ hàng!</h5>`;
    label.innerHTML = ``;
  }
};

var frm = $("#mua-hang");
frm.submit(function (e) {
  e.preventDefault();
  var body = {};
  var dataArray = frm.serializeArray();
  for (var i = 0; i < dataArray.length; i++) {
    body[dataArray[i].name] = dataArray[i].value;
  }
  fetch("https://banhmioi-nvpaf9d6.b4a.run/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: body.phone,
      address: body.address,
      note: "",
      total: totalAmount(),
      discount: 0,
      cart_ids: cart_ids(),
    }),
  }).then((res) =>
    res.json().then((data) => {
      basket = [];

      generateCartItems();

      window.location.href = "../dat-hang/dat-hang.html";
    })
  );
});

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        return x.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = ` <div class="total">
        <h2>Tổng tiền:</h2>
        <span class="total-price">${formatter.format(amount)}</span>
    </div>
    </div>`;
    return amount;
  } else return 0;
};

let cart_ids = () => {
  if (basket.length !== 0) {
    let ids = basket.map((x) => x.id);
    console.log(ids);
    return basket.map((x) => x.id);
  } else return [];
};
