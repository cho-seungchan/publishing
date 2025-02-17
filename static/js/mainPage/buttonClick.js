const buttons = document.querySelectorAll(".buttonAll");

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        // thisButton 클래스가 포함되어있는 변수를 생성한다.
        const otherButtons = document.querySelectorAll(".thisButton");
        // 버튼을 눌렀을때 해당 thiseButton 클래스를 추가하고 anotherButton 클래스를 제거한다.
        e.target.classList.remove("anotherButton");
        e.target.classList.add("thisButton");
        // otherButtons를 돌면서
        otherButtons.forEach((otherButton) => {
            // otherButton이 e.target이 아닐경우
            if (otherButton !== e.target) {
                // thisButton 클래스를 제거하고 anotherButton 클래스를 추가한다.
                otherButton.classList.remove("thisButton");
                otherButton.classList.add("anotherButton");
            }
        });
    });
});
