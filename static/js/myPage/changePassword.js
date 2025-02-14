const newPassword = document.querySelector(".newPassword");
const check = document.querySelector(".checkPassword");
const button = document.querySelector("form>button");
const p = document.createElement("p");
p.classList.add("changeComment");

check.addEventListener("keyup", () => {
    console.log(check.value);
    if (check.value === newPassword.value && check.value !== "") {
        button.classList.add("changeButton");
        button.classList.remove("chSrfn");
        button.removeAttribute("disabled");
        check.classList.remove("errorInput");
        check.classList.add("iRBMai");
        check.nextElementSibling.remove();
        return;
    }
    check.classList.remove("iRBMai");
    check.classList.add("errorInput");
    button.classList.add("chSrfn");
    button.classList.remove("changeButton");
    button.setAttribute("disabled", "");
    p.innerText = "먼저 입력하신 비밀번호와 일치하지 않습니다.";
    check.after(p);
});
