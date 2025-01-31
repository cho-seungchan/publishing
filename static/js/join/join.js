const buttonChange = document.querySelectorAll(".itbwCK>button");
const buttonChangeBottom = document.querySelectorAll("a>button");

buttonChange.forEach((button) => {
    button.addEventListener("mouseover", () => {
        button.classList.add("newButton");
    });
    button.addEventListener("mouseout", () => {
        button.classList.remove("newButton");
    });
});

buttonChangeBottom.forEach((button) => {
    button.addEventListener("mouseover", () => {
        button.classList.add("newButtonBottom");
    });
    button.addEventListener("mouseout", () => {
        button.classList.remove("newButtonBottom");
    });
});
