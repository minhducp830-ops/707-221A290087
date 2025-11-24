/* =========================================
   BÀI 1: DANH SÁCH SẢN PHẨM & TÌM KIẾM
   ========================================= */
const productListEl = document.getElementById("product-list");

if (productListEl) {
  // 1. Mảng dữ liệu mẫu (Mock Data)
  const products = [
    { id: 1, name: "iPhone 15 Pro Max", price: "30.000.000đ" },
    { id: 2, name: "Samsung Galaxy S24", price: "25.000.000đ" },
    { id: 3, name: "MacBook Air M2", price: "28.000.000đ" },
    { id: 4, name: "Sony WH-1000XM5", price: "8.000.000đ" },
    { id: 5, name: "iPad Gen 10", price: "10.000.000đ" },
  ];

  const errorMsg = document.getElementById("error-msg");
  const searchInput = document.getElementById("search-input");

  // Hàm render để tránh lặp code và bảo mật (chống Injection)
  function renderProducts(list) {
    productListEl.innerHTML = ""; // Xóa nội dung cũ

    if (list.length === 0) {
      errorMsg.classList.remove("hidden");
    } else {
      errorMsg.classList.add("hidden");
      list.forEach((p) => {
        // Tạo element thay vì dùng innerHTML nối chuỗi để an toàn hơn
        const card = document.createElement("div");
        card.classList.add("product-card");

        // Logic bảo mật: textContent ngăn chặn mã độc HTML/JS
        const title = document.createElement("h3");
        title.textContent = p.name;

        const price = document.createElement("div");
        price.classList.add("price");
        price.textContent = p.price;

        card.appendChild(title);
        card.appendChild(price);
        productListEl.appendChild(card);
      });
    }
  }

  // Render lần đầu
  renderProducts(products);

  // Xử lý tìm kiếm (Tối ưu: Convert toLowerCase)
  searchInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(keyword)
    );
    renderProducts(filtered);
  });
}

/* =========================================
   BÀI 2: FORM ĐĂNG KÝ & VALIDATION
   ========================================= */
const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn reload trang

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;

    // Regex Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Mật khẩu: Tối thiểu 8 ký tự, 1 thường, 1 hoa, 1 số
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ!");
      return;
    }

    if (!passRegex.test(password)) {
      alert("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, thường và số.");
      return;
    }

    // Logic lưu trữ LocalStorage
    const user = {
      name: name,
      email: email,
      // Giả lập mã hóa bằng Base64 (btoa) để không lưu password trần
      password: btoa(password),
    };

    try {
      localStorage.setItem("userData", JSON.stringify(user));
      alert("Đăng ký thành công! Dữ liệu đã lưu vào LocalStorage.");
      registerForm.reset();
    } catch (err) {
      alert("Lỗi khi lưu dữ liệu (Bộ nhớ đầy hoặc bị chặn).");
    }
  });
}

/* =========================================
   BÀI 3: ĐỒNG HỒ ĐẾM NGƯỢC (COUNTDOWN)
   ========================================= */
const timerDisplay = document.getElementById("timer-display");

if (timerDisplay) {
  let duration = 10 * 60; // 10 phút tính bằng giây

  // Logic: Khai báo biến interval để có thể clear sau này
  const timerInterval = setInterval(() => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    // Format số: Thêm số 0 đằng trước nếu nhỏ hơn 10 (Ví dụ: 09:05)
    const minString = minutes < 10 ? "0" + minutes : minutes;
    const secString = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.textContent = `${minString}:${secString}`;

    // Logic Animation: Thêm class khẩn cấp khi dưới 1 phút (60s)
    if (duration < 60) {
      timerDisplay.classList.add("urgent");
    }

    // Logic hết giờ & Memory Leak prevention
    if (duration <= 0) {
      clearInterval(timerInterval); // QUAN TRỌNG: Dừng interval để giải phóng bộ nhớ
      timerDisplay.textContent = "00:00";
      alert("Đã hết thời gian làm bài!");
    }

    duration--;
  }, 1000);
}
