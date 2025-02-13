let menuBtn = document.querySelector(".AppLayout_expandNavButton__NTEwM");
let nav = document.querySelector(".AppNavbarLayout_container__NmY5O");

menuBtn.addEventListener("click", function () {
    nav.classList.toggle("active");
});

let div = document.querySelector(".AppLayout_contents__YmI3N");
menuBtn.addEventListener("click", function () {
    div.classList.toggle("active");
});

menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle("active");
});

// ================================================================================

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

// ========================================================================

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
        const emValue = parseInt(
            e.target.closest("li").querySelector("em").textContent
        );

        swiperslides.forEach((e) => {
            e.classList.remove("on", "on1");
            e.querySelector("a").removeAttribute("title");

            if (parseInt(e.textContent) < emValue) {
                e.classList.add("on");
            }
        });

        e.target.closest("li").classList.add("on1");
        e.target
            .closest("li")
            .querySelector("a")
            .setAttribute("title", "선택됨");

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

        document
            .querySelector(".swiper-button-next")
            .classList.add("swiper-button-disabled");
        document
            .querySelector(".swiper-button-next")
            .setAttribute("aria-disabled", "true");
    }
    cosList.style.transform = `translate3d(${720 - rightEnd}px, 0, 0)`;
    document
        .querySelector(".swiper-button-prev")
        .classList.remove("swiper-button-disabled");
    document
        .querySelector(".swiper-button-prev")
        .setAttribute("aria-disabled", "false");
});

document.querySelector(".swiper-button-prev").addEventListener("click", (e) => {
    leftEnd -= 600;
    rightEnd -= 600;
    if (leftEnd < 0) {
        // 0 보다 오른쪽으로 못 가도록 막음
        rightEnd -= leftEnd;
        leftEnd = 0;

        document
            .querySelector(".swiper-button-prev")
            .classList.add("swiper-button-disabled");
        document
            .querySelector(".swiper-button-prev")
            .setAttribute("aria-disabled", "true");
    }
    cosList.style.transform = `translate3d(${-leftEnd}px, 0, 0)`;
    document
        .querySelector(".swiper-button-next")
        .classList.remove("swiper-button-disabled");
    document
        .querySelector(".swiper-button-next")
        .setAttribute("aria-disabled", "flase");
});
// 연관 관광지  버튼 클릭시 작동 3개씩 이동 600px, 디스플레이 720px
