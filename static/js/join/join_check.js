const phoneInput = document.querySelector(".phoneInput");
const sendButton = document.querySelector(".numberSend");

phoneInput.addEventListener("keyup", (e) => {
    const deleteP = phoneInput.nextElementSibling;
    if (deleteP && deleteP.classList.contains("errorMessage")) {
        deleteP.remove();
    }

    if (phoneInput.value.length >= 10 && phoneInput.value.length <= 11) {
        // phoneInput의 길이가 10보다 크거나 같을때
        // 아래의 클래스를 추가하고 삭제함에 따라 인증번호전송 버튼의 스타일이 변경
        phoneInput.classList.add("iRBMai");
        phoneInput.classList.remove("errorBorder");
        sendButton.classList.add("buttonBlack");
        sendButton.classList.remove("gsRKCU");
        deleteP.remove();
    } else {
        phoneInput.classList.add("errorBorder");
        phoneInput.classList.remove("iRBMai");
        sendButton.classList.add("gsRKCU");
        sendButton.classList.remove("buttonBlack");

        const p = document.createElement("p");
        p.classList.add("errorMessage");
        p.innerHTML = "올바른 휴대폰 번호 형식이 아닙니다.";
        e.target.after(p);
    }
});

const checkNumber = document.querySelector(".checkNumber");
const confirmButton = document.querySelector(".confirmButton");

checkNumber.addEventListener("keyup", (e) => {
    const deleteP = checkNumber.nextElementSibling;
    if (deleteP && deleteP.classList.contains("errorMessage")) {
        deleteP.remove();
    }

    if (checkNumber.value.length === 6) {
        checkNumber.classList.add("iRBMai");
        checkNumber.classList.remove("errorBorder");
        confirmButton.classList.add("buttonBlue");
        confirmButton.classList.remove("jquNPr");
    } else {
        checkNumber.classList.add("errorBorder");
        checkNumber.classList.remove("iRBMai");
        confirmButton.classList.add("jquNPr");
        confirmButton.classList.remove("buttonBlue");

        const p = document.createElement("p");
        p.classList.add("errorMessage");
        p.textContent = "올바른 인증번호 형식이 아닙니다.";
        e.target.after(p);
    }
});
