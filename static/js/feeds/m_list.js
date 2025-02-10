function handleResize() {
    console.log("window.innerWidth   " + window.innerWidth);
    if (window.innerWidth > 600) {
        // 화면 사이즈가 412 이상 일 대
        // ? 버튼을 눌렀을 때 모달창이 열리고, 모달창 이외 부분을 누르면 모달창이 닫히게 작동
        const questionButton = document.querySelector(".eWCRmm");
        const modal = document.querySelector("#modal-root");
        const modalDiv = document.createElement("div");
        modalDiv.innerHTML = `<div class="ActionSheet__Container-akkdcx-0 jgFMVr">
        <div class="ActionSheet__Content-akkdcx-2 cyEVkt"><header class="ActionSheet__Header-akkdcx-3 dNCiPY">
        </header><header class="Ver4__TitleVer4-d1i4tu-0 kNwzQK">피커스 피드란?</header>
        <div class="WhatIsActionSheet__Body-sc-10e5q0f-0 cblWvR">
        <strong class="WhatIsActionSheet__Summary-sc-10e5q0f-1 bAnoxg">피드를 통해 나를 표현하고 
        <span role="img" aria-label="sunglasses">😎</span><br>다른 크루들의 활동도 확인해보세요.</strong>
        <p class="WhatIsActionSheet__Description-sc-10e5q0f-2 dkImul">
        피커스에서 즐거웠고 행복했던 순간들을 후기로만 남기기엔 아쉬웠다면 피드로 다른 크루들에게 공유해 보세요. 
        그리고 다른 크루들의 의견 및 피드도 구경하세요.</p></div><img src="../../static/images/feeds/365535eb402ce8672ce933afcebe47b9.png" 
        class="WhatIsActionSheet__ImageBanner-sc-10e5q0f-4 kYigqi"></div>
        <div class="ActionSheet__Overlay-akkdcx-1 eCzJv"></div></div>`;

        questionButton.addEventListener("click", () => {
            setTimeout(() => {
                modal.appendChild(modalDiv);

                const noModal = document.querySelector(".eCzJv");
                noModal.addEventListener("click", () => {
                    modal.removeChild(modalDiv);
                });
            }, 300); // 1000 밀리초 = 1초
        });
        // ? 버튼을 눌렀을 때 모달창이 열리고, 모달창 이외 부분을 누르면 모달창이 닫히게 작동

        // 최신 일반피드 같이해요  버튼을 눌렀을 때 바탕색과 글자색이 반대로 바뀌도록 함
        const allFeed = document.querySelectorAll(".FeedTypeSelectContainer__FeedTypeBox-vw6f0f-2");
        allFeed.forEach((feed) => {
            feed.addEventListener("click", () => {
                allFeed.forEach((e) => {
                    e.classList.remove("cvOXoA");
                    e.classList.add("hCxIri");
                });
                feed.classList.remove("hCxIri");
                feed.classList.add("cvOXoA");
            });
        });
        // 최신 일반피드 같이해요  버튼을 눌렀을 때 바탕색과 글자색이 반대로 바뀌도록 함

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
        const leftButton1 = document.querySelectorAll(".slick-arrow.slick-prev");
        const rightButton1 = document.querySelectorAll(".slick-arrow.slick-next");
        let numberOfImages = 6; // 서버에서 받아와야 할 값

        leftButton1.forEach((button) => {
            button.addEventListener("click", (e) => {
                // 부모 찾기
                const group = e.target.closest(".cyQYNE");
                // 움직일 판 찾기
                const slickTrack = group.querySelector(".slick-track");
                // 이미지 아래 동그란 버튼 컨테이너 가져오기
                const roundButtons = group.querySelectorAll(".slick-dots li");
                // 왼쪽으로 더 갈 곳이 있는지 확인하기 위해 현재 인덱스 찾기
                const currentActive = group.querySelector(".slick-active.slick-current");
                let currentIndex = parseInt(currentActive.getAttribute("data-index"), 10);
                if (currentIndex > 0) {
                    // 액티브 인덱스 해제하기
                    currentActive.classList.remove("slick-active", "slick-current");
                    currentActive.setAttribute("aria-hidden", "true");
                    // 라운드 버튼 바탕색 변경
                    roundButtons[currentIndex].classList.remove("slick-active");

                    // 액티브 인덱스 새로 지정하기
                    currentIndex -= 1;
                    const nextActive = group.querySelector(`.slick-track div[data-index="${currentIndex}"]`);
                    nextActive.classList.add("slick-active", "slick-current");
                    nextActive.setAttribute("aria-hidden", "false");
                    // 라운드 버튼 바탕색 변경
                    roundButtons[currentIndex].classList.add("slick-active");
                    // 판 움직이기

                    slickTrack.style.transform = `translate3d(-${currentIndex * 344}px, 0, 0)`;
                }
            });
        });

        rightButton1.forEach((button) => {
            button.addEventListener("click", (e) => {
                // 부모 찾기
                const group = e.target.closest(".cyQYNE");
                // 움직일 판 찾기
                const slickTrack = group.querySelector(".slick-track");
                // 이미지 아래 동그란 버튼 컨테이너 가져오기
                const roundButtons = group.querySelectorAll(".slick-dots li");
                // 오른쪽으로 더 갈 곳이 있는지 확인하기 위해 현재 인덱스 찾기
                const currentActive = group.querySelector(".slick-active.slick-current");
                let currentIndex = parseInt(currentActive.getAttribute("data-index"), 10);
                if (currentIndex < numberOfImages - 1) {
                    // 액티브 인덱스 해제하기
                    currentActive.classList.remove("slick-active", "slick-current");
                    currentActive.setAttribute("aria-hidden", "true");
                    // 라운드 버튼 바탕색 변경
                    roundButtons[currentIndex].classList.remove("slick-active");

                    // 액티브 인덱스 새로 지정하기
                    currentIndex += 1;
                    const nextActive = group.querySelector(`.slick-track div[data-index="${currentIndex}"]`);
                    nextActive.classList.add("slick-active", "slick-current");
                    nextActive.setAttribute("aria-hidden", "false");
                    // 라운드 버튼 바탕색 변경
                    roundButtons[currentIndex].classList.add("slick-active");

                    // 판 움직이기
                    slickTrack.style.transform = `translate3d(-${currentIndex * 344}px, 0, 0)`;
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
                buttonSlickTrack.style.transform = `translate3d(-${index * 344}px, 0, 0)`;

                // slick track의 같은 index에 "slick-active", "slick-current" 설정하고 나머지 인텍스에서는 해제
                // 이 설정을 해줘야 오른쪽 왼쪽 버튼 클릭시 이미지 위치를 찾을 수 있음.
                // 기존 액티브 해제
                buttonSlickTrack.querySelector(".slick-active.slick-current").setAttribute("aria-hidden", "true");
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

        // 플로팅 메인 버튼 클릭
        const floatingButton = document.querySelector(".deuIuC button");
        const floatingButtonImage = document.querySelector(".deuIuC img");
        // const floatingDiv = document.querySelector(".cKSiZ");
        const background = document.querySelector(".FloatingButtonContainer__OpacityWrapper-sc-2a5rdx-0");
        const newFloatingElement = document.createElement("div");
        newFloatingElement.className = "FloatingButtonContainer__Wrapper-sc-2a5rdx-1 cKSiZ";
        newFloatingElement.innerHTML = `<div class="FloatingButtonContainer__LayoutWrapper-sc-2a5rdx-2 dVevoI">
                <div height="154" class="FloatingButtonContainer__ButtonContainer-sc-2a5rdx-4 gxhAYe">
                    <span class="FloatingButtonContainer__FloatingText-sc-2a5rdx-3 iVoZrR">피드 작성</span>
                    <button class="FloatingButtonContainer__CustomButton-sc-2a5rdx-6 gfirQk">
                        <img src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.05405 17.1515C2.26697 16.8797 1 15.2533 1 13.3867V6.3645C1 4.49667 2.26697 2.87034 4.05405 2.5985C6.64779 2.20417 9.30133 2 12 2C14.6592 1.99914 17.3149 2.19917 19.9459 2.5985C21.733 2.87034 23 4.4955 23 6.3645V13.3855C23 15.2545 21.733 16.8797 19.9459 17.1515C18.741 17.3347 17.5226 17.477 16.2928 17.5773C15.7671 17.6193 15.2853 17.904 14.992 18.359L12 23L9.008 18.359C8.71467 17.904 8.23292 17.6193 7.70718 17.5762C6.47744 17.477 5.25897 17.3347 4.05405 17.1515ZM6.27219 11.4231C7.13493 11.4231 7.83432 10.6998 7.83432 9.80769C7.83432 8.91554 7.13493 8.19231 6.27219 8.19231C5.40945 8.19231 4.71006 8.91554 4.71006 9.80769C4.71006 10.6998 5.40945 11.4231 6.27219 11.4231ZM13.5621 9.80769C13.5621 10.6998 12.8627 11.4231 12 11.4231C11.1373 11.4231 10.4379 10.6998 10.4379 9.80769C10.4379 8.91554 11.1373 8.19231 12 8.19231C12.8627 8.19231 13.5621 8.91554 13.5621 9.80769ZM17.7278 11.4231C18.5905 11.4231 19.2899 10.6998 19.2899 9.80769C19.2899 8.91554 18.5905 8.19231 17.7278 8.19231C16.8651 8.19231 16.1657 8.91554 16.1657 9.80769C16.1657 10.6998 16.8651 11.4231 17.7278 11.4231Z' fill='white'/%3E %3C/svg%3E" alt="feed medium icon">
                    </button>
                </div>
                <div height="94" class="FloatingButtonContainer__ButtonContainer-sc-2a5rdx-4 hgQSOS">
                    <span class="FloatingButtonContainer__FloatingText-sc-2a5rdx-3 iVoZrR">리얼후기 작성</span>
                    <button class="FloatingButtonContainer__CustomButton-sc-2a5rdx-6 gfirQk">
                        <img src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M9.07668 1.21993C9.41827 0.398635 10.5817 0.398636 10.9233 1.21993L12.9395 6.06735C13.0835 6.41358 13.4091 6.65015 13.7829 6.68012L19.0161 7.09966C19.9027 7.17074 20.2623 8.27725 19.5867 8.85592L15.5996 12.2713C15.3148 12.5153 15.1904 12.8981 15.2774 13.2628L16.4956 18.3695C16.702 19.2348 15.7607 19.9186 15.0016 19.455L10.5213 16.7184C10.2012 16.5229 9.79876 16.5229 9.47875 16.7184L4.9984 19.455C4.2393 19.9186 3.29805 19.2348 3.50444 18.3695L4.72257 13.2628C4.80958 12.8981 4.68521 12.5153 4.40042 12.2713L0.413277 8.85592C-0.26226 8.27725 0.0972674 7.17074 0.983922 7.09966L6.21712 6.68012C6.59091 6.65015 6.91652 6.41358 7.06052 6.06735L9.07668 1.21993Z' fill='white'/%3E %3C/svg%3E" alt="star medium icon">
                    </button>
                </div>
            </div>`;

        floatingButton.addEventListener("click", () => {
            const floatingDivs = document.querySelectorAll(".cKSiZ");
            if (floatingDivs.length === 1) {
                // 바탕화면 색 바꿔주기
                background.classList.remove("crTraU");
                background.classList.add("sqYFU");
                // 메인 버튼 돌려주기
                floatingButtonImage.classList.remove("dOakzT");
                floatingButtonImage.classList.add("kWbdK");
                // 플로팅 버튼 2개 추가로 보여주기
                floatingDivs[0].parentNode.insertBefore(newFloatingElement, floatingDivs[0]);
            } else {
                // 바탕화면 원상복구
                background.classList.remove("sqYFU");
                background.classList.add("crTraU");
                // 메인 버튼 원상 복구
                floatingButtonImage.classList.remove("kWbdK");
                floatingButtonImage.classList.add("dOakzT");
                // 새로 띄운 플로팅 버튼 삭제하기
                floatingDivs[0].parentNode.removeChild(floatingDivs[0]);
            }
        });
        // 플로팅 메인 버튼 클릭
    } else {
        // 화면 사이즈가 412 이하 일 때
        // ? 버튼을 눌렀을 때 모달창이 열리고, 모달창 이외 부분을 누르면 모달창이 닫히게 작동
        const questionButton = document.querySelector("#mobile .eWCRmm");
        const modal = document.querySelector("#modal-root");
        const modalDiv = document.createElement("div");
        modalDiv.innerHTML = `<div class="ActionSheet__Container-akkdcx-0 jgFMVr">
        <div class="ActionSheet__Content-akkdcx-2 cyEVkt"><header class="ActionSheet__Header-akkdcx-3 dNCiPY">
        </header><header class="Ver4__TitleVer4-d1i4tu-0 kNwzQK">피커스 피드란?</header>
        <div class="WhatIsActionSheet__Body-sc-10e5q0f-0 cblWvR">
        <strong class="WhatIsActionSheet__Summary-sc-10e5q0f-1 bAnoxg">피드를 통해 나를 표현하고 
        <span role="img" aria-label="sunglasses">😎</span><br>다른 크루들의 활동도 확인해보세요.</strong>
        <p class="WhatIsActionSheet__Description-sc-10e5q0f-2 dkImul">
        피커스에서 즐거웠고 행복했던 순간들을 후기로만 남기기엔 아쉬웠다면 피드로 다른 크루들에게 공유해 보세요. 
        그리고 다른 크루들의 의견 및 피드도 구경하세요.</p></div><img src="../../static/images/feeds/365535eb402ce8672ce933afcebe47b9.png" 
        class="WhatIsActionSheet__ImageBanner-sc-10e5q0f-4 kYigqi"></div>
        <div class="ActionSheet__Overlay-akkdcx-1 eCzJv"></div></div>`;

        questionButton.addEventListener("click", () => {
            setTimeout(() => {
                modal.appendChild(modalDiv);

                const noModal = document.querySelector(".eCzJv");
                noModal.addEventListener("click", () => {
                    modal.removeChild(modalDiv);
                });
            }, 300); // 1000 밀리초 = 1초
        });
        // ? 버튼을 눌렀을 때 모달창이 열리고, 모달창 이외 부분을 누르면 모달창이 닫히게 작동

        // 최신 일반피드 같이해요  버튼을 눌렀을 때 바탕색과 글자색이 반대로 바뀌도록 함
        const allFeed = document.querySelectorAll(".FeedTypeSelectContainer__FeedTypeBox-vw6f0f-2");
        allFeed.forEach((feed) => {
            feed.addEventListener("click", () => {
                allFeed.forEach((e) => {
                    e.classList.remove("cvOXoA");
                    e.classList.add("hCxIri");
                });
                feed.classList.remove("hCxIri");
                feed.classList.add("cvOXoA");
            });
        });
        // 최신 일반피드 같이해요  버튼을 눌렀을 때 바탕색과 글자색이 반대로 바뀌도록 함

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
        const leftButton1 = document.querySelectorAll(".slick-arrow.slick-prev");
        const rightButton1 = document.querySelectorAll(".slick-arrow.slick-next");
        let numberOfImages = 6; // 서버에서 받아와야 할 값

        leftButton1.forEach((button) => {
            button.addEventListener("click", (e) => {
                // 부모 찾기
                const group = e.target.closest(".cyQYNE");
                // 움직일 판 찾기
                const slickTrack = group.querySelector(".slick-track");
                // 이미지 아래 동그란 버튼 컨테이너 가져오기
                const roundButtons = group.querySelectorAll(".slick-dots li");
                // 왼쪽으로 더 갈 곳이 있는지 확인하기 위해 현재 인덱스 찾기
                const currentActive = group.querySelector(".slick-active.slick-current");
                let currentIndex = parseInt(currentActive.getAttribute("data-index"), 10);
                if (currentIndex > 0) {
                    // 액티브 인덱스 해제하기
                    currentActive.classList.remove("slick-active", "slick-current");
                    currentActive.setAttribute("aria-hidden", "true");
                    // 라운드 버튼 바탕색 변경
                    roundButtons[currentIndex].classList.remove("slick-active");

                    // 액티브 인덱스 새로 지정하기
                    currentIndex -= 1;
                    const nextActive = group.querySelector(`.slick-track div[data-index="${currentIndex}"]`);
                    nextActive.classList.add("slick-active", "slick-current");
                    nextActive.setAttribute("aria-hidden", "false");
                    // 라운드 버튼 바탕색 변경
                    roundButtons[currentIndex].classList.add("slick-active");
                    // 판 움직이기

                    slickTrack.style.transform = `translate3d(-${currentIndex * 344}px, 0, 0)`;
                }
            });
        });

        rightButton1.forEach((button) => {
            button.addEventListener("click", (e) => {
                // 부모 찾기
                const group = e.target.closest(".cyQYNE");
                // 움직일 판 찾기
                const slickTrack = group.querySelector(".slick-track");
                // 이미지 아래 동그란 버튼 컨테이너 가져오기
                const roundButtons = group.querySelectorAll(".slick-dots li");
                // 오른쪽으로 더 갈 곳이 있는지 확인하기 위해 현재 인덱스 찾기
                const currentActive = group.querySelector(".slick-active.slick-current");
                let currentIndex = parseInt(currentActive.getAttribute("data-index"), 10);
                if (currentIndex < numberOfImages - 1) {
                    // 액티브 인덱스 해제하기
                    currentActive.classList.remove("slick-active", "slick-current");
                    currentActive.setAttribute("aria-hidden", "true");
                    // 라운드 버튼 바탕색 변경
                    roundButtons[currentIndex].classList.remove("slick-active");

                    // 액티브 인덱스 새로 지정하기
                    currentIndex += 1;
                    const nextActive = group.querySelector(`.slick-track div[data-index="${currentIndex}"]`);
                    nextActive.classList.add("slick-active", "slick-current");
                    nextActive.setAttribute("aria-hidden", "false");
                    // 라운드 버튼 바탕색 변경
                    roundButtons[currentIndex].classList.add("slick-active");

                    // 판 움직이기
                    slickTrack.style.transform = `translate3d(-${currentIndex * 344}px, 0, 0)`;
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
                buttonSlickTrack.style.transform = `translate3d(-${index * 344}px, 0, 0)`;

                // slick track의 같은 index에 "slick-active", "slick-current" 설정하고 나머지 인텍스에서는 해제
                // 이 설정을 해줘야 오른쪽 왼쪽 버튼 클릭시 이미지 위치를 찾을 수 있음.
                // 기존 액티브 해제
                buttonSlickTrack.querySelector(".slick-active.slick-current").setAttribute("aria-hidden", "true");
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

        // 플로팅 메인 버튼 클릭
        const floatingButton = document.querySelector("#mobile .deuIuC button");
        const floatingButtonImage = document.querySelector("#mobile .deuIuC img");
        // const floatingDiv = document.querySelector(".cKSiZ");
        const background = document.querySelector("#mobile .FloatingButtonContainer__OpacityWrapper-sc-2a5rdx-0");
        const newFloatingElement = document.createElement("div");
        newFloatingElement.className = "FloatingButtonContainer__Wrapper-sc-2a5rdx-1 cKSiZ";
        newFloatingElement.innerHTML = `<div class="FloatingButtonContainer__LayoutWrapper-sc-2a5rdx-2 dVevoI">
                <div height="154" class="FloatingButtonContainer__ButtonContainer-sc-2a5rdx-4 gxhAYe">
                    <span class="FloatingButtonContainer__FloatingText-sc-2a5rdx-3 iVoZrR">피드 작성</span>
                    <button class="FloatingButtonContainer__CustomButton-sc-2a5rdx-6 gfirQk">
                        <img src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.05405 17.1515C2.26697 16.8797 1 15.2533 1 13.3867V6.3645C1 4.49667 2.26697 2.87034 4.05405 2.5985C6.64779 2.20417 9.30133 2 12 2C14.6592 1.99914 17.3149 2.19917 19.9459 2.5985C21.733 2.87034 23 4.4955 23 6.3645V13.3855C23 15.2545 21.733 16.8797 19.9459 17.1515C18.741 17.3347 17.5226 17.477 16.2928 17.5773C15.7671 17.6193 15.2853 17.904 14.992 18.359L12 23L9.008 18.359C8.71467 17.904 8.23292 17.6193 7.70718 17.5762C6.47744 17.477 5.25897 17.3347 4.05405 17.1515ZM6.27219 11.4231C7.13493 11.4231 7.83432 10.6998 7.83432 9.80769C7.83432 8.91554 7.13493 8.19231 6.27219 8.19231C5.40945 8.19231 4.71006 8.91554 4.71006 9.80769C4.71006 10.6998 5.40945 11.4231 6.27219 11.4231ZM13.5621 9.80769C13.5621 10.6998 12.8627 11.4231 12 11.4231C11.1373 11.4231 10.4379 10.6998 10.4379 9.80769C10.4379 8.91554 11.1373 8.19231 12 8.19231C12.8627 8.19231 13.5621 8.91554 13.5621 9.80769ZM17.7278 11.4231C18.5905 11.4231 19.2899 10.6998 19.2899 9.80769C19.2899 8.91554 18.5905 8.19231 17.7278 8.19231C16.8651 8.19231 16.1657 8.91554 16.1657 9.80769C16.1657 10.6998 16.8651 11.4231 17.7278 11.4231Z' fill='white'/%3E %3C/svg%3E" alt="feed medium icon">
                    </button>
                </div>
                <div height="94" class="FloatingButtonContainer__ButtonContainer-sc-2a5rdx-4 hgQSOS">
                    <span class="FloatingButtonContainer__FloatingText-sc-2a5rdx-3 iVoZrR">리얼후기 작성</span>
                    <button class="FloatingButtonContainer__CustomButton-sc-2a5rdx-6 gfirQk">
                        <img src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M9.07668 1.21993C9.41827 0.398635 10.5817 0.398636 10.9233 1.21993L12.9395 6.06735C13.0835 6.41358 13.4091 6.65015 13.7829 6.68012L19.0161 7.09966C19.9027 7.17074 20.2623 8.27725 19.5867 8.85592L15.5996 12.2713C15.3148 12.5153 15.1904 12.8981 15.2774 13.2628L16.4956 18.3695C16.702 19.2348 15.7607 19.9186 15.0016 19.455L10.5213 16.7184C10.2012 16.5229 9.79876 16.5229 9.47875 16.7184L4.9984 19.455C4.2393 19.9186 3.29805 19.2348 3.50444 18.3695L4.72257 13.2628C4.80958 12.8981 4.68521 12.5153 4.40042 12.2713L0.413277 8.85592C-0.26226 8.27725 0.0972674 7.17074 0.983922 7.09966L6.21712 6.68012C6.59091 6.65015 6.91652 6.41358 7.06052 6.06735L9.07668 1.21993Z' fill='white'/%3E %3C/svg%3E" alt="star medium icon">
                    </button>
                </div>
            </div>`;

        floatingButton.addEventListener("click", () => {
            const floatingDivs = document.querySelectorAll("#mobile .cKSiZ");
            if (floatingDivs.length === 1) {
                // 바탕화면 색 바꿔주기
                background.classList.remove("crTraU");
                background.classList.add("sqYFU");
                // 메인 버튼 돌려주기
                floatingButtonImage.classList.remove("dOakzT");
                floatingButtonImage.classList.add("kWbdK");
                // 플로팅 버튼 2개 추가로 보여주기
                floatingDivs[0].parentNode.insertBefore(newFloatingElement, floatingDivs[0]);
            } else {
                // 바탕화면 원상복구
                background.classList.remove("sqYFU");
                background.classList.add("crTraU");
                // 메인 버튼 원상 복구
                floatingButtonImage.classList.remove("kWbdK");
                floatingButtonImage.classList.add("dOakzT");
                // 새로 띄운 플로팅 버튼 삭제하기
                floatingDivs[0].parentNode.removeChild(floatingDivs[0]);
            }
        });
        // 플로팅 메인 버튼 클릭
    }
}

// 초기 로딩 시 실행
handleResize();

// 화면 크기 변경 시 실행
window.addEventListener("resize", handleResize);

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

document.querySelectorAll(".lhuZQo").forEach((imgContainer) => {
    imgContainer.addEventListener("click", (e) => {
        // 기본 정보 취득
        // 화면의 갯수
        const imgCount = e.currentTarget.closest(".Ratio-content").querySelectorAll(".lhuZQo").length;
        // 클릭된 화면의 인덱스
        var currentIndex = Array.from(e.currentTarget.closest(".Ratio-content").querySelectorAll(".lhuZQo")).indexOf(
            e.currentTarget
        );
        // 화면들의 src
        const imgArray = Array.from(e.currentTarget.closest(".Ratio-content").querySelectorAll(".csdcTT>img")).map(
            (img) => img.src
        );
        // console.log("imgCount " + imgCount + " currentIndex " + currentIndex + " imgArray " + imgArray.length);

        // 해당 img src 설정
        document.querySelector(".figure_10ki57k img").src = imgArray[currentIndex];
        document.querySelector("#img-modal").style.display = "";
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
    if (document.querySelector("#img-modal").style.display == "none") {
        document.querySelector("#img-modal").style.display = "";
    } else {
        document.querySelector("#img-modal").style.display = "none";
    }
});
