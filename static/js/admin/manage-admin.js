let menuBtn = document.querySelector(".AppLayout_expandNavButton__NTEwM");
let nav = document.querySelector(".AppNavbarLayout_container__NmY5O");

menuBtn.addEventListener("click", function () {
    nav.classList.toggle("active");
});

let div = document.querySelector(".AppLayout_contents__YmI3N");
menuBtn.addEventListener("click", function () {
    div.classList.toggle("active");
});

menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function () {
    const checkboxAll = document.querySelector(".checkboxall");
    const userListContainer = document.querySelector(
        ".NoticePage__NoticeListWrapper"
    );

    //"전체 선택" 체크박스 클릭 시 모든 개별 체크박스 상태 변경
    checkboxAll.addEventListener("change", function () {
        const userCheckboxes = document.querySelectorAll(".usersCheckbox"); // 최신 체크박스 목록 가져오기
        userCheckboxes.forEach((checkbox) => {
            checkbox.checked = checkboxAll.checked;
        });
    });

    //체크박스 상태 변경 감지 (이벤트 위임)
    userListContainer.addEventListener("change", function (event) {
        if (event.target.classList.contains("usersCheckbox")) {
            updateCheckboxAllState();
        }
    });

    function updateCheckboxAllState() {
        const userCheckboxes = document.querySelectorAll(".usersCheckbox");
        checkboxAll.checked =
            userCheckboxes.length > 0 &&
            [...userCheckboxes].every((cb) => cb.checked);
    }

    const manageBtn = document.querySelector(".manageBtn");
    const deleteBtn = document.querySelector(".deleteBtn");
    const inputRow = document.querySelector(".inputRow");
    const saveBtn = document.querySelector(".saveBtn1");
    const cancelBtn = document.querySelector(".cancelBtn");

    //"관리자 등록" 버튼 클릭 시 입력창 표시
    manageBtn.addEventListener("click", function () {
        inputRow.classList.remove("hidden");
    });

    // "취소" 버튼 클릭 시 입력창 숨김
    cancelBtn.addEventListener("click", function () {
        inputRow.classList.add("hidden");
    });

    //"저장" 버튼 클릭 시 입력값을 리스트에 추가
    saveBtn.addEventListener("click", function () {
        const id = document.querySelector(".inputId").value.trim();
        const account = document.querySelector(".inputAccount").value.trim();
        const name = document.querySelector(".inputName").value.trim();
        const phone = document.querySelector(".inputPhone").value.trim();
        const email = document.querySelector(".inputEmail").value.trim();

        if (!id || !account || !name || !phone || !email) {
            alert("모든 정보를 입력해주세요!");
            return;
        }

        //새로운 리스트 항목 추가
        const newListItem = document.createElement("li");
        newListItem.innerHTML = `
            <div class="userListDiv">
                <label><input type="checkbox" class="usersCheckbox"></label>
                <div class="idDiv">${id}</div>
                <div class="accountDiv">${account}</div>
                <div class="nameDiv">${name}</div>
                <div class="phoneDiv">${phone}</div>
                <div class="emailDiv">${email}</div>
            </div>
        `;

        userListContainer.appendChild(newListItem);

        //입력값 초기화
        document.querySelector(".inputId").value = "";
        document.querySelector(".inputAccount").value = "";
        document.querySelector(".inputName").value = "";
        document.querySelector(".inputPhone").value = "";
        document.querySelector(".inputEmail").value = "";

        // 입력창 숨기기
        inputRow.classList.add("hidden");

        // 전체 선택 상태 업데이트
        updateCheckboxAllState();
    });

    // "관리자 추방" 버튼 클릭 시 체크된 항목 삭제
    deleteBtn.addEventListener("click", function () {
        const selectedUsers = document.querySelectorAll(
            ".usersCheckbox:checked"
        );

        if (selectedUsers.length === 0) {
            alert("삭제할 사용자를 선택해주세요!");
            return;
        }

        selectedUsers.forEach((checkbox) => {
            checkbox.closest("li").remove();
        });

        //삭제 후 전체 선택 상태 업데이트
        setTimeout(updateCheckboxAllState, 0);
    });
});
