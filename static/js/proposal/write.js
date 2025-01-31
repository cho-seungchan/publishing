// 시작일자가 오늘 날짜보다 작은지 확인. 종료일자가 시작일자보다 적은지 확인. 모집 마감일자가 종료일자보다 적은지 확인
const firstDate = document.querySelector(".gcqwwh.startdate");
const secondDate = document.querySelector(".gcqwwh.enddate");
const thirdDate = document.querySelector(".gcqwwh.deadline");
const today = new Date().toISOString().split("T")[0];
let startDate = 0;
let endDate = 0;
let deadline = 0;
firstDate.addEventListener("change", () => {
    startDate = firstDate.value;
    if (startDate < today) {
        alert(`시작 날짜("${startDate})가 오늘 날짜("${today}") 보다 작습니다.`);
        firstDate.value = "";
    } else if (endDate != 0 && endDate < startDate) {
        alert(`시작 날짜("${startDate})가 종료 날짜("${endDate}") 보다 큽니다.`);
        firstDate.value = "";
    } else if (deadline != 0 && deadline > startDate) {
        alert(`시작 날짜("${startDate})가 마감 날짜("${deadline}") 보다 작습니다.`);
        firstDate.value = "";
    }
});

secondDate.addEventListener("change", () => {
    endDate = secondDate.value;
    if (endDate < today) {
        alert(`종료 날짜("${endDate})가 오늘 날짜("${today}") 보다 작습니다.`);
        secondDate.value = "";
    } else if (startDate != 0 && startDate > endDate) {
        alert(`종료 날짜("${endDate})가 시작 날짜("${startDate}") 보다 작습니다.`);
        secondDate.value = "";
    } else if (deadline != 0 && deadline > endDate) {
        alert(`종료 날짜("${endDate})가 마감 날짜("${deadline}") 보다 작습니다.`);
        secondDate.value = "";
    }
});

thirdDate.addEventListener("change", () => {
    deadline = thirdDate.value;
    if (deadline < today) {
        alert(`마감 날짜("${deadline})가 오늘 날짜("${today}") 보다 작습니다.`);
        thirdDate.value = "";
    } else if (startDate != 0 && startDate <= deadline) {
        alert(`마감 날짜("${deadline})가 시작 날짜("${startDate}") 보다 큽니다.`);
        thirdDate.value = "";
    } else if (endDate != 0 && endDate <= deadline) {
        alert(`마감 날짜("${deadline})가 종료 날짜("${endDate}") 보다 큽니다.`);
        thirdDate.value = "";
    }
});
