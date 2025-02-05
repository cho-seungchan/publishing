const showAll = document.querySelector(".showAll");
const showNotice = document.querySelector(".showNotice");
const showEvent = document.querySelector(".showEvent");
const spanAll = document.querySelector(".spanAll");
const spanNotice = document.querySelector(".spanNotice");
const spanEvent = document.querySelector(".spanEvent");
const showUl = document.querySelectorAll(".ulWrap>ul");
const spans = document.querySelectorAll(".cxqTPR>span");

spans.forEach((span) => {
    span.addEventListener("click", (e) => {
        spans.forEach((otherSpan) => {
            if (otherSpan !== e.target) {
                otherSpan.classList.remove("changeBlue");
                otherSpan.classList.add("changeBlack");
            }
            e.target.classList.add("changeBlue");
            e.target.classList.remove("changeBlack");
            console.log(e.target.textContent);
            console.log(showUl.length);
            // for(let i = 0 ; i < showUl.length ; i ++) {
            //     if(e.target.textContent == "")
            // }
        });
    });
});
