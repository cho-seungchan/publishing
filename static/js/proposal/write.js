// 시작일자가 오늘 날짜보다 작은지 확인. 종료일자가 시작일자보다 적은지 확인. 모집 마감일자가 종료일자보다 적은지 확인
const firstDate = document.querySelector(".gcqwwh.startdate");
const secondDate = document.querySelector(".gcqwwh.enddate");
const thirdDate = document.querySelector(".gcqwwh.deadlineDate");
const today = new Date().toISOString().split("T")[0];
let startDate = 0;
firstDate.addEventListener("change", () => {
    let startDate = firstDate.value;
    if (startDate < today) {
        alert(`시작 날짜("${startDate})가 오늘 날짜("${today}") 보다 작습니다.`);
        firstDate.value = "";
    }
});
