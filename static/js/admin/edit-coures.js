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
        console.error("❌ 요소를 찾을 수 없습니다. 클래스명을 확인하세요.");
        return;
    }

    volunteerBox.addEventListener("change", function () {
        console.log("체크박스 상태:", this.checked); // 콘솔에서 체크 상태 확인

        if (this.checked) {
            durationContainer.classList.remove("hidden");
            durationContainer1.classList.remove("hidden");
            console.log(" 컨테이너 표시됨");
        } else {
            durationContainer.classList.add("hidden");
            durationContainer1.classList.add("hidden");
            console.log("❌ 컨테이너 숨겨짐");
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

// 지도 보여주기
var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(35.409476, 127.396059), // 지도의 중심좌표
        level: 9, // 지도의 확대 레벨
    };
let initialCenter = new kakao.maps.LatLng(35.409476, 127.396059);
var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

let tourSpots = [
    { name: "1. 허브마을 채마루", address: "남원시 원천로 37" },
    { name: "2. 광한루원", address: "남원시 요천로 1447" },
    { name: "3. 김병종미술관", address: "남원시 함파우길 65-14" },
    { name: "4. 지리산 허브밸리", address: "남원시 바래봉길 24" },
    { name: "5. 구서도역", address: "남원시 서도길 32" },
    { name: "6. 혼불문학관", address: "남원시 노봉안길52" },
];

let positions = [];
let geocoder = new kakao.maps.services.Geocoder();
let remains = tourSpots.length;
tourSpots.forEach((spot) => {
    geocoder.addressSearch(spot.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
            positions.push({
                content: "<div>" + spot.name + "</div>",
                latlng: new kakao.maps.LatLng(
                    Math.floor(result[0].y * 1000000) / 1000000,
                    Math.floor(result[0].x * 1000000) / 1000000
                ),
            });
        }
        // console.log(positions);
        remains--;
        if (remains < 1) {
            createMarkers();
            // position의 순서가 원래 입력된 순서가 아니기 때문에 원래
            positions.forEach((e) => {
                console.log(e.latlng);
                for (let i = 0; i < tourSpots.length; i++) {
                    if (
                        e.content.substring(5, e.content.length - 6) ==
                        tourSpots[i].name
                    ) {
                        tourSpots[i].latlng = e.latlng;
                    }
                }
            });
            drawLine();
        }
    });
});

function createMarkers() {
    for (var i = 0; i < positions.length; i++) {
        // 마커의 정보가 항상 나타나게
        var iwContent = `<div style="padding:5px;">${positions[i].content}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            iwPosition = positions[i].latlng, //인포윈도우 표시 위치입니다
            iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        // 인포윈도우를 생성하고 지도에 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
            map: map, // 인포윈도우가 표시될 지도
            position: iwPosition,
            content: iwContent,
            removable: iwRemoveable,
        });

        // // 마우스가 위치하면 나타났다가, 마우스가 없어지면 없어짐.
        // // 마커를 생성합니다
        // var marker = new kakao.maps.Marker({
        //     map: map, // 마커를 표시할 지도
        //     position: positions[i].latlng, // 마커의 위치
        // });
        // console.log(marker.getPosition().toString());

        // // 마커에 표시할 인포윈도우를 생성합니다
        // var infowindow = new kakao.maps.InfoWindow({
        //     content: positions[i].content, // 인포윈도우에 표시할 내용
        // });
        // // console.log(infowindow.getContent());

        // // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // // 이벤트 리스너로는 클로저를 만들어 등록합니다
        // // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        // kakao.maps.event.addListener(marker, "mouseover", makeOverListener(map, marker, infowindow));
        // kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));
    }
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
function makeOverListener(map, marker, infowindow) {
    return function () {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
    return function () {
        infowindow.close();
    };
}
// 지도 보여주기

// 선을 그릴 위치 배열
let clickLine; // 마우스로 클릭한 좌표로 그려질 선 객체입니다
let distanceOverlay; // 선의 거리정보를 표시할 커스텀오버레이 입니다
let dots = []; // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.
var linePath = []; // 경로를 1개 ~ 끝까지 차례로 받을 배열
function drawLine() {
    tourSpots.forEach((tourSpot) => {
        linePath.push(tourSpot.latlng);

        // 클릭한 위치를 기준으로 선을 생성하고 지도위에 표시합니다
        clickLine = new kakao.maps.Polyline({
            map: map, // 선을 표시할 지도입니다
            path: linePath, // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: "#db4040", // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
        });

        // 클릭한 지점에 대한 정보를 지도에 표시합니다
        displayCircleDot(tourSpot.latlng, 0);
        let distance = (Math.round(clickLine.getLength()) / 1000).toFixed(1);
        let path = clickLine.getPath();
        displayCircleDot(tourSpot.latlng, distance);

        content = getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다

        // 그려진 선의 거리정보를 지도에 표시합니다
        showDistance(content, path[path.length - 1]);
    });
}

// 지점에 대한 정보 (동그라미와 다음 지점까지의 총거리)를 표출하는 함수입니다
function displayCircleDot(position, distance) {
    // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
    let circleOverlay = new kakao.maps.CustomOverlay({
        content: '<span class="dot"></span>',
        position: position,
        zIndex: 1,
    });

    // 지도에 표시합니다
    circleOverlay.setMap(map);
    if (distance > 0) {
        // 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
        let distanceOverlay = new kakao.maps.CustomOverlay({
            content:
                '<div class="dotOverlay">거리 <span class="number">' +
                distance +
                "</span>Km</div>",
            position: position,
            yAnchor: 2.2,
            zIndex: 2,
        });

        // 지도에 표시합니다
        distanceOverlay.setMap(map);
    }

    // 배열에 추가합니다
    dots.push({
        circle: circleOverlay,
        distance: distanceOverlay,
    });
}

// 선 그리기가 종료됐을 때 호출하여
// 그려진 선의 총거리 정보와 거리에 대한 도보, 자전거 시간을 계산하여
// HTML Content를 만들어 리턴하는 함수입니다
function getTimeHTML(distance) {
    // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
    let walkkTime = (distance / 0.067) | 0;
    let walkHour = "",
        walkMin = "";

    // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
    if (walkkTime > 60) {
        walkHour =
            '<span class="number">' +
            Math.floor(walkkTime / 60) +
            "</span>시간 ";
    }
    walkMin = '<span class="number">' + (walkkTime % 60) + "</span>분";

    // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
    let bycicleTime = (distance / 0.227) | 0;
    let bycicleHour = "",
        bycicleMin = "";

    // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
    if (bycicleTime > 60) {
        bycicleHour =
            '<span class="number">' +
            Math.floor(bycicleTime / 60) +
            "</span>시간 ";
    }
    bycicleMin = '<span class="number">' + (bycicleTime % 60) + "</span>분";

    // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
    let content = '<ul class="dotOverlay distanceInfo">';
    content += "    <li>";
    content +=
        '        <span class="label">총거리</span><span class="number">' +
        distance +
        "</span>Km";
    content += "    </li>";
    content += "    <li>";
    content += '        <span class="label">도보</span>' + walkHour + walkMin;
    content += "    </li>";
    content += "    <li>";
    content +=
        '        <span class="label">자전거</span>' + bycicleHour + bycicleMin;
    content += "    </li>";
    content += "</ul>";

    return content;
}

function showDistance(content, position) {
    if (distanceOverlay) {
        // 커스텀오버레이가 생성된 상태이면

        // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
        distanceOverlay.setPosition(position);
        distanceOverlay.setContent(content);
    } else {
        // 커스텀 오버레이가 생성되지 않은 상태이면

        // 커스텀 오버레이를 생성하고 지도에 표시합니다
        distanceOverlay = new kakao.maps.CustomOverlay({
            map: map, // 커스텀오버레이를 표시할 지도입니다
            content: content, // 커스텀오버레이에 표시할 내용입니다
            position: position, // 커스텀오버레이를 표시할 위치입니다.
            xAnchor: 0,
            yAnchor: -1,
            zIndex: 3,
        });
    }
}

// 화면 확장 축소
document.querySelector("#fullMap").addEventListener("click", (e) => {
    if (mapContainer.style.position === "fixed") {
        mapContainer.style.position = "relative";
        mapContainer.style.width = "100%";
        mapContainer.style.height = "40vh";
        mapContainer.style.zIndex = ""; // 맵이 다른 요소 위에 오도록 설정한거 해제
        document.querySelector("#fullMap").style.position = "absolute";
        // 지도의 중심을 새로운 좌표로 설정
        map.relayout();
        map.setCenter(initialCenter);
    } else {
        mapContainer.style.position = "fixed";
        mapContainer.style.top = "0";
        mapContainer.style.left = "0";
        mapContainer.style.width = "100%";
        mapContainer.style.height = "100vh";
        mapContainer.style.zIndex = "1000"; // 맵이 다른 요소 위에 오도록 설정
        document.querySelector("#fullMap").style.position = "fixed";
        // 지도의 중심을 새로운 좌표로 설정
        map.relayout();
        map.setCenter(initialCenter);
    }
});
// 화면 확장 축소

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

//  "저장" 버튼 클릭 이벤트
saveButton.removeEventListener("click", handleSaveClick);
saveButton.addEventListener("click", handleSaveClick);

//  "저장" 버튼 클릭 시 실행될 함수
function handleSaveClick() {
    if (saveButton.textContent.trim() === "저장") {
        let missingFields = [];
        if (saveButton.textContent.trim() === "저장") {
            //  "더보기 버튼" 비활성화 (봉사 코스 관련)
            moreButton.style.pointerEvents = "none";
            moreButton.style.opacity = "0.5";
        } else {
            //  "수정" 버튼 클릭 시 "더보기 버튼" 다시 활성화
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

        console.log(" 모든 필수 입력 완료");

        // 모든 입력창 비활성화 (저장 시)
        allInputs.forEach((input) => {
            input.disabled = true;
            input.style.backgroundColor = "rgba(211, 211, 211, 0.5)";
            input.style.cursor = "not-allowed";
        });

        // 삭제 버튼 비활성화 (주소 태그 삭제 방지)
        disableDeleteButtons(true);

        //  "추천 코스 작성" → "추천 코스 조회"로 변경
        courseTitle.textContent = "추천 코스 조회";

        //  "추천 코스를 소개해 주세요." 문구 제거
        courseDescription.style.display = "none";

        // "수정" 모드로 변경
        saveButton.querySelector(".Button_children__NzZlO").textContent =
            "수정";

        //  "임시 저장" 버튼 숨기기
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

        //  "추천 코스 수정"으로 변경
        courseTitle.textContent = "추천 코스 수정";

        //  "추천 코스를 소개해 주세요." 문구 다시 표시
        courseDescription.style.display = "block";

        // 버튼을 다시 "저장"으로 변경
        saveButton.querySelector(".Button_children__NzZlO").textContent =
            "저장";

        //  "임시 저장" 버튼 다시 표시
        tempSaveButton.style.display = "block";
    }
}

//  "삭제 버튼" 비활성화/활성화 함수
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

//  페이지 로드 시 초기 상태 설정
disableDeleteButtons(false);

//  삭제되었어도 수정 버튼이 항상 눌릴 수 있도록 보장
saveButton.disabled = false;
saveButton.style.opacity = "1";
saveButton.style.cursor = "pointer";

//  "임시 저장" 버튼 클릭 이벤트 함수
function handleTempSaveClick() {
    console.log(" 현재 버튼 상태:", tempSaveButton.textContent.trim());

    if (tempSaveButton.textContent.trim() === "임시 저장") {
        console.log(" 임시 저장 실행");

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
