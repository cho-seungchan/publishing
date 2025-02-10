// dropdown menu 클릭시 처리
// hSyPxW => idBToY button text
const ldipRM = document.createElement("div");
ldipRM.className = "FilterReview__AbsoluteDropMenuWrapper-t2nsz-2 ldipRM";
ldipRM.innerHTML = `<button class="FilterReview__Option-t2nsz-3">평점 높은순</button
                    ><button class="FilterReview__Option-t2nsz-3">평점 낮은순</button
                    ><button class="FilterReview__Option-t2nsz-3">최신순</button
                    ><button class="FilterReview__Option-t2nsz-3">도움순</button>`;

document.querySelector(".dYjXLj button").addEventListener("click", (e) => {
    document.querySelector(".dYjXLj").querySelector("div").appendChild(ldipRM); // dropdown menu 생성
    const titleMenu = document.querySelector(".dYjXLj button").childNodes[0].textContent;
    document.querySelectorAll(".FilterReview__Option-t2nsz-3").forEach((e) => {
        // 타이틀과 같은 버튼 진하게
        if (e.textContent.trim() === titleMenu.trim()) {
            e.classList.add("idBToY");
        } else {
            e.classList.add("hSyPxW");
        }
    });

    document.querySelector(".dYjXLj").addEventListener("click", (e) => {
        // 눌린 메뉴로 타이틀 바꿔주기
        if (e.target.classList.contains("FilterReview__Option-t2nsz-3")) {
            document.querySelector(".dYjXLj button").childNodes[0].textContent = e.target.textContent;
            document.querySelector(".ldipRM").remove();
        }
    });
});
// dropdown menu 클릭시 처리

// 화면 클릭시 전체화면 모달 화면으로 전환
const leftButton = document.createElement("button");
leftButton.type = "button";
leftButton.className = "arrow_b9bbag-o_O-arrow__direction__left_shhpn5-o_O-arrow__size__medium_9f7hgo";
leftButton.title = "Previous (Left arrow key)";
leftButton.innerHTML = `<span
                                    ><svg
                                        fill="white"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 512 512"
                                        xml:space="preserve"
                                    >
                                        <path
                                            d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"
                                        ></path></svg
                                ></span>`;
const rightButton = document.createElement("button");
rightButton.type = "button";
rightButton.className = "arrow_b9bbag-o_O-arrow__direction__right_174p6a9-o_O-arrow__size__medium_9f7hgo";
rightButton.title = "Next (Right arrow key)";
rightButton.innerHTML = `<span
                                    ><svg
                                        fill="white"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 512 512"
                                        xml:space="preserve"
                                    >
                                        <path
                                            d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"
                                        ></path></svg
                                ></span>`;
const lightboxBackdrop = document.querySelector("#lightboxBackdrop > div");

document.querySelectorAll(".gDuKGF").forEach((imgContainer) => {
    imgContainer.addEventListener("click", (e) => {
        // 기본 정보 취득
        // 화면의 갯수
        const imgCount = e.currentTarget.closest(".dbtIvu").querySelectorAll(".gDuKGF").length;
        // 클릭된 화면의 인덱스
        var currentIndex = Array.from(e.currentTarget.closest(".dbtIvu").querySelectorAll(".gDuKGF")).indexOf(
            e.currentTarget
        );
        // 화면들의 src
        const imgArray = Array.from(e.currentTarget.closest(".dbtIvu").querySelectorAll(".gDuKGF>img")).map(
            (img) => img.src
        );

        // 해당 img src 설정
        document.querySelector(".figure_10ki57k img").src = imgArray[currentIndex];
        document.querySelector("#modal-root").style.display = "";
        // 현재 화면 위치/총 화면 수
        document.querySelector(".footerCount_lkhc9u").textContent = `${currentIndex + 1}/${imgCount}`;

        // 버튼 생성
        createButton(currentIndex, imgCount);

        // 이벤트 위임
        lightboxBackdrop.addEventListener("click", (event) => {
            if (
                event.target.matches(
                    ".arrow_b9bbag-o_O-arrow__direction__left_shhpn5-o_O-arrow__size__medium_9f7hgo > span > svg"
                )
            ) {
                moveLeft();
            } else if (
                event.target.matches(
                    ".arrow_b9bbag-o_O-arrow__direction__right_174p6a9-o_O-arrow__size__medium_9f7hgo > span > svg"
                )
            ) {
                moveRight();
            }

            function moveLeft() {
                if (currentIndex > 0) {
                    currentIndex--;
                    document.querySelector(".figure_10ki57k img").src = imgArray[currentIndex];
                    document.querySelector(".footerCount_lkhc9u").textContent = `${currentIndex + 1}/${imgCount}`;
                    createButton(currentIndex, imgCount);
                }
            }

            function moveRight() {
                if (currentIndex < imgCount - 1) {
                    currentIndex++;
                    document.querySelector(".figure_10ki57k img").src = imgArray[currentIndex];
                    document.querySelector(".footerCount_lkhc9u").textContent = `${currentIndex + 1}/${imgCount}`;
                    createButton(currentIndex, imgCount);
                }
            }
        });
    });
});

function createButton(currentIndex, imgCount) {
    // 존재하면 왼쪽 버튼 삭제
    if (document.querySelector(".arrow_b9bbag-o_O-arrow__direction__left_shhpn5-o_O-arrow__size__medium_9f7hgo")) {
        document
            .querySelector(".arrow_b9bbag-o_O-arrow__direction__left_shhpn5-o_O-arrow__size__medium_9f7hgo")
            .remove();
    }
    // 존재하면 오른쪽 버튼 삭제
    if (document.querySelector(".arrow_b9bbag-o_O-arrow__direction__right_174p6a9-o_O-arrow__size__medium_9f7hgo")) {
        document
            .querySelector(".arrow_b9bbag-o_O-arrow__direction__right_174p6a9-o_O-arrow__size__medium_9f7hgo")
            .remove();
    }

    // 버튼 생성
    if (imgCount > 1) {
        if (0 < currentIndex && currentIndex < imgCount - 1) {
            // 양쪽 버튼 생성
            document.querySelector("#lightboxBackdrop > div").appendChild(leftButton);
            document.querySelector("#lightboxBackdrop > div").appendChild(rightButton);
        } else if (currentIndex == 0) {
            // 오른쪽 버튼만 생성
            document.querySelector("#lightboxBackdrop > div").appendChild(rightButton);
        } else if (currentIndex == imgCount - 1) {
            // 왼쪽 버트만 생성
            document.querySelector("#lightboxBackdrop > div").appendChild(leftButton);
        }
    }
}

// 모달 X 버튼 클릭시 동작
document.querySelector(".close_1x3s325").addEventListener("click", () => {
    if (document.querySelector("#modal-root").style.display == "none") {
        document.querySelector("#modal-root").style.display = "";
    } else {
        document.querySelector("#modal-root").style.display = "none";
    }
});
