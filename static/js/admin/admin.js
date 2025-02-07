let menuBtn = document.querySelector(".AppLayout_expandNavButton__NTEwM");
let nav = document.querySelector(".AppNavbarLayout_container__NmY5O");

menuBtn.addEventListener("click", function () {
    nav.classList.toggle("active");
});

let div = document.querySelector(".AppLayout_contents__YmI3N");
menuBtn.addEventListener("click", function () {
    div.classList.toggle("active");
});

menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle("active");
});

document.querySelector(".volunteerBtn").addEventListener("click", function () {
    document
        .querySelector(".DurationOfTourContainer")
        .classList.toggle("hidden");
    document
        .querySelector(".DurationOfTourContainer1")
        .classList.toggle("hidden");
});
