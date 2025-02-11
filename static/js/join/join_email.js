const div = document.querySelector(".fLECcs");
const inputEmail = document.querySelector(".inputEmail");
const inputPassword = document.querySelector(".inputPassword");
const passwordText = document.querySelector(".cIOZzg");
const inputCheck = document.querySelector(".inputCheck");
const inputAll = document.querySelectorAll(".iRBMai");
const p = document.createElement("p");
const loginButton = document.querySelector(".chSrfn");
p.classList.add("bViOzS");
console.log(loginButton);

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
    /^(?=.*[A-Za-z].*)(?=.*\d.*|.*[\W_].*)[A-Za-z\d\W_]{10,}$/;

// inputAll.forEach((input) => {
//     input.addEventListener("focus", (e) => {
//         e.target.style.border = "1px solid blue";
//     });
//     input.addEventListener("blur", (e) => {
//         if (
//             (e.target === inputEmail && emailRegex.test(inputEmail.value)) ||
//             (e.target === inputPassword &&
//                 passwordRegex.test(inputPassword.value)) ||
//             (e.target === inputCheck &&
//                 inputCheck.value === inputPassword.value)
//         ) {
//             e.target.style.border = "1px solid rgb(238, 238, 238)";
//         } else {
//             e.target.style.border = "1px solid rgb(222, 28, 34)";
//         }
//     });
// });

inputEmail.addEventListener("keyup", () => {
    if (!emailRegex.test(inputEmail.value) && inputEmail.value !== "") {
        inputEmail.classList.add("errorInput");
        inputEmail.classList.remove("iRBMai");
        p.innerText = "올바른 이메일 형식이 아닙니다.";
        if (!div.firstElementChild.contains(p)) {
            div.firstElementChild.appendChild(p);
        }
        return;
    }
    inputEmail.classList.add("iRBMai");
    inputEmail.classList.remove("errorInput");

    if (div.firstElementChild.contains(p)) {
        div.firstElementChild.removeChild(p);
    }
});

inputPassword.addEventListener("keyup", () => {
    if (
        !passwordRegex.test(inputPassword.value) &&
        inputPassword.value !== ""
    ) {
        inputPassword.classList.add("errorInput");
        inputPassword.classList.remove("iRBMai");
        passwordText.classList.add("bViOzS");
        passwordText.classList.remove("cIOZzg");
        return;
    }
    inputPassword.classList.add("iRBMai");
    inputPassword.classList.remove("errorInput");

    passwordText.classList.add("cIOZzg");
    passwordText.classList.remove("bViOzS");
});

inputCheck.addEventListener("keyup", () => {
    if (inputCheck.value !== inputPassword.value && inputCheck.value !== "") {
        inputCheck.classList.add("errorInput");
        inputCheck.classList.remove("iRBMai");
        p.innerText = "먼저 입력하신 비밀번호와 일치하지 않습니다.";
        if (!div.children[2].contains(p)) {
            div.children[2].appendChild(p);
        }
    } else {
        inputCheck.classList.add("iRBMai");
        inputCheck.classList.remove("errorInput");
        if (div.children[2].contains(p)) {
            div.children[2].removeChild(p);
        }
    }

    if (
        emailRegex.test(inputEmail.value) &&
        passwordRegex.test(inputPassword.value) &&
        inputCheck.value === inputPassword.value
    ) {
        loginButton.classList.add("foCOgK");
        loginButton.classList.remove("chSrfn");
    }
});
