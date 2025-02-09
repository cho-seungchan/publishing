// ? 버튼을 눌렀을 때 모달창이 열리고, 모달창 이외 부분을 누르면 모달창이 닫히게 작동
const questionButton = document.querySelector(".bSEWFr");
const modal = document.querySelector("#modal-root");
const modalDiv = document.createElement("div");
modalDiv.innerHTML = `<div class="ActionSheet__Container-akkdcx-0 jgFMVr">
        <div class="ActionSheet__Overlay-akkdcx-1 eCzJv"></div>
        <div class="ActionSheet__Content-akkdcx-2 cyEVkt">
            <header class="ActionSheet__Header-akkdcx-3 dNCiPY"></header>
            <header class="Ver4__TitleVer4-d1i4tu-0 kNwzQK">피드 유형</header>
            <div class="WhatIsFeedTypeActionSheet__Body-sc-1ifwafz-0 gKShYF">
                <div class="WhatIsFeedTypeActionSheet__InformationContainer-sc-1ifwafz-1 bwbCin">
                    <strong class="WhatIsFeedTypeActionSheet__Summary-sc-1ifwafz-2 bXAzoH">일반 피드</strong>
                    <p class="WhatIsFeedTypeActionSheet__Description-sc-1ifwafz-3 cDJNKc">
                        일상, 취미, 여행 등 다양한 주제에 대해 자유롭게 이야기하고, 다른 크루와 소통해 보세요.
                    </p>
                </div>
                <div style="width: 100%; border: 0.5px solid lightgray;"></div>
                <div class="WhatIsFeedTypeActionSheet__InformationContainer-sc-1ifwafz-1 bwbCin">
                    <strong class="WhatIsFeedTypeActionSheet__Summary-sc-1ifwafz-2 bXAzoH">같이해요</strong>
                    <p class="WhatIsFeedTypeActionSheet__Description-sc-1ifwafz-3 cDJNKc">
                        원하는 프립을 소개하고, 함께 할 크루를 찾아보세요. 새로운 인연을 만들며 다양한 경험을 해보세요.
                    </p>
                    <p class="WhatIsFeedTypeActionSheet__Comment-sc-1ifwafz-4 hDGrky">
                        #같이해요 태그가 자동 생성됩니다.
                    </p>
                </div>
            </div>
        </div>
    </div>`;

questionButton.addEventListener("click", () => {
    setTimeout(() => {
        modal.appendChild(modalDiv);

        const noModal = document.querySelector(".eCzJv"); // 모달창이 열렸을 때 생기는 요소이므로 EventListener 내에서 설정
        noModal.addEventListener("click", () => {
            modal.removeChild(modalDiv);
        });
    }, 300); // 1000 밀리초 = 1초
});

// ? 버튼을 눌렀을 때 모달창이 열리고, 모달창 이외 부분을 누르면 모달창이 닫히게 작동

// 일반피드 같이해요  버튼을 눌렀을 때 양쪽의 바탕색과 글자색이 반대로 바뀌도록 함
const generalFeed = document.querySelector("#general");
const togetherFeed = document.querySelector("#together");
const textarea = document.querySelector(".Textarea__StyledTextarea-sc-1b9phu6-1.kmqQeB");

generalFeed.addEventListener("click", () => {
    if (!generalFeed.classList.contains("ennMMJ")) {
        generalFeed.classList.remove("jkxdpP");
        generalFeed.classList.add("ennMMJ");
        togetherFeed.classList.remove("ennMMJ");
        togetherFeed.classList.add("jkxdpP");
        textarea.placeholder = "오늘 어떤 것을 경험하고 느끼셨나요?";
    }
});
togetherFeed.addEventListener("click", () => {
    if (!togetherFeed.classList.contains("ennMMJ")) {
        togetherFeed.classList.remove("jkxdpP");
        togetherFeed.classList.add("ennMMJ");
        generalFeed.classList.remove("ennMMJ");
        generalFeed.classList.add("jkxdpP");
        textarea.placeholder = "저랑 같이 피커스 하실래요?";
    }
});
// 일반피드 같이해요  버튼을 눌렀을 때 양쪽의 바탕색과 글자색이 반대로 바뀌도록 함

// textarea에 글자 입력시 입력된 글자 수 보여주기
document.querySelector(".kmqQeB").addEventListener("input", (e) => {
    e.target.closest(".iFxPyq").querySelector(".jvAusQ").textContent = `${
        document.querySelector(".kmqQeB").value.length
    } / 1200 (추천 글자수: 30자 이내)`;
});
// textarea에 글자 입력시 입력된 글자 수 보여주기

// 엔터키를 눌렀을 때 태그 생성
let tagCount = 0;
const tagParentDiv = document.querySelector(".bmexYY-container");
const tagInput = document.querySelector(".SocialFeedTagsContainer__SocialFeedTagsWrapper-sc-2762su-0.bmexYY input");
tagInput.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        if (tagCount > 9) {
            //alert(`10개 까지만 입력 가능합니다.`);
            showAlertModal(`10개 까지만 입력 가능합니다.`);
            return;
        }
        const tagChildDiv = document.createElement("div");
        tagChildDiv.className = "SocialFeedTagsContainer__TagsItemContainer-sc-2762su-2 bJjaqH";
        tagChildDiv.innerHTML = `<span>#${tagInput.value}</span>
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E %3Cg fill='none' fill-rule='nonzero' stroke='%23999' stroke-linecap='square'%3E %3Cpath d='M11.828 6.172l-5.656 5.656M11.828 11.828L6.172 6.172'/%3E %3C/g%3E %3C/svg%3E" alt="delete tags item">`;
        tagParentDiv.appendChild(tagChildDiv);
        tagInput.value = "";

        tagCount += 1;
        tagInput.placeholder = `태그를 입력 후 엔터를 누르면 태그가 생성돼요! (${tagCount}/10)`;
    }
});
// 엔터키를 눌렀을 때 태그 생성

// 태그의 이미지(x)를 눌렀을 때 div 삭제 :: 동적으로 생성된 요소일 때는 부모 요소에 위임
tagParentDiv.addEventListener("click", (e) => {
    if (e.target.tagName == "IMG") {
        e.target.closest(".SocialFeedTagsContainer__TagsItemContainer-sc-2762su-2").remove();

        tagCount -= 1;
        tagInput.placeholder = `태그를 입력 후 엔터를 누르면 태그가 생성돼요! (${tagCount}/10)`;
    }
});
// 태그의 이미지(x)를 눌렀을 때 div 삭제 :: 동적으로 생성된 요소일 때는 부모 요소에 위임

// 태그의 text들을 서버로 보낼 배열에 담는 함수
function collectTexts() {
    const texts = [];
    const tagChildDiv = document.querySelectorAll(".SocialFeedTagsContainer__TagsItemContainer-sc-2762su-2.bJjaqH");
    tagChildDiv.forEach((child) => {
        const span = child.querySelector("span");
        if (span) {
            texts.push(span.textContent);
        }
    });
    return texts;
}
// 태그의 text들을 서버로 보낼 배열에 담는 함수

// 서버에 올리지 않고 화면에 보이도록 처리
const fileParentDiv = document.querySelector(".ImageList-sc-9v1mt2-0.hGJMVS");
const fileInput = document.querySelector(".InputImageReview__Wrapper-sc-1oapt4s-0.ipbuZD input");

fileInput.addEventListener("change", (e) => {
    const files = e.target.files;

    Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileDiv = document.createElement("div");
            fileDiv.className = "ImageList__ImageWrapper-sc-9v1mt2-1 kZTsQf";
            fileDiv.innerHTML = `<div class="Image__Wrapper-v97gyx-0 gDuKGF"><div class="Ratio " style="display: block;">
                    <div class="Ratio-ratio " style="height: 0px; position: relative; width: 100%; padding-top: 100%;">
                    <div class="Ratio-content " style="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;">
                    <img src="${e.target.result}" alt="후기 이미지" class="Image__DefaultImage-v97gyx-3 hVNKgp"></div></div></div></div>
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E %3Cg fill='none' fill-rule='nonzero'%3E %3Cpath fill='%23FFF' fill-opacity='0' d='M0 0h18v18H0z'/%3E %3Cg stroke='%23FFF' stroke-linecap='square'%3E %3Cpath d='M11.828 6.172l-5.656 5.656M11.828 11.828L6.172 6.172'/%3E %3C/g%3E %3C/g%3E %3C/svg%3E" class="ImageList__IconDelete-sc-9v1mt2-2 benIbu">`;

            fileParentDiv.appendChild(fileDiv);
        };
        // 파일 읽기 시작 (중요)
        reader.readAsDataURL(file);
    });
});
// 서버에 올리지 않고 화면에 보이도록 처리

// 선택파일의 이미지(x)를 눌렀을 때 전체 dev 삭제 :: 동적으로 생성된 요소일 때는 부모 요소에 위임
fileParentDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("ImageList__IconDelete-sc-9v1mt2-2")) {
        e.target.closest(".ImageList__ImageWrapper-sc-9v1mt2-1").remove();
    }
});
// 선택파일의 이미지(x)를 눌렀을 때 전체 dev 삭제 :: 동적으로 생성된 요소일 때는 부모 요소에 위임

const jULzvQ = document.querySelector(".jULzvQ");

jULzvQ.addEventListener("click", () => {
    const texts = collectTexts();
    console.log(texts.length);
});

// 모달 열기 함수
function showAlertModal(message) {
    // 모달 요소
    var modal = document.getElementById("alertModal");
    // 모달 닫기 요소
    var closeBtn = document.getElementsByClassName("close")[0];

    modal.querySelector("p").textContent = message;

    modal.style.display = "block";

    // 닫기 버튼 클릭 시 모달 닫기
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    // 모달 외부 클릭 시 모달 닫기
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}
