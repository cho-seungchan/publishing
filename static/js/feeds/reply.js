// input 창에 글자를 넣으면 등록 버튼 활성화

document.querySelector(".oflaA").addEventListener("input", () => {
    if (document.querySelector(".oflaA").value.trim().length > 0) {
        document
            .querySelector(".CurrentTextAreaSection__SubmitButton-sc-1l5sqeb-5")
            .classList.add("hMkcjB");
        document
            .querySelector(".CurrentTextAreaSection__SubmitButton-sc-1l5sqeb-5")
            .classList.remove("FEhZA");
        document.querySelector(
            ".CurrentTextAreaSection__SubmitButton-sc-1l5sqeb-5"
        ).style.cursor = "default";
    } else {
        document
            .querySelector(".CurrentTextAreaSection__SubmitButton-sc-1l5sqeb-5")
            .classList.remove("hMkcjB");
        document
            .querySelector(".CurrentTextAreaSection__SubmitButton-sc-1l5sqeb-5")
            .classList.add("FEhZA");
        document.querySelector(
            ".CurrentTextAreaSection__SubmitButton-sc-1l5sqeb-5"
        ).style.cursor = "not-allowed";
    }
});
// input 창에 글자를 넣으면 등록 버튼 활성화

const deleteButton = document.querySelectorAll(".deleteButton");

deleteButton.forEach((button) => {
    button.addEventListener("click", () => {
        const userConfirmed = confirm("정말 삭제하시겠습니까까?");
        if (userConfirmed) {
            const parent = button.closest(".myReply");
            if (parent) {
                parent.remove();
            }
        } else {
            alert("취소되었습니다.");
        }
    });
});
