const button = document.querySelector(".listButton");
const view = document.querySelector(".listContainer");

button.addEventListener("click", () => {
    // style속성 삭제
    view.removeAttribute("style");
});

const approvalButton = document.querySelectorAll(".approvalButton");

let i = 2;
approvalButton.forEach((button) => {
    button.addEventListener("click", (e) => {
        alert("승인되었습니다.");
        const parent = button.closest("li");
        if (parent) {
            parent.remove();
            const coment = document.querySelector(".checkPerson");
            coment.innerText = "참여인원 : " + (i + 1) + "/10 명";
            i += 1;

            // 신청자 목록이 몇개 남았는지 확인하기 위해서 불러온다
            const listLength = document.querySelectorAll(
                ".NoticePage__NoticeListWrapper li"
            );
            if (listLength.length === 0) {
                // style 생성과 동시에 display:none 속성 부여
                view.setAttribute("style", "display:none;");
            }
        }
    });
});
