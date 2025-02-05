document.querySelectorAll(".dXNbSn").forEach((button) => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const img = this.querySelector("img");
        console.log(img);
        if (img) {
            img.src = img.src.includes("icon1.svg")
                ? "../../static/images/ranking/icon2.svg"
                : "../../static/images/ranking/icon1.svg";
        }
    });
});
