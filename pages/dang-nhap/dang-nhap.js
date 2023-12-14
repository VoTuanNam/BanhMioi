var frm = $("#dang-nhap");

frm.submit(function (e) {
  e.preventDefault();
  console.log(frm.serialize());

  let user1 = document.getElementById("userName1").value;
  console.log(user1);

  var body = {};
  var dataArray = frm.serializeArray();
  for (var i = 0; i < dataArray.length; i++) {
    body[dataArray[i].name] = dataArray[i].value;
  }

  $.ajax({
    type: "POST",
    url: "https://banhmioi-nvpaf9d6.b4a.run/login",
    data: JSON.stringify(body),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      console.log(data);
      console.log("Submission was successful.");
      sessionStorage.setItem("token", data.jwt);
      sessionStorage.setItem("username", JSON.stringify(user1));
      console.log(sessionStorage.token);
      window.location.href = "../san-pham/san-pham.html";
      alert("Đăng nhập thành công!");
    },
    error: function (data) {
      console.log("Tên hoặc mật khẩu không chính xác");
      console.log(data);
      alert("Tên hoặc mật khẩu không chính xác");
    },
  });
});
