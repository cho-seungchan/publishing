const login = document.querySelector(".loginButton");
const id = document.querySelector(".idInput");
const password = document.querySelector(".passwordInput");

id.addEventListener("keyup", () => {
    if (id.value.length !== 0 && password.value.length !== 0) {
        login.classList.add("buttonChange");
        login.classList.remove("iikbgZ");
    } else {
        login.classList.add("iikbgZ");
        login.classList.remove("buttonChange");
    }
});

password.addEventListener("keyup", () => {
    if (id.value.length !== 0 && password.value.length !== 0) {
        login.classList.add("buttonChange");
        login.classList.remove("iikbgZ");
    } else {
        login.classList.add("iikbgZ");
        login.classList.remove("buttonChange");
    }
});
