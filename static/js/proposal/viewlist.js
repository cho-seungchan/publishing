// 이미지가 <a> 태그 안에 포함되어 있을 경우, 클릭 시 해당 링크의 기본 동작이 페이지를 맨 위로 스크롤할 수 있습니다.
// 이를 방지하기 위해 다음과 같은 방법을 사용
document.querySelectorAll("a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
    });
});

// 화면이 눌릴 때 위에 빨간줄 이동하고, 아래쪽 관광지 상세 사진 보이기
const cosList = document.querySelector(".pc.js_slider .cosList");
const swiperslides = cosList.querySelectorAll(".swiper-slide");
const swiperslidesLength = swiperslides.length;

swiperslides.forEach((swiperslide) => {
    swiperslide.addEventListener("click", (e) => {
        // console.log(e.target.closest("li").outerHTML);
        // console.log(e.target.closest("li").querySelector("em").outerHTML);
        const emValue = parseInt(e.target.closest("li").querySelector("em").textContent);

        swiperslides.forEach((e) => {
            e.classList.remove("on", "on1");
            e.querySelector("a").removeAttribute("title");

            if (parseInt(e.textContent) < emValue) {
                e.classList.add("on");
            }
        });

        e.target.closest("li").classList.add("on1");
        e.target.closest("li").querySelector("a").setAttribute("title", "선택됨");

        // 아래쪽 관광지 상세 사진 보여주기

        const idValue = emValue < 10 ? "cosTab0" + emValue : "cosTab" + emValue;
        document.querySelectorAll(".cos_cont").forEach((e) => {
            console.log(e.className);
            e.classList.remove("active");
            if (e.id == idValue) {
                e.classList.add("active");
            }
        });
    });
});

// 연관 관광지 버튼 클릭시 이미지 3개씩 이동 600px, 디스플레이 720px
let leftEnd = 0; // 화면 왼쪽 끝
let rightEnd = 800;
let maxRightEnd = swiperslidesLength * 200;

document.querySelector(".swiper-button-next").addEventListener("click", (e) => {
    rightEnd += 600;
    leftEnd += 600;
    if (rightEnd > maxRightEnd) {
        // maxRightEnd 보다 오른쪽으로 못 가도록 막음
        leftEnd -= rightEnd - maxRightEnd;
        rightEnd = maxRightEnd;

        document.querySelector(".swiper-button-next").classList.add("swiper-button-disabled");
        document.querySelector(".swiper-button-next").setAttribute("aria-disabled", "true");
    }
    cosList.style.transform = `translate3d(${720 - rightEnd}px, 0, 0)`;
    document.querySelector(".swiper-button-prev").classList.remove("swiper-button-disabled");
    document.querySelector(".swiper-button-prev").setAttribute("aria-disabled", "false");
});

document.querySelector(".swiper-button-prev").addEventListener("click", (e) => {
    leftEnd -= 600;
    rightEnd -= 600;
    if (leftEnd < 0) {
        // 0 보다 오른쪽으로 못 가도록 막음
        rightEnd -= leftEnd;
        leftEnd = 0;

        document.querySelector(".swiper-button-prev").classList.add("swiper-button-disabled");
        document.querySelector(".swiper-button-prev").setAttribute("aria-disabled", "true");
    }
    cosList.style.transform = `translate3d(${leftEnd}px, 0, 0)`;
    document.querySelector(".swiper-button-next").classList.remove("swiper-button-disabled");
    document.querySelector(".swiper-button-next").setAttribute("aria-disabled", "flase");
});
// 연관 관광지  버튼 클릭시 작동 3개씩 이동 600px, 디스플레이 720px

// 후기의 버튼 클릭시 이미지 3개식 이동 732px, 디스플레이 768px

let leftReviewEnd = 0; // 화면 왼쪽 끝
let rightReviewEnd = 976;
let maxReviewRightEnd = document.querySelectorAll(".slick-slide").length * 244;

document.querySelector(".slick-next").addEventListener("click", (e) => {
    rightReviewEnd += 732;
    leftReviewEnd += 732;
    if (rightReviewEnd > maxRightEnd) {
        // maxRightEnd 보다 오른쪽으로 못 가도록 막음
        leftReviewEnd -= rightReviewEnd - maxRightEnd;
        rightReviewEnd = maxRightEnd;

        document.querySelector(".slick-next").classList.add("slick-disabled");
    }
    document.querySelector(".slick-track").style.transform = `translate3d(${768 - rightReviewEnd}px, 0, 0)`;
    document.querySelector(".slick-prev").classList.remove("slick-disabled");
});

document.querySelector(".slick-prev").addEventListener("click", (e) => {
    leftReviewEnd -= 732;
    rightReviewEnd -= 732;
    if (leftReviewEnd < 0) {
        // 0 보다 오른쪽으로 못 가도록 막음
        rightReviewEnd -= leftReviewEnd;
        leftReviewEnd = 0;

        document.querySelector(".slick-prev").classList.add("slick-disabled");
    }
    document.querySelector(".slick-track").style.transform = `translate3d(${leftReviewEnd}px, 0, 0)`;
    document.querySelector(".slick-next").classList.remove("slick-disabled");
});
// 후기의 버튼 클릭시 이미지 3개식 이동 732px, 디스플레이 768px

// 위로 버튼 누르면 화면 위쪽으로 천천히 이동
document.querySelector(".gQlhwK").addEventListener("click", (e) => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
// 위로 버튼 누르면 화면 위쪽으로 천천히 이동
