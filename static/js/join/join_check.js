const phoneInput = document.querySelector(".phoneInput");
const sendButton = document.querySelector(".numberSend");

phoneInput.addEventListener("keyup", () => {
    if (phoneInput.value.length >= 10) {
        sendButton.classList.add("buttonBlack");
        sendButton.classList.remove("gsRKCU");
    } else {
        sendButton.classList.add("gsRKCU");
        sendButton.classList.remove("buttonBlack");
    }
});
