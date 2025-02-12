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
    if (startDate <= today) {
        // alert(`시작일("${startDate}")은 오늘("${today}") 이후만 가능합니다.`);
        let message = `시작일(${startDate})은 오늘(${today}) 이후만 가능합니다.`;
        showAlertModal(message);
        firstDate.value = "";
        startDate = 0;
    } else if (endDate != 0 && endDate < startDate) {
        // alert(`시작 날짜("${startDate}")가 종료 날짜("${endDate}") 보다 큽니다.`);
        secondDate.value = "";
        endDate = 0;
    } else if (deadline != 0 && deadline > startDate) {
        // alert(`시작 날짜("${startDate}")가 마감 날짜("${deadline}") 보다 작습니다.`);
        thirdDate.value = "";
        deadline = 0;
    }
});

secondDate.addEventListener("change", () => {
    endDate = secondDate.value;
    if (endDate <= today) {
        // alert(`종료일("${endDate}")은 오늘("${today}") 이후만 가능합니다.`);
        let message = `종료일(${endDate})은 오늘(${today}) 이후만 가능합니다.`;
        showAlertModal(message);
        secondDate.value = "";
        endDate = 0;
    } else if (deadline != 0 && deadline > endDate) {
        // alert(`종료 날짜("${endDate}")가 마감 날짜("${deadline}") 보다 작습니다.`);
        firstDate.value = "";
        thirdDate.value = "";
        startDate = 0;
        deadline = 0;
    } else if (startDate != 0 && startDate > endDate) {
        // alert(`종료 날짜("${endDate}")가 시작 날짜("${startDate}") 보다 작습니다.`);
        firstDate.value = "";
        startDate = 0;
    }
});

thirdDate.addEventListener("change", () => {
    deadline = thirdDate.value;
    if (deadline < today) {
        // alert(`마감일("${deadline}")은 오늘("${today}") 부터 가능합니다.`);
        let message = `마감일(${deadline})은 오늘(${today}) 부터 가능합니다.`;
        showAlertModal(message);
        thirdDate.value = "";
        deadline = 0;
    } else if (startDate != 0 && startDate <= deadline) {
        // alert(`마감일("${deadline}")이 시작일("${startDate}") 보다 작아야 합니다.`);
        let message = `마감일(${deadline})이 시작일(${startDate}) 보다 작아야 합니다.`;
        showAlertModal(message);
        thirdDate.value = "";
        deadline = 0;
    } else if (endDate != 0 && endDate <= deadline) {
        // alert(`마감일("${deadline}")이 종료일("${endDate}") 보다 작아야 합니다.`);
        let message = `마감일(${deadline})이 종료일(${endDate}) 보다 작아야 합니다.`;
        showAlertModal(message);
        thirdDate.value = "";
        deadline = 0;
    }
});

// 케밥버튼을 눌러서 시작일 부터 종료일까지 상세 일정 입력
const kebabmenu = document.querySelector(".FvtMb");
const numberOfPerson = document.querySelector(".NumberOfPerson");
const detailOfDateContainer = document.createElement("div");
detailOfDateContainer.className = "DetailOfDateContainer";

kebabmenu.addEventListener("click", () => {
    if (document.querySelector(".DetailOfDateContainer")) {
        document.querySelector(".DetailOfDateContainer").remove();
        return;
    }

    if (startDate == 0 || endDate == 0 || deadline == 0) {
        // alert(`날짜를 모두 입력하세요`);
        let message = `날짜를 모두 입력하세요`;
        showAlertModal(message);
        return;
    }

    detailOfDateContainer.innerHTML = `<p>계획서를 저장하시려면 입력창을 열어놓고 등록하세요.</p>`;
    const startDateConv = new Date(startDate); // 날짜 객체로 변환해야 계산이 가능함.
    const endDateConv = new Date(endDate);
    const days = Math.floor((endDateConv - startDateConv) / (1000 * 60 * 60 * 24)) + 1;
    for (let i = 0; i < days; i++) {
        detailOfDateContainer.innerHTML += ` <p>${i + 1}일차 계획서</p>
            <textarea data-index=${i} placeholder="상세 일정을 적어보세요 (아래 사진첨부로 대체 가능)"
            maxlength="1200"  class="Textarea__StyledTextarea-sc-1b9phu6-1 kmqQeBdetail"></textarea>
            <p class="Textarea__Count-sc-1b9phu6-2 jvAusQdetail">0 / 1200</p>`;
    }
    numberOfPerson.parentNode.insertBefore(detailOfDateContainer, numberOfPerson);

    // textarea에 글자 입력시 입력된 글자 수 보여주기
    document.querySelector(".DetailOfDateContainer").addEventListener("input", (e) => {
        if (e.target.classList.contains("kmqQeBdetail")) {
            e.target.nextElementSibling.textContent = `${e.target.value.length} / 1200 (추천 글자수: 30자 이내)`;
        }
    });
    // textarea에 글자 입력시 입력된 글자 수 보여주기
});
// 케밥버튼을 눌러서  시작일 부터 종료일까지 상세 일정 입력

// 포함 사항 불포함 사항 준비물 입력시 태그 생성
const gcqwwhinclude = document.querySelector(".gcqwwh.include"); // 포함 사항
const gcqwwhexclude = document.querySelector(".gcqwwh.exclude"); // 불포함 사항
const gcqwwhprepare = document.querySelector(".gcqwwh.prepare"); // 준비물
const bDBbNifirst = document.querySelector(".bDBbNifirst");
const bDBbNisecond = document.querySelector(".bDBbNisecond");
const bDBbNithird = document.querySelector(".bDBbNithird");

let firstTagCount = 0;
let secondTagCount = 0;
let thirdTagCount = 0;
let parentDiv = ``;
gcqwwhinclude.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        if (firstTagCount > 9) {
            // alert(`10개 까지만 입력 가능합니다.`);
            let message = `10개 까지만 입력 가능합니다.`;
            showAlertModal(message);
            return;
        }
        if (firstTagCount === 0) {
            bDBbNifirst.innerHTML = `<header class="Article__Header-sc-1mmkltm-0 gScFGo">
                                        <hgroup>
                                            <h2 class="Article__Title-sc-1mmkltm-1 bZNoYF">포함 사항</h2>
                                        </hgroup>
                                      </header>
                                      <div class="Stuff__StuffContainer-sc-8zlrc8-0 iXEvmI"></div>`;
        }

        parentDiv = bDBbNifirst.querySelector(".iXEvmI");
        const firstchildDiv = document.createElement("div");
        firstchildDiv.className = "Tag__RoundTag-sxb61j-1 jXxsiv";
        firstchildDiv.innerHTML = `<span>#${gcqwwhinclude.value}</span>
                     <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E %3Cg fill='none' fill-rule='nonzero' stroke='%23999' stroke-linecap='square'%3E %3Cpath d='M11.828 6.172l-5.656 5.656M11.828 11.828L6.172 6.172'/%3E %3C/g%3E %3C/svg%3E" alt="delete tags item">`;
        parentDiv.appendChild(firstchildDiv);
        gcqwwhinclude.value = "";

        firstTagCount += 1;
        gcqwwhinclude.placeholder = `포함 사항 (${firstTagCount}/10)`;
    }
});

gcqwwhexclude.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        if (secondTagCount > 9) {
            // alert(`10개 까지만 입력 가능합니다.`);
            let message = `10개 까지만 입력 가능합니다.`;
            showAlertModal(message);
            return;
        }
        if (secondTagCount === 0) {
            bDBbNisecond.innerHTML = `<header class="Article__Header-sc-1mmkltm-0 gScFGo">
                                        <hgroup>
                                            <h2 class="Article__Title-sc-1mmkltm-1 bZNoYF">불포함 사항</h2>
                                        </hgroup>
                                      </header>
                                      <div class="Stuff__StuffContainer-sc-8zlrc8-0 iXEvmI"></div>`;
        }

        parentDiv = bDBbNisecond.querySelector(".iXEvmI");
        const secondchildDiv = document.createElement("div");
        secondchildDiv.className = "Tag__RoundTag-sxb61j-1 eMLPLA";
        secondchildDiv.innerHTML = `<span>#${gcqwwhexclude.value}</span>
                     <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E %3Cg fill='none' fill-rule='nonzero' stroke='%23999' stroke-linecap='square'%3E %3Cpath d='M11.828 6.172l-5.656 5.656M11.828 11.828L6.172 6.172'/%3E %3C/g%3E %3C/svg%3E" alt="delete tags item">`;
        parentDiv.appendChild(secondchildDiv);
        gcqwwhexclude.value = "";

        secondTagCount += 1;
        gcqwwhexclude.placeholder = `불포함 사항 (${secondTagCount}/10)`;
    }
});

gcqwwhprepare.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        if (thirdTagCount > 9) {
            // alert(`10개 까지만 입력 가능합니다.`);
            let message = `10개 까지만 입력 가능합니다.`;
            showAlertModal(message);
            return;
        }
        if (thirdTagCount === 0) {
            bDBbNithird.innerHTML = `<header class="Article__Header-sc-1mmkltm-0 gScFGo">
                                        <hgroup>
                                            <h2 class="Article__Title-sc-1mmkltm-1 bZNoYF">준비물</h2>
                                        </hgroup>
                                      </header>
                                      <div class="Stuff__StuffContainer-sc-8zlrc8-0 iXEvmI"></div>`;
        }

        parentDiv = bDBbNithird.querySelector(".iXEvmI");
        const thirdchildDiv = document.createElement("div");
        thirdchildDiv.className = "Tag__RoundTag-sxb61j-1 eISlhn";
        thirdchildDiv.innerHTML = `<span>#${gcqwwhprepare.value}</span>
                     <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E %3Cg fill='none' fill-rule='nonzero' stroke='%23999' stroke-linecap='square'%3E %3Cpath d='M11.828 6.172l-5.656 5.656M11.828 11.828L6.172 6.172'/%3E %3C/g%3E %3C/svg%3E" alt="delete tags item">`;
        parentDiv.appendChild(thirdchildDiv);
        gcqwwhprepare.value = "";

        thirdTagCount += 1;
        gcqwwhprepare.placeholder = `준비물 (${thirdTagCount}/10)`;
    }
});

// 포함 사항 불포함 사항 준비물 입력시 태그 생성

// 태그의 이미지(x)를 눌렀을 때 div 삭제 :: 동적으로 생성된 요소일 때는 부모 요소에 위임
bDBbNifirst.addEventListener("click", (e) => {
    if (e.target.tagName == "IMG") {
        e.target.closest(".jXxsiv").remove();

        firstTagCount -= 1;
        if (firstTagCount === 0) {
            bDBbNifirst.innerHTML = ``;
        }
        gcqwwhinclude.placeholder = `포함 사항 (${firstTagCount}/10)`;
    }
});

bDBbNisecond.addEventListener("click", (e) => {
    if (e.target.tagName == "IMG") {
        e.target.closest(".eMLPLA").remove();

        secondTagCount -= 1;
        if (secondTagCount === 0) {
            bDBbNisecond.innerHTML = ``;
        }
        gcqwwhexclude.placeholder = `불포함 사항 (${secondTagCount}/10)`;
    }
});

bDBbNithird.addEventListener("click", (e) => {
    if (e.target.tagName == "IMG") {
        e.target.closest(".eISlhn").remove();

        thirdTagCount -= 1;
        if (thirdTagCount === 0) {
            bDBbNithird.innerHTML = ``;
        }
        gcqwwhprepare.placeholder = `준비물 (${thirdTagCount}/10)`;
    }
});
// 태그의 이미지(x)를 눌렀을 때 div 삭제 :: 동적으로 생성된 요소일 때는 부모 요소에 위임

// 태그의 text들을 서버로 보낼 배열에 담는 함수

function collectTexts(tagClassName) {
    const texts = [];
    const tagDivs = document.querySelectorAll(tagClassName);
    tagDivs.forEach((child) => {
        const span = child.querySelector("span");
        if (span) {
            texts.push(span.textContent);
        }
    });
    return texts;
}
// 태그의 text들을 서버로 보낼 배열에 담는 함수

// textarea에 글자 입력시 입력된 글자 수 보여주기
document.querySelector(".kmqQeB").addEventListener("input", (e) => {
    e.target.closest(".iFxPyq").querySelector(".jvAusQ").textContent = `${
        document.querySelector(".kmqQeB").value.length
    } / 1200 (추천 글자수: 30자 이내)`;
});
// textarea에 글자 입력시 입력된 글자 수 보여주기

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

// 모이는 장소 :: 카카오맵 처리하기
// 외부 스크립트 추가. 지도 맵 동적 생성
document.querySelector(".gcqwwh.gather").addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        if (document.querySelector("#mapContainer")) {
            document.querySelector("#mapContainer").remove();
            document.querySelector(".gcqwwh.gather1").remove();
        }

        let geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(document.querySelector(".gcqwwh.gather").value, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const mapDiv = document.createElement("div");
                mapDiv.id = "mapContainer";
                mapDiv.innerHTML = `<div id="map"></div>
                <div id="fullMap">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'%3E %3Cpath stroke='%23333' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M17 3h4v4M15 9l6-6M7 21H3v-4M9 15l-6 6M4 11V6c0-1.105.895-2 2-2h5M20 13v5c0 1.105-.895 2-2 2h-6'/%3E %3C/svg%3E" alt="map fullscreen">
                </div>`;
                // const mapDiv = document.createElement("div");
                // mapDiv.id = "map";
                document.querySelector(".GatheringPlace").appendChild(mapDiv);

                const mapInput = document.createElement("input");
                mapInput.className = "SocialRecruiteTagsContainer__SocialRecruiteTagsInput-sc-2762su-1 gcqwwh gather1";
                mapInput.placeholder = "참가자들이 이해하기 쉽게 설명해주세요";
                document.querySelector(".GatheringPlace").appendChild(mapInput);

                document.querySelector("#fullMap").addEventListener("click", (e) => {
                    if (mapContainer.style.position === "fixed") {
                        mapContainer.style.position = "relative";
                        mapContainer.style.width = "100%";
                        mapContainer.style.height = "25vh";
                        mapContainer.style.zIndex = ""; // 맵이 다른 요소 위에 오도록 설정한거 해제
                        document.querySelector("#fullMap").style.position = "absolute";
                    } else {
                        mapContainer.style.position = "fixed";
                        mapContainer.style.top = "0";
                        mapContainer.style.left = "0";
                        mapContainer.style.width = "100%";
                        mapContainer.style.height = "100vh";
                        mapContainer.style.zIndex = "1000"; // 맵이 다른 요소 위에 오도록 설정
                        document.querySelector("#fullMap").style.position = "fixed";
                    }
                    map.relayout();
                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                });

                let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                let mapContainer = document.getElementById("map"), // 지도를 표시할 div
                    mapOption = {
                        center: coords,
                        level: 3, // 지도의 확대 레벨
                    };
                // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
                let map = new kakao.maps.Map(mapContainer, mapOption);
                // 결과값으로 받은 위치를 마커로 표시합니다
                let marker = new kakao.maps.Marker({
                    map: map,
                    position: coords,
                });
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });
    }
});

// 모이는 장소 :: 카카오맵 처리하기

// 등록 하기
const jULzvQ = document.querySelector(".jULzvQ");

jULzvQ.addEventListener("click", () => {
    // 태그에 들어 온 텍스트 모으기 => 서버로 보내기 위해
    let tagClassName, texts;
    tagClassName = `.Tag__RoundTag-sxb61j-1.jXxsiv`;

    texts = collectTexts(tagClassName);
    console.log(texts.length);

    tagClassName = `.Tag__RoundTag-sxb61j-1.eMLPLA`;

    texts = collectTexts(tagClassName);
    console.log(texts.length);

    tagClassName = `.Tag__RoundTag-sxb61j-1.eISlhn`;

    texts = collectTexts(tagClassName);
    console.log(texts.length);

    let max = parseInt(document.querySelector(".gcqwwh.max").value, 10);
    let min = parseInt(document.querySelector(".gcqwwh.min").value, 10);
    if (max < min) {
        // alert(`모집 인원("${max}") 이 최소 출발 인원("${min})"보다 적습니다.`);
        let message = `모집 인원(${max} 명) 이 최소 출발 인원(${min} 명)보다 적습니다.`;
        showAlertModal(message);
        return;
    }
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
