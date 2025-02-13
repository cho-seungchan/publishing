const viewContent = document.querySelectorAll(".hiddenText");

viewContent.forEach((span) => {
    span.addEventListener("click", (e) => {
        e.target.parentElement.classList.add("contentView");
        e.target.parentElement.classList.remove("contentHidden");
    });
});

const buttons = document.querySelectorAll(".buttonAll");
const lists = document.querySelectorAll(".listWrap");

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const targetButton = e.currentTarget;
        const targetDiv = targetButton.getAttribute("data-target");

        const otherButtons = Array.from(buttons).filter(
            (el) => el !== targetButton
        );
        otherButtons.forEach((other) => {
            console.log("Other button:", other);
            other.classList.add("anotherButton");
            other.classList.remove("thisButton");
        });

        targetButton.classList.add("thisButton");
        targetButton.classList.remove("anotherButton");

        lists.forEach((list) => {
            if (list.id === targetDiv) {
                list.style.display = "block";
            } else {
                list.style.display = "none";
            }
        });
    });
});
