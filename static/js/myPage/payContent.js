const cancelButton = document.querySelectorAll(".buttonCancel");

cancelButton.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.target.setAttribute("style", "cursor:not-allowed");
        e.target.innerText = "환불 완료";
    });
});
