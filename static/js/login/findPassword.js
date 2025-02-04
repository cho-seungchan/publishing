const inputChange = document.querySelectorAll("div input");

inputChange.forEach((input) => {
    input.addEventListener("focus", (e) => {
        e.target.style.border = "1px solid blue";
    });

    input.addEventListener("blur", (e) => {
        e.target.style.border = "1px solid rgb(238, 238, 238)";
    });
});
