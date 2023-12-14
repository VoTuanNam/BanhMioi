function kiemTraEmail(value, idTB) {
  var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (email.test(value)) {
    document.getElementById(idTB).innerHTML = "";
    return true;
  } else {
    document.getElementById(idTB).style.display = "block";
    document.getElementById(idTB).innerHTML = "Email không hợp lệ";
    return false;
  }
}

function kiemTraPhone(value, idTB) {
  var so = /^[0-9]+$/;
  if (so.test(value) && (value.length == 10 || value.length == 11)) {
    document.getElementById(idTB).innerHTML = "";
    return true;
  } else {
    document.getElementById(idTB).style.display = "block";
    document.getElementById(idTB).innerHTML = "Số điện thoại không hợp lệ";
    return false;
  }
}

function kiemTraDOB(value, idTB) {
  var dob = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (dob.test(value)) {
    document.getElementById(idTB).innerHTML = "";
    return true;
  } else {
    document.getElementById(idTB).style.display = "block";
    document.getElementById(idTB).innerHTML = "Ngày sinh không hợp lệ";
    return false;
  }
}

function kiemTraAcc(value, idTB) {
  var kyTu = /^[a-zA-Z]+$/;
  if (kyTu.test(value)) {
    document.getElementById(idTB).innerHTML = "";
    return true;
  } else {
    document.getElementById(idTB).style.display = "block";
    document.getElementById(idTB).innerHTML = "Tài khoản không hợp lệ";
    return false;
  }
}

function kiemTraPassword(value, idTB) {
  var password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/;
  if (password.test(value)) {
    document.getElementById(idTB).innerHTML = "";
    return true;
  } else {
    document.getElementById(idTB).style.display = "block";
    document.getElementById(idTB).innerHTML =
      "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số";
    return false;
  }
}

function kiemTraName(value, idTB) {
  let name = /^[^\d]+$/;
  if (name.test(value)) {
    document.getElementById(idTB).innerHTML = "";
    return true;
  } else {
    document.getElementById(idTB).style.display = "block";
    document.getElementById(idTB).innerHTML = "Tên không được có số";
    return false;
  }
}
