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
    const checkboxes = document.querySelectorAll(".usersCheckbox");
    const selectCourseOpt = document.querySelector(".selectCourseOpt");
    const selectCourseBtn = document.querySelector(".selectCourseBtn");

    // 체크박스 하나만 선택되도록 설정
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                checkboxes.forEach((cb) => {
                    if (cb !== this) cb.checked = false;
                });
            }
        });
    });

    selectCourseBtn.addEventListener("click", function () {
        const selectedCourse = selectCourseOpt.value;

        if (!selectedCourse) {
            alert("변경할 코스를 선택해주세요.");
            return;
        }

        let updated = false; // 체크된 항목이 있는지 확인
        let isVolunteerCourse = false; // "봉사 코스" 여부 확인
        let isDuplicate = false; // 중복 여부 확인

        // 현재 페이지에서 이미 사용 중인 코스 목록 확인 단, N/A는 제외
        const existingCourses = new Set();
        document.querySelectorAll(".courseTypeDiv").forEach((div) => {
            const text = div.textContent.trim();
            if (text && text !== "N/A") {
                existingCourses.add(text);
            }
        });

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const userRow = checkbox.closest(".userListDiv");
                const courseTypeDiv = userRow.querySelector(".courseTypeDiv");
                const currentCourse = courseTypeDiv.textContent.trim();

                // 봉사 코스 변경 불가 처리
                if (
                    currentCourse === "봉사 코스" &&
                    selectedCourse !== "봉사 코스"
                ) {
                    alert("봉사 코스는 다른 코스로 변경할 수 없습니다.");
                    isVolunteerCourse = true;
                    return;
                }

                // N/A 선택 시 중복 검사 예외 처리
                if (
                    selectedCourse !== "N/A" &&
                    existingCourses.has(selectedCourse)
                ) {
                    if (!isDuplicate) {
                        // 중복 경고가 한 번만 뜨도록 처리
                        alert(
                            `"${selectedCourse}" 코스는 이미 다른 항목에 지정되어 있습니다.`
                        );
                        isDuplicate = true;
                    }
                    return;
                }

                //기존 값을 지우고 새 값으로 덮어쓰기
                courseTypeDiv.textContent = selectedCourse;
                updated = true;
            }
        });

        // 중복 경고가 떴거나, 봉사 코스 변경 시 실행 방지
        if (isDuplicate || isVolunteerCourse) return;

        // 아무것도 선택하지 않았을 경우
        if (!updated) {
            alert("코스를 변경할 항목을 선택해주세요.");
        }

        // 체크박스 선택 해제 (선택 후 자동 해제되도록)
        checkboxes.forEach((checkbox) => (checkbox.checked = false));
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".SearchInput");
    const userListItems = document.querySelectorAll(
        ".NoticePage__NoticeListWrapper li"
    );

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.trim().toLowerCase();

        userListItems.forEach((item) => {
            const courseId = item
                .querySelector(".courseIdDiv")
                .textContent.trim()
                .toLowerCase();
            const adminName = item
                .querySelector(".adminNameDiv")
                .textContent.trim()
                .toLowerCase();
            const courseName = item
                .querySelector(".courseNameDiv")
                .textContent.trim()
                .toLowerCase();
            const courseAddress = item
                .querySelector(".courseAddressDiv")
                .textContent.trim()
                .toLowerCase();
            const courseType = item
                .querySelector(".courseTypeDiv")
                .textContent.trim()
                .toLowerCase();

            // 입력된 검색어가 포함된 요소만 보이도록 설정
            if (
                courseId.includes(searchText) ||
                adminName.includes(searchText) ||
                courseName.includes(searchText) ||
                courseAddress.includes(searchText) ||
                courseType.includes(searchText)
            ) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
});
