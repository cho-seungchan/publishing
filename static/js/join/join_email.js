const inputEmail = document.querySelector(".inputEmail");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
    /^(?=.*[A-Za-z].*)(?=.*\d.*|.*[\W_].*)[A-Za-z\d\W_]{10,}$/;

// p.innerText = "올바른 이메일 형식이 아닙니다.";
// p.style.color = "red";

inputEmail.addEventListener("blur", () => {
    if (!emailRegex.test(inputEmail.value)) {
        inputEmail.style.border = "1px solid rgb(222, 28, 34)";
        // inputEmail.after(p);
        return;
    }
});
