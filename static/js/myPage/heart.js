document.querySelectorAll(".heartButton").forEach((button) => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const img = this.querySelector("img");
        console.log(img);
        if (img) {
            img.src = img.src.includes("red.svg")
                ? "../../static/images/main/white.svg"
                : "../../static/images/main/red.svg";
        }
    });
});
