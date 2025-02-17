const showAll = document.querySelector(".showAll");
const showNotice = document.querySelector(".showNotice");
const showEvent = document.querySelector(".showEvent");
const spans = document.querySelectorAll(".cxqTPR>span");

spans.forEach((span) => {
    span.addEventListener("click", (e) => {
        spans.forEach((otherSpan) => {
            if (otherSpan !== e.target) {
                otherSpan.classList.remove("changeBlue");
                otherSpan.classList.add("changeBlack");
            }
        });
        e.target.classList.add("changeBlue");
        e.target.classList.remove("changeBlack");

        if (e.target.textContent === "전체") {
            showAll.classList.remove("hiddenList");
            showNotice.classList.add("hiddenList");
            showEvent.classList.add("hiddenList");
        } else if (e.target.textContent === "공지") {
            showNotice.classList.remove("hiddenList");
            showAll.classList.add("hiddenList");
            showEvent.classList.add("hiddenList");
        } else if (e.target.textContent === "이벤트") {
            showEvent.classList.remove("hiddenList");
            showAll.classList.add("hiddenList");
            showNotice.classList.add("hiddenList");
        }
    });
});
