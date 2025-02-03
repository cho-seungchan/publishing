const toggleButton = document.querySelector(".Secondary__Button-l8jybe-0");
const modal = document.querySelector(".New__Container-sc-17rcq7-0");
const exitBtns = document.querySelector(".ebDrPW");
const exitBtn = document.querySelector(".caCrk");

toggleButton.addEventListener("click", () => {
    if (modal.classList.contains("hidden")) {
        modal.classList.remove("hidden");
        modal.classList.add("visible");
    } else {
        modal.classList.remove("visible");
        modal.classList.add("hidden");
    }
});

exitBtns.addEventListener("click", (e) => {
    modal.classList.remove("visible");
    modal.classList.add("hidden");
    // if (e.target === exitBtns) {
    //     modal.style.display = "none";
    // }
});

exitBtn.addEventListener("click", (e) => {
    modal.classList.remove("visible");
    modal.classList.add("hidden");
    // if (e.target === exitBtn) {
    //     modal.style.display = "none";
    // }
});
// modal.addEventListener("click", (e) => {
//     modal.classList.remove("visible");
//     modal.classList.add("hidden");
// });
