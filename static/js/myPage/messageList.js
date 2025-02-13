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

const contentList = document.querySelectorAll(".contentHidden");
const showtext = document.querySelectorAll(".showList");

contentList.forEach((list) => {
    list.addEventListener("click", (e) => {
        // 클릭된 요소
        const clickedElement = e.currentTarget;

        // 클릭된 요소의 텍스트 가져오기
        const coment = clickedElement.textContent;

        // 클릭된 요소와 같은 인덱스의 showList 요소 선택
        const index = Array.from(contentList).indexOf(clickedElement);
        const targetShowText = showtext[index];

        // 해당 요소의 span 태그 안의 br 태그 제거
        const span = targetShowText.querySelector("span");
        const findBr = span.querySelectorAll("br");
        findBr.forEach((br) => {
            br.parentNode.removeChild(br);
        });

        // 해당 요소에만 텍스트 설정
        span.innerHTML = coment;
        targetShowText.style.display = "block";

        // 나머지 요소 숨기기
        showtext.forEach((text, i) => {
            if (i !== index) {
                text.style.display = "none";
            }
        });
    });
});

const deleteButton = document.querySelectorAll(".deleteButton");

deleteButton.forEach((button) => {
    button.addEventListener("click", (e) => {
        const targetbutton = e.currentTarget;
        const parent = targetbutton.closest("li");
        const coment = confirm("정말 삭제하시겠습니까?");
        if (coment) {
            parent.remove();
        } else {
            alert("취소되었습니다.");
        }
    });
});
