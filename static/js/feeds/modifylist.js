// 더보기 클릭시 글자 더 보여주기
const viewMore = document.querySelectorAll(".JMTjP");

viewMore.forEach((button) => {
    button.addEventListener("click", (e) => {
        const span = e.target.previousElementSibling;
        span.style.overflow = "visible";
        span.style.texOverflow = "initial";
        span.style.webkitLineClamp = "initial";
        span.style.lineClamp = "initial";
        span.style.webkitBoxOrient = "initial";
        span.style.maxHeight = "none";
        e.target.remove();
    });
});
// 더보기 클릭시 글자 더 보여주기

// 이미지가 여러개 일 때 좌우 클릭
const leftButton = document.querySelectorAll(".slick-arrow.slick-prev");
const rightButton = document.querySelectorAll(".slick-arrow.slick-next");
let numberOfImages = 6; // 서버에서 받아와야 할 값

leftButton.forEach((button) => {
    button.addEventListener("click", (e) => {
        // 부모 찾기
        const group = e.target.closest(".cyQYNE");
        // 움직일 판 찾기
        const slickTrack = group.querySelector(".slick-track");
        // 이미지 아래 동그란 버튼 컨테이너 가져오기
        const roundButtons = group.querySelectorAll(".slick-dots li");
        // 왼쪽으로 더 갈 곳이 있는지 확인하기 위해 현재 인덱스 찾기
        const currentActive = group.querySelector(
            ".slick-active.slick-current"
        );
        let currentIndex = parseInt(
            currentActive.getAttribute("data-index"),
            10
        );
        if (currentIndex > 0) {
            // 액티브 인덱스 해제하기
            currentActive.classList.remove("slick-active", "slick-current");
            currentActive.setAttribute("aria-hidden", "true");
            // 라운드 버튼 바탕색 변경
            roundButtons[currentIndex].classList.remove("slick-active");

            // 액티브 인덱스 새로 지정하기
            currentIndex -= 1;
            const nextActive = group.querySelector(
                `.slick-track div[data-index="${currentIndex}"]`
            );
            nextActive.classList.add("slick-active", "slick-current");
            nextActive.setAttribute("aria-hidden", "false");
            // 라운드 버튼 바탕색 변경
            roundButtons[currentIndex].classList.add("slick-active");
            // 판 움직이기

            slickTrack.style.transform = `translate3d(-${
                currentIndex * 344
            }px, 0, 0)`;
        }
    });
});

rightButton.forEach((button) => {
    button.addEventListener("click", (e) => {
        // 부모 찾기
        const group = e.target.closest(".cyQYNE");
        // 움직일 판 찾기
        const slickTrack = group.querySelector(".slick-track");
        // 이미지 아래 동그란 버튼 컨테이너 가져오기
        const roundButtons = group.querySelectorAll(".slick-dots li");
        // 오른쪽으로 더 갈 곳이 있는지 확인하기 위해 현재 인덱스 찾기
        const currentActive = group.querySelector(
            ".slick-active.slick-current"
        );
        let currentIndex = parseInt(
            currentActive.getAttribute("data-index"),
            10
        );
        if (currentIndex < numberOfImages - 1) {
            // 액티브 인덱스 해제하기
            currentActive.classList.remove("slick-active", "slick-current");
            currentActive.setAttribute("aria-hidden", "true");
            // 라운드 버튼 바탕색 변경
            roundButtons[currentIndex].classList.remove("slick-active");

            // 액티브 인덱스 새로 지정하기
            currentIndex += 1;
            const nextActive = group.querySelector(
                `.slick-track div[data-index="${currentIndex}"]`
            );
            nextActive.classList.add("slick-active", "slick-current");
            nextActive.setAttribute("aria-hidden", "false");
            // 라운드 버튼 바탕색 변경
            roundButtons[currentIndex].classList.add("slick-active");

            // 판 움직이기
            slickTrack.style.transform = `translate3d(-${
                currentIndex * 344
            }px, 0, 0)`;
        }
    });
});
// 이미지가 여러개 일 때 이미지 아래 둥근 버튼 클릭
const allRoundButtons = document.querySelectorAll(".slick-dots li");
allRoundButtons.forEach((roundButton) => {
    roundButton.addEventListener("click", (e) => {
        const parentOfButton = e.target.closest(".cyQYNE");
        // 해당 버튼의 부모 밑 모든 버튼의 액티브 해제
        const groupOfButton = parentOfButton.querySelectorAll(".slick-dots li");
        groupOfButton.forEach((e) => {
            e.classList.remove("slick-active");
        });
        // 현재 버튼의 액티브 설정
        e.target.closest("li").classList.add("slick-active");
        // 버튼 인덱스 가져오기
        const buttonText = e.target.innerText;
        const index = parseInt(buttonText, 10);
        // 판 움직이기
        const buttonSlickTrack = parentOfButton.querySelector(".slick-track");
        buttonSlickTrack.style.transform = `translate3d(-${
            index * 344
        }px, 0, 0)`;

        // slick track의 같은 index에 "slick-active", "slick-current" 설정하고 나머지 인텍스에서는 해제
        // 이 설정을 해줘야 오른쪽 왼쪽 버튼 클릭시 이미지 위치를 찾을 수 있음.
        // 기존 액티브 해제
        buttonSlickTrack
            .querySelector(".slick-active.slick-current")
            .setAttribute("aria-hidden", "true");
        buttonSlickTrack
            .querySelector(".slick-active.slick-current")
            .classList.remove("slick-active", "slick-current");
        // 버튼이 눌린 인덱스에 액티브 설정
        const slickTrackDiv = buttonSlickTrack.querySelectorAll(".slick-slide");
        slickTrackDiv[index].setAttribute("aria-hidden", "false");
        slickTrackDiv[index].classList.add("slick-active", "slick-current");
    });
});
// 이미지가 여러개 일 때 이미지 아래 둥근 버튼 클릭
