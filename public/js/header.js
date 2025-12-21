const menu = document.getElementById("mobileMenu");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const loginBtn = Array.from(document.getElementsByClassName("loginBtn"));

openBtn.addEventListener("click", () => {
    menu.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
    menu.classList.add("hidden");
});

loginBtn.forEach(v => {
    v.addEventListener("click", () => {
        window.location.href = "/login";
    })
});