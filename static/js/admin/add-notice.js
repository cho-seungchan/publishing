document.querySelector(".addNoticeBtn").addEventListener("click", function () {
    let titleInput = document.querySelector(".gcqwwh.name");
    let contentInput = document.querySelector(".kmqQeB");

    // trim을 사용해서 빈 문자열만 넣어도 입력 안된것으로 체크
    if (!titleInput || titleInput.value.trim() === "") {
        alert("제목을 입력하세요!!!");
    } else if (!contentInput || contentInput.value.trim() === "") {
        alert("내용을 입력하세요!!!");
    } else {
        alert("공지사항이 등록되었습니다!");
    }
});
