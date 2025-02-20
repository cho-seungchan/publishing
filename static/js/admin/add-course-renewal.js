let menuBtn = document.querySelector(".AppLayout_expandNavButton__NTEwM");
let nav = document.querySelector(".AppNavbarLayout_container__NmY5O");

menuBtn.addEventListener("click", function () {
    nav.classList.toggle("active");
});

let div = document.querySelector(".AppLayout_contents__Nzg1Z");
menuBtn.addEventListener("click", function () {
    div.classList.toggle("active");
});

menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle("active");
});

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
        alert(`시작일("${startDate}")은 오늘("${today}") 이후만 가능합니다..`);
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
        alert(`종료일("${endDate}")은 오늘("${today}") 이후만 가능합니다.`);
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
        alert(`마감일("${deadline}")은 오늘("${today}") 부터 가능합니다.`);
        thirdDate.value = "";
        deadline = 0;
    } else if (startDate != 0 && startDate <= deadline) {
        alert(
            `마감일("${deadline}")이 시작일("${startDate}") 보다 작아야 합니다.`
        );
        thirdDate.value = "";
        deadline = 0;
    } else if (endDate != 0 && endDate <= deadline) {
        alert(
            `마감일("${deadline}")이 종료일("${endDate}") 보다 작아야 합니다.`
        );
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
        alert(`날짜를 모두 입력하세요`);
        return;
    }

    detailOfDateContainer.innerHTML = `<p>계획서를 저장하시려면 입력창을 열어놓고 등록하세요.</p>`;
    const startDateConv = new Date(startDate); // 날짜 객체로 변환해야 계산이 가능함.
    const endDateConv = new Date(endDate);
    const days =
        Math.floor((endDateConv - startDateConv) / (1000 * 60 * 60 * 24)) + 1;
    for (let i = 0; i < days; i++) {
        detailOfDateContainer.innerHTML += ` <p>${i + 1}일차 계획서</p>
            <textarea data-index=${i} placeholder="상세 일정을 적어보세요 (아래 사진첨부로 대체 가능)"
            maxlength="1200"  class="Textarea__StyledTextarea-sc-1b9phu6-1 kmqQeBdetail"></textarea>
            <p class="Textarea__Count-sc-1b9phu6-2 jvAusQdetail">0 / 1200</p>`;
    }
    numberOfPerson.parentNode.insertBefore(
        detailOfDateContainer,
        numberOfPerson
    );

    // textarea에 글자 입력시 입력된 글자 수 보여주기
    document
        .querySelector(".DetailOfDateContainer")
        .addEventListener("input", (e) => {
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
            alert(`10개 까지만 입력 가능합니다.`);
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
            alert(`10개 까지만 입력 가능합니다.`);
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
            alert(`10개 까지만 입력 가능합니다.`);
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

document.addEventListener("DOMContentLoaded", function () {
    const volunteerBox = document.querySelector(".volunteerBox");
    const durationContainer = document.querySelector(
        ".DurationOfTourContainer"
    );
    const durationContainer1 = document.querySelector(
        ".DurationOfTourContainer1"
    );

    if (!volunteerBox || !durationContainer || !durationContainer1) {
        console.error("요소를 찾을 수 없습니다. 클래스명을 확인하세요.");
        return;
    }

    volunteerBox.addEventListener("change", function () {
        console.log("체크박스 상태:", this.checked); // 콘솔에서 체크 상태 확인

        if (this.checked) {
            durationContainer.classList.remove("hidden");
            durationContainer1.classList.remove("hidden");
            console.log("컨테이너 표시됨");
        } else {
            durationContainer.classList.add("hidden");
            durationContainer1.classList.add("hidden");
            console.log("컨테이너 숨겨짐");
        }
    });
});

// 서버에 올리지 않고 화면에 보이도록 처리
const fileParentDiv = document.querySelector(".ImageList-sc-9v1mt2-0.hGJMVS");
const fileInput = document.querySelector(
    ".InputImageReview__Wrapper-sc-1oapt4s-0.ipbuZD input"
);

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

// ✅ 1. 카카오 지도 설정
var mapContainer = document.getElementById("map"),
    mapOption = {
        center: new kakao.maps.LatLng(35.409476, 127.396059),
        level: 9,
    };
var map = new kakao.maps.Map(mapContainer, mapOption);

let tourSpots = [];
let geocoder = new kakao.maps.services.Geocoder();
let clickLine;
let dotOverlays = [];
let textOverlays = [];
let totalDistanceOverlay;

// ✅ 총 거리 입력창 가져오기
const totalDistanceInput = document.querySelector(".max");

// ✅ HTML 요소 가져오기
const searchInput = document.querySelector(".noBtnStyle");
const destinationList = document.getElementById("destinationList");

// ✅ 주소 입력 이벤트 리스너 (중복 실행 방지)
function handleAddressEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addDestination();
    }
}

// ✅ X 버튼 이벤트 위임 (삭제 기능)
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("closeBtn")) {
        let index = event.target.dataset.index;
        removeDestination(index);
    }
});

// ✅ 지도에 표시할 말풍선(목적지 태그) 생성 함수
function createOverlayContent(spot, index) {
    return `<div class="dotOverlay addedDestination">
                <b>${spot.number}. ${spot.title}</b><br>
                ${spot.address}
                <img src="http://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif" 
                     class="closeBtn" 
                     data-index="${index}" 
                     style="cursor:pointer; vertical-align: middle; margin-left: 5px; margin-bottom: 2px; width: 14px; height: 14px;">
            </div>`;
}

// ✅ 목적지 리스트 UI에 추가하는 함수
function addDestinationToList(spot, index) {
    let listItem = document.createElement("li");
    listItem.style.display = "flex";
    listItem.style.justifyContent = "space-between";
    listItem.style.padding = "5px";
    listItem.style.borderBottom = "1px solid #ddd";

    let spotText = document.createElement("span");
    spotText.innerHTML = `<b>${spot.number}. ${spot.title}</b><br>${spot.address}`;
    spotText.style.cursor = "pointer";

    spotText.addEventListener("click", () => map.setCenter(spot.latlng));

    let deleteBtn = document.createElement("img");
    deleteBtn.src =
        "http://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif";
    deleteBtn.classList.add("closeBtn");
    deleteBtn.dataset.index = index;
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.marginLeft = "5px";
    deleteBtn.style.marginBottom = "2px";
    deleteBtn.style.width = "14px";
    deleteBtn.style.height = "14px";

    listItem.appendChild(spotText);
    listItem.appendChild(deleteBtn);
    destinationList.appendChild(listItem);
}

// ✅ 목적지 삭제 함수 (마지막 항목도 삭제 가능 & 번호 재정렬)
function removeDestination(index) {
    index = parseInt(index);

    if (index >= 0 && index < tourSpots.length) {
        // 지도에서 오버레이 및 라인 제거
        dotOverlays[index].setMap(null);
        textOverlays[index].setMap(null);

        // 배열에서도 삭제
        tourSpots.splice(index, 1);
        dotOverlays.splice(index, 1);
        textOverlays.splice(index, 1);

        // UI 목록에서도 삭제
        let listItems = document.querySelectorAll("#destinationList li");
        listItems[index].remove();

        // 📌 ✅ 삭제 후 번호 다시 정렬
        tourSpots.forEach((spot, i) => {
            spot.number = i + 1;
        });

        // 전체 UI 다시 렌더링 (정확한 번호 정렬 보장)
        refreshDestinationList();

        // 경로 업데이트
        updateRoute();
    }
}

// ✅ 목적지 목록 UI 새로고침 (번호 재정렬)
function refreshDestinationList() {
    destinationList.innerHTML = "";
    tourSpots.forEach((spot, index) => {
        addDestinationToList(spot, index);
    });
}

// ✅ 목적지 추가 함수
function addDestination() {
    if (tourSpots.length >= 10) {
        alert("목적지는 최대 10개까지만 추가할 수 있습니다! 🚫");
        return;
    }

    let inputAddress = searchInput.value.trim();
    if (!inputAddress) {
        alert("주소를 입력하세요!");
        return;
    }

    let tempAddress = inputAddress;
    searchInput.value = "";
    searchInput.placeholder = "제목을 입력하세요.";

    searchInput.removeEventListener("keypress", handleAddressEnter);
    searchInput.addEventListener("keypress", handleTitleEnter);

    setTimeout(() => {
        searchInput.focus();
    }, 10);

    function handleTitleEnter(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let inputTitle = searchInput.value.trim();
            if (!inputTitle) {
                alert("제목을 입력하세요!");
                return;
            }

            searchInput.value = "";
            searchInput.placeholder = "주소를 입력하세요.";
            searchInput.removeEventListener("keypress", handleTitleEnter);
            searchInput.addEventListener("keypress", handleAddressEnter);

            geocoder.addressSearch(tempAddress, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    let newLatLng = new kakao.maps.LatLng(
                        result[0].y,
                        result[0].x
                    );
                    let spotNumber = tourSpots.length + 1;

                    let newSpot = {
                        number: spotNumber,
                        title: inputTitle,
                        address: tempAddress,
                        latlng: newLatLng,
                    };

                    let index = tourSpots.length;
                    tourSpots.push(newSpot);

                    let dotOverlay = new kakao.maps.CustomOverlay({
                        content: `<span class="dot"></span>`,
                        position: newLatLng,
                        zIndex: 1,
                    });
                    dotOverlay.setMap(map);
                    dotOverlays.push(dotOverlay);

                    let textOverlay = new kakao.maps.CustomOverlay({
                        content: createOverlayContent(newSpot, index),
                        position: newLatLng,
                        yAnchor: 1.2,
                        zIndex: 2,
                    });
                    textOverlay.setMap(map);
                    textOverlays.push(textOverlay);

                    addDestinationToList(newSpot, index);
                    map.setCenter(newLatLng);
                    updateRoute();
                } else {
                    alert("🚫 주소를 찾을 수 없습니다. 다시 입력해주세요.");
                }
            });

            searchInput.value = "";
        }
    }
}

// ✅ 지도 경로 업데이트 (총 거리 정상 표시)
function updateRoute() {
    if (clickLine) clickLine.setMap(null);
    if (totalDistanceOverlay) totalDistanceOverlay.setMap(null);

    let linePath = tourSpots.map((spot) => spot.latlng);

    if (tourSpots.length === 0) {
        totalDistanceInput.value = "";
        return;
    }

    clickLine = new kakao.maps.Polyline({
        map: map,
        path: linePath,
        strokeWeight: 3,
        strokeColor: "#db4040",
        strokeOpacity: 1,
        strokeStyle: "solid",
    });

    let totalDistance = (clickLine.getLength() / 1000).toFixed(1);

    totalDistanceInput.value = `${totalDistance} km`;
}

// ✅ 중복 리스너 제거 후 다시 등록
searchInput.removeEventListener("keypress", handleAddressEnter);
searchInput.addEventListener("keypress", handleAddressEnter);

//================================================================================
//================================================================================
//================================================================================
// 저장/수정 버튼 요소 가져오기
const saveButton = document.querySelector(
    ".StoryFormPage_saveButtonWrapper__Y2FmO .Button_button__YmRmM"
);

// "더보기 버튼" 요소 가져오기
const moreButton = document.querySelector(".FvtMb");

// 임시저장 버튼 요소 가져오기
const tempSaveButton = document.querySelector(
    ".SaveButtonFooter_btnWrapper__ZTk3Z .Button_button__YmRmM"
);

// "추천 코스 작성" 제목 요소 가져오기
const courseTitle = document.querySelector(".FundingPage_title__YTViN");

// "추천 코스를 소개해 주세요." 문구 요소 가져오기
const courseDescription = document.querySelector(
    ".FundingPage_description__NDA1Z"
);

// "봉사 코스" 체크박스 요소 가져오기
const volunteerCheckbox = document.querySelector("#volunteerBox");

// 필수 입력 필드 가져오기 (주소 제외)
const requiredInputs = document.querySelectorAll(
    "input:not([type='date']):not(.include):not(.exclude):not(.prepare):not(.noBtnStyle), textarea"
);

// "주소를 입력하세요" 필드 및 태그 컨테이너 가져오기
const addressTagContainer = document.getElementById("destinationList");

// 봉사 코스가 체크된 경우 필수 입력될 날짜 필드 가져오기
const dateInputs = document.querySelectorAll(
    ".DurationOfTourContainer input[type='date']"
);

// 모든 입력 필드 가져오기 (비활성화/활성화 시 사용)
const allInputs = document.querySelectorAll("input, textarea, select");

// "저장" 버튼 클릭 이벤트
saveButton.removeEventListener("click", handleSaveClick);
saveButton.addEventListener("click", handleSaveClick);

// "저장" 버튼 클릭 시 실행될 함수
function handleSaveClick() {
    if (saveButton.textContent.trim() === "저장") {
        let missingFields = [];
        if (saveButton.textContent.trim() === "저장") {
            // "더보기 버튼" 비활성화 (봉사 코스 관련)
            moreButton.style.pointerEvents = "none";
            moreButton.style.opacity = "0.5";
        } else {
            // "수정" 버튼 클릭 시 "더보기 버튼" 다시 활성화
            moreButton.style.pointerEvents = "auto";
            moreButton.style.opacity = "1";
        }

        // 필수 입력 체크
        requiredInputs.forEach((input) => {
            if (input.type === "hidden" || input.type === "file") {
                return; // hidden 또는 file input은 필수 입력 체크에서 제외
            }

            if (input.value.trim() === "") {
                let fieldName =
                    input.placeholder || input.className || "입력 항목";
                missingFields.push(fieldName.replace(/_/g, " "));
            }
        });

        // "주소를 입력하세요" 필드에서 최소한 하나의 태그(목적지)가 추가되었는지 확인
        if (addressTagContainer.children.length === 0) {
            missingFields.push("주소를 입력하세요 (목적지를 추가해주세요)");
        }

        // "봉사 코스"가 체크된 경우, 날짜 필드도 필수 입력 체크
        if (volunteerCheckbox.checked) {
            dateInputs.forEach((input) => {
                if (input.value.trim() === "") {
                    missingFields.push(input.placeholder || "날짜 항목");
                }
            });
        }

        if (missingFields.length > 0) {
            alert(
                "다음 항목을 입력해야 합니다:\n\n- " +
                    missingFields.join("\n- ")
            );
            return;
        }

        console.log("모든 필수 입력 완료");

        // 모든 입력창 비활성화 (저장 시)
        allInputs.forEach((input) => {
            input.disabled = true;
            input.style.backgroundColor = "rgba(211, 211, 211, 0.5)";
            input.style.cursor = "not-allowed";
        });

        // 삭제 버튼 비활성화 (주소 태그 삭제 방지)
        disableDeleteButtons(true);

        // "추천 코스 작성" → "추천 코스 조회"로 변경
        courseTitle.textContent = "추천 코스 조회";

        // "추천 코스를 소개해 주세요." 문구 제거
        courseDescription.style.display = "none";

        // "수정" 모드로 변경
        saveButton.querySelector(".Button_children__NzZlO").textContent =
            "수정";

        // "임시 저장" 버튼 숨기기
        tempSaveButton.style.display = "none";
    } else {
        // "수정" 버튼 클릭 시 모든 입력 필드 활성화
        allInputs.forEach((input) => {
            input.disabled = false;
            input.style.backgroundColor = "";
            input.style.cursor = "text";
        });

        // 삭제 버튼 활성화 (주소 태그 삭제 가능)
        disableDeleteButtons(false);

        // "추천 코스 수정"으로 변경
        courseTitle.textContent = "추천 코스 수정";

        // "추천 코스를 소개해 주세요." 문구 다시 표시
        courseDescription.style.display = "block";

        // 버튼을 다시 "저장"으로 변경
        saveButton.querySelector(".Button_children__NzZlO").textContent =
            "저장";

        // "임시 저장" 버튼 다시 표시
        tempSaveButton.style.display = "block";
    }
}

// "삭제 버튼" 비활성화/활성화 함수
function disableDeleteButtons(disable) {
    document.querySelectorAll(".destination-tag .delete-btn").forEach((btn) => {
        if (disable) {
            btn.style.pointerEvents = "none"; // 삭제 버튼 클릭 불가능하게 설정
            btn.style.opacity = "0.5"; // 버튼이 흐리게 보이도록 조정
            btn.style.cursor = "not-allowed";
        } else {
            btn.style.pointerEvents = "auto"; // 삭제 버튼 클릭 가능하게 설정
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
        }
    });
}

// 페이지 로드 시 초기 상태 설정
disableDeleteButtons(false);

// 삭제되었어도 수정 버튼이 항상 눌릴 수 있도록 보장
saveButton.disabled = false;
saveButton.style.opacity = "1";
saveButton.style.cursor = "pointer";

// "임시 저장" 버튼 클릭 이벤트 함수
function handleTempSaveClick() {
    console.log("현재 버튼 상태:", tempSaveButton.textContent.trim());

    if (tempSaveButton.textContent.trim() === "임시 저장") {
        console.log("임시 저장 실행");

        // 모든 입력 필드를 비활성화 (임시 저장 시)
        allInputs.forEach((input) => {
            input.setAttribute("disabled", "true"); // 비활성화
            input.style.backgroundColor = "rgba(211, 211, 211, 0.5)";
            input.style.cursor = "not-allowed";
        });

        //  "임시 저장" 버튼을 "계속 작성"으로 변경
        tempSaveButton.innerHTML = `<span><span class="Button_children__NzZlO">계속 작성</span></span>`;

        //  "저장" 버튼 비활성화 (임시 저장 상태에서는 저장 불가능)
        saveButton.setAttribute("disabled", "true");
        saveButton.style.opacity = "0.5";
        saveButton.style.cursor = "not-allowed";
    } else {
        console.log(" 계속 작성 실행");

        // 모든 입력 필드를 다시 활성화
        allInputs.forEach((input) => {
            input.removeAttribute("disabled"); // 활성화
            input.style.backgroundColor = "";
            input.style.cursor = "text";
        });

        //  "계속 작성" 버튼을 다시 "임시 저장"으로 변경
        tempSaveButton.innerHTML = `<span><span class="Button_children__NzZlO">임시 저장</span></span>`;

        //  "저장" 버튼 다시 활성화
        saveButton.removeAttribute("disabled");
        saveButton.style.opacity = "1";
        saveButton.style.cursor = "pointer";
    }
}

//  기존 이벤트 리스너 제거 후 다시 추가하여 중복 실행 방지
tempSaveButton.removeEventListener("click", handleTempSaveClick);
tempSaveButton.addEventListener("click", handleTempSaveClick);
