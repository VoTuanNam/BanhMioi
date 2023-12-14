function handleClick() {
  if (sessionStorage.getItem("token")) {
    window.location.href = "pages/cart/cart.html";
  } else {
    alert("Vui lòng đăng nhập");
    window.location.href = "pages/dang-nhap/dang-nhap.html";
  }
}
let user = JSON.parse(sessionStorage.getItem("username"));
console.log(user);
let header = `
    <div class="header_content">
        <nav>
        <ul class="nav_logo">
        <a href="/">
            <img
            src="//theme.hstatic.net/200000392523/1000896443/14/logo.png?v=104"
            alt="Big Belly"
            />
        </a>
        </ul>
        <ul class="nav_content">
        <li><a href="#">Trang chủ</a></li>
        <li><a href="pages/san-pham/san-pham.html">Sản phẩm</a></li>
        <li><a href="pages/uu-dai/uu-dai.html">Thông tin ưu đãi</a></li>
        <li><a href="pages/tin-tuc/tin-tuc.html">Tin tức</a></li>
        <!-- <li><a href="">Thông tin cửa hàng</a></li>  -->
        <li>
            <a href="pages/ve-chung-toi/ve-chung-toi.html">Về chúng tôi</a>
        </li>
        <li>
            <a href="pages/lien-he/lien-he.html">Thông tin liên hệ</a>
        </li>
        </ul>
        <ul class="nav_login" id="nav_login"></ul>
        </nav>
    </div>
`;
let footer = `
<div class="footer_item">
    <ul>
        <h1>Thông tin</h1>
        <p>
            CÔNG TY TNHH BIG BELLY Số 20-20B Trần Cao Vân, phường Đa Kao, quận
            1, TP. HCM Giấy chứng nhận đăng ký kinh doanh số 0316814767 do Sở Kế
            hoạch và Đầu tư Thành phố Hồ Chí Minh cấp lần đầu vào ngày 19 tháng
            04 năm 2021 ĐT: 0903 793 625 Email: support@bigbelly.vn
        </p>
    </ul>
</div>
<div class="footer_item">
    <ul>
        <h1>Hỗ trợ</h1>
        <li>Đặt hàng ngay</li>
        <li>Thông tin giao hàng</li>
    </ul>
</div>
<div class="footer_item">
    <ul>
        <h1>Hướng dẫn</h1>
        <li>Chính sách đổi trả</li>
        <li>Chính sách bảo mật</li>
        <li>Điểu khoản dịch vụ</li>
        <li>Tìm kiếm</li>
    </ul>
</div>
`;
let content = `
    <li><a href="pages/dang-nhap/dang-nhap.html">Đăng nhập</a></li>
    <li><a href="pages/dang-ky/dang-ky.html">Đăng ký</a></li>
    <li>
        <a href="./pages/cart/cart.html" class="fa fa-cart-shopping" onClick="handleClick()"></a>
    </li>
`;
let content1 = `
    <li ><a style="cursor: pointer">${user}</a></li>
    <li><a style="cursor: pointer" onclick=handleOut()>Đăng xuất</a></li>
    <li>
        <a href="./pages/cart/cart.html" class="fa fa-cart-shopping" onClick="handleClick()"></a>
    </li>
`;

document.getElementById("header").innerHTML = header;
document.getElementById("footer").innerHTML = footer;
user !== null
  ? (document.getElementById("nav_login").innerHTML = content1)
  : (document.getElementById("nav_login").innerHTML = content);

function handleOut() {
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("token");
  window.location.reload();
}
