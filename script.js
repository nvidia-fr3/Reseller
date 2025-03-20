// Data Dummy Akun untuk Validasi
const dummyAccounts = [
  { email: "fr3@my.id", password: "adm" },
  { email: "toya@fr3.com", password: "1" } //bebas ganti bre
];

// Pilih elemen-elemen penting
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const switchElements = document.querySelectorAll(".switch");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginLoading = document.getElementById("loginLoading");
const loginErrorMessage = document.getElementById("loginErrorMessage");

// Fungsi untuk mengganti form (Login <-> Register)
switchElements.forEach((switchElement) => {
  switchElement.addEventListener("click", () => {
    const targetForm = switchElement.getAttribute("data-form");

    if (targetForm === "login") {
      registerForm.classList.remove("active");
      loginForm.classList.add("active");
    } else if (targetForm === "register") {
      loginForm.classList.remove("active");
      registerForm.classList.add("active");
    }
  });
});

// Fungsi Validasi Real-Time
function validateInput(input, regex, errorMessage) {
  input.addEventListener("input", () => {
    if (!regex.test(input.value)) {
      input.setCustomValidity(errorMessage);
      input.reportValidity();
    } else {
      input.setCustomValidity("");
    }
  });
}

// Validasi Email dan Password pada Register
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
validateInput(registerEmail, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Masukkan email yang valid.");
validateInput(
  registerPassword,
  /^.{6,}$/,
  "Kata sandi harus memiliki minimal 6 karakter."
);

// Simulasi Proses Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Ambil input user
  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  // Tampilkan Loading
  loginLoading.style.display = "block";
  loginErrorMessage.style.display = "none"; // Sembunyikan pesan error sebelumnya

  // Simulasi proses login dengan delay
  setTimeout(() => {
    loginLoading.style.display = "none";

    // Cek apakah email dan password cocok dengan data dummy
    const account = dummyAccounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (account) {
      // Tampilkan notifikasi sukses
      showToast("Login berhasil! Anda akan diarahkan ke halaman utama.", "success");
      setTimeout(() => {
        window.location.href = "dashboard.html"; // Ganti dengan File Anda
      }, 2000);
    } else {
      // Tampilkan pesan error jika login gagal
      showToast("Yahaha Email atau kata sandi salah. Silakan coba lagi.", "error");
      loginErrorMessage.textContent = "Email atau kata sandi salah!";
      loginErrorMessage.style.display = "block";
    }
  }, 1500);
});

// Simulasi Proses Register
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Ambil input user
  const email = registerEmail.value.trim();
  const password = registerPassword.value;

  // Tampilkan Loading
  const registerButton = registerForm.querySelector("button");
  registerButton.innerHTML = "Mendaftarkan...";
  registerButton.disabled = true;

  // Simulasi proses register dengan delay
  setTimeout(() => {
    dummyAccounts.push({ email, password });
    showToast("Pendaftaran berhasil! Silakan login dengan akun Anda.", "success");

    registerForm.reset();
    registerButton.innerHTML = "Daftar";
    registerButton.disabled = false;

    // Pindah ke form login
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
  }, 2000);
});

// Fungsi untuk Menampilkan Toast (Pesan Sukses/Eror)
function showToast(message, type) {
  const toast = document.createElement("div");
  toast.classList.add("toast", type);
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}