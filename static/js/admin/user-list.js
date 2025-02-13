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
    const userCheckboxes = document.querySelectorAll(".usersCheckbox");
    const pauseBtn = document.querySelector(".pauseBtn");
    const banBtn = document.querySelector(".banBtn");
    const restorationBtn = document.querySelector(".restorationBtn");

    //전체 선택 체크박스 클릭 시 모든 개별 체크박스 상태 변경
    checkboxAll.addEventListener("change", function () {
        userCheckboxes.forEach((checkbox) => {
            checkbox.checked = checkboxAll.checked;
        });
    });

    //개별 체크박스 변경 시 전체 선택 체크박스 상태 업데이트
    userCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            checkboxAll.checked = [...userCheckboxes].every((cb) => cb.checked);
        });
    });

    //회원 정지 버튼 클릭 시 - 확인 누르면 실행, 취소 누르면 아무 변화 없음
    pauseBtn.addEventListener("click", function () {
        const isConfirmed = confirm("정말 회원을 정지하시겠습니까?");
        if (!isConfirmed) return; // 취소를 누르면 함수 종료 (아무 변화 없음)

        userCheckboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const userRow = checkbox.closest(".userListDiv");
                userRow.classList.add("banned"); // 회색 처리
                checkbox.checked = false; // 체크 해제
            }
        });

        // 전체 선택 체크 해제
        checkboxAll.checked = false;
    });

    //회원 추방 버튼 클릭 시 - 확인 누르면 실행, 취소 누르면 아무 변화 없음
    banBtn.addEventListener("click", function () {
        const isConfirmed = confirm("정말 회원을 추방하시겠습니까?");
        if (!isConfirmed) return; // 취소를 누르면 함수 종료 (아무 변화 없음)

        userCheckboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const userRow = checkbox.closest(".userListDiv");
                userRow.classList.add("removed"); // 취소선 추가
                checkbox.checked = false; // 체크 해제
            }
        });

        // 전체 선택 체크 해제
        checkboxAll.checked = false;
    });

    //정지 취소 버튼 클릭 시 - 정지된 회원만 원상 복구 가능
    restorationBtn.addEventListener("click", function () {
        const isConfirmed = confirm("정말 회원을 복구하시겠습니까?");
        if (!isConfirmed) return; // 취소를 누르면 함수 종료 (아무 변화 없음)
        let hasBannedUser = false;

        userCheckboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const userRow = checkbox.closest(".userListDiv");

                if (userRow.classList.contains("banned")) {
                    userRow.classList.remove("banned"); // 회색 제거
                    checkbox.checked = false; // 체크 해제
                    hasBannedUser = true;
                }
            }
        });

        // 만약 정지된 회원이 하나도 없었다면 경고창 띄우기
        if (!hasBannedUser) {
            alert("정지된 회원만 정지 취소할 수 있습니다.");
        }

        // 전체 선택 체크 해제
        checkboxAll.checked = false;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".SearchInput");
    const userList = document.querySelectorAll(".userListDiv");

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.trim().toLowerCase(); // 검색어 (소문자로 변환)

        userList.forEach((user) => {
            const id = user.querySelector(".idDiv").textContent.toLowerCase();
            const account = user
                .querySelector(".accountDiv")
                .textContent.toLowerCase();
            const name = user
                .querySelector(".nameDiv")
                .textContent.toLowerCase();
            const phone = user
                .querySelector(".phoneDiv")
                .textContent.toLowerCase();
            const email = user
                .querySelector(".emailDiv")
                .textContent.toLowerCase();

            // 검색어가 포함되면 표시, 없으면 숨김
            if (
                id.includes(searchText) ||
                account.includes(searchText) ||
                name.includes(searchText) ||
                phone.includes(searchText) ||
                email.includes(searchText)
            ) {
                user.classList.remove("hidden");
            } else {
                user.classList.add("hidden");
            }
        });
    });
});
