var frm = $("#dang-ky");

frm.submit(function (e) {
  e.preventDefault();
  console.log(frm.serialize());
  var body = {};
  var dataArray = frm.serializeArray();
  for (var i = 0; i < dataArray.length; i++) {
    body[dataArray[i].name] = dataArray[i].value;
  }
  var valid = true;
  console.log(valid);
  valid =
    kiemTraPassword(body["password"], "tbPass") &
    kiemTraEmail(body["email"], "tbEmail") &
    kiemTraPhone(body["phone"], "tbPhone") &
    kiemTraName(body["fullname"], "tbName") &
    kiemTraDOB(body["dob"], "tbDOB");

  console.log(valid);

  if (!valid) {
    return;
  }
  $.ajax({
    type: "POST",
    url: "https://banhmioi-nvpaf9d6.b4a.run/users",
    data: JSON.stringify(body),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      console.log(data);
      console.log("Submission was successful.");
      console.log(data);
      window.location.href = "../dang-nhap/dang-nhap.html";
      alert("Đăng ký thành công! Hãy đăng nhập để đặt hàng");
    },
    error: function (data) {
      console.log("An error occurred.");
      console.log(data);
      alert("Đăng ký thất bại");
    },
  });
});
