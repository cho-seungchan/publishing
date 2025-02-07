// 사용자가 주소를 입력하는 입력 필드 선택
const inputField = document.querySelector(".gcqwwh.gather");

// 지도를 표시할 컨테이너 요소 선택
const mapContainerDiv = document.querySelector(".GatheringPlace");

// 입력된 주소를 태그 형태로 표시할 컨테이너 요소 선택
const tagContainer = document.querySelector(".bDBbNiforth");

// 추가된 태그 개수를 저장하는 변수 (최대 10개 제한을 위해 사용)
let tagCount = 0;

// 입력된 주소(태그)들을 저장하는 배열
let tagList = [];

// 지도에 표시된 마커 객체들을 저장하는 배열
let markers = [];

// 경로를 연결할 선 객체
let polyline = null;

// 카카오 지도 객체를 저장하는 변수
let map;
let distanceOverlay; // 거리 표시를 위한 커스텀 오버레이
let dots = []; // 경로상의 점들을 저장하는 배열

// ------------------- 지도 초기화 함수 -------------------
function initializeMap() {
    if (typeof kakao === "undefined" || !kakao.maps) {
        console.error(
            "카카오 지도 API가 로드되지 않았습니다. HTML에 스크립트를 추가하세요."
        );
        alert("카카오 지도 API가 로드되지 않았습니다. API 키를 확인하세요.");
        return;
    }

    if (!document.getElementById("map")) {
        // 지도 컨테이너가 존재하지 않으면 동적으로 생성
        const mapDiv = document.createElement("div");
        mapDiv.id = "map";
        mapDiv.style.width = "100%";
        mapDiv.style.height = "400px";
        mapContainerDiv.appendChild(mapDiv);
    }

    // 카카오 지도 객체 생성 및 초기 설정
    map = new kakao.maps.Map(document.getElementById("map"), {
        center: new kakao.maps.LatLng(37.5665, 126.978), // 서울 중심 좌표
        level: 9,
    });

    // 경로를 표시할 선 객체 생성
    polyline = new kakao.maps.Polyline({
        map: map,
        path: [],
        strokeWeight: 5,
        strokeColor: "#FF0000",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
    });
}

// 페이지가 로드될 때 지도 초기화 실행
initializeMap();

// ------------------- 거리 표시를 km 단위로 변경 -------------------
function formatDistance(distance) {
    if (distance >= 1000) {
        return (distance / 1000).toFixed(2) + " km";
    }
    return distance + " m";
}

// ------------------- 총 거리 입력 필드 업데이트 함수 -------------------
function updateTotalDistance(distance) {
    const totalDistanceInput = document.querySelector(
        "input.SocialRecruiteTagsContainer__SocialRecruiteTagsInput-sc-2762su-1.gcqwwh.max"
    );

    if (!totalDistanceInput) return; // 요소가 없으면 실행하지 않음

    totalDistanceInput.value = formatDistance(distance);
}

// ------------------- 주소 입력 이벤트 리스너 -------------------
inputField.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        // 사용자가 Enter 키를 눌렀을 때 실행
        if (
            typeof kakao === "undefined" ||
            !kakao.maps ||
            !kakao.maps.services
        ) {
            console.error("카카오 지도 서비스가 로드되지 않았습니다.");
            alert(
                "카카오 지도 API가 로드되지 않았습니다. API 키를 확인하세요."
            );
            return;
        }

        let geocoder = new kakao.maps.services.Geocoder(); // 카카오맵의 주소 검색 API 사용

        // 입력된 주소를 검색 (inputField.value는 사용자가 입력한 주소 문자열)
        geocoder.addressSearch(inputField.value, (result, status) => {
            console.log("Geocoder 응답 상태: ", status);
            if (status === kakao.maps.services.Status.OK && result.length > 0) {
                // 검색 성공 시 실행
                console.log("주소 검색 성공: ", result[0].address);

                // 검색된 주소 정보를 기반으로 태그 추가 및 지도에 마커 표시
                addTag(inputField.value, result[0].y, result[0].x);

                // 입력 필드 초기화
                inputField.value = "";
            } else {
                console.warn("유효하지 않은 주소");
                alert("유효한 주소를 입력해주세요."); // 주소 검색 실패 시 사용자 알림
            }
        });
    }
});

// ------------------- 태그 추가 함수 -------------------

function addTag(tagText, lat, lng) {
    if (tagList.length >= 10) {
        // ✅ tagCount 대신 tagList.length 사용
        alert("태그는 최대 10개까지만 추가할 수 있습니다.");
        return;
    }

    if (tagList.some((tag) => tag.name === tagText)) {
        alert("이미 추가된 주소입니다.");
        return;
    }

    // 객체 형태로 태그 추가
    let tagNumber = tagList.length + 1; // 순번 지정
    let newTag = { id: tagNumber, name: tagText, lat: lat, lng: lng };
    tagList.push(newTag);

    if (tagList.length === 1) {
        // ✅ 첫 번째 태그 추가 시 UI 생성
        tagContainer.innerHTML = `<header class="Article__Header-sc-1mmkltm-0 gScFGo">
                                    <hgroup>
                                        <h2 class="Article__Title-sc-1mmkltm-1 bZNoYF">추가한 경로</h2>
                                    </hgroup>
                                  </header>
                                  <div class="Stuff__StuffContainer-sc-8zlrc8-0 iXEvmI"></div>`;
    }

    renderTags(); // 태그 UI 갱신

    tagCount = tagList.length; // ✅ 배열 길이를 기반으로 카운트 업데이트
    inputField.value = "";
    inputField.placeholder = `경로를 입력하세요. (${tagCount}/10)`;

    addMarker(lat, lng, tagText);
}

//  태그 삭제 기능 (배열에서 제거 후 순서 다시 정렬)
function removeTag(tagId) {
    tagList = tagList.filter((tag) => tag.id !== tagId); // 해당 태그 삭제
    tagList.forEach((tag, index) => (tag.id = index + 1)); // 순번 재정렬

    tagCount = tagList.length; // ✅ 삭제 후 배열 길이 기반으로 카운트 업데이트
    renderTags(); // 태그 UI 갱신
}

// 태그 UI 갱신 함수
function renderTags() {
    let parentDiv = tagContainer.querySelector(".iXEvmI");
    parentDiv.innerHTML = ""; // 기존 태그 삭제 후 다시 그림

    tagList.forEach((tag) => {
        const tagDiv = document.createElement("div");
        tagDiv.className = "Tag__RoundTag-sxb61j-1 jXxsiv";
        tagDiv.innerHTML = `<span>#${tag.id}. ${tag.name}</span>
                             <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E %3Cpath d='M11.828 6.172l-5.656 5.656M11.828 11.828L6.172 6.172' stroke='%23999' stroke-linecap='square'/%3E %3C/svg%3E" 
                             alt="delete tag" onclick="removeTag(${tag.id})">`;

        parentDiv.appendChild(tagDiv);
    });

    inputField.placeholder = `경로를 입력하세요. (${tagList.length}/10)`; // ✅ tagCount 대신 tagList.length 사용
}

//  태그 및 좌표 정보 서버 전송 함수
function sendTagsToServer() {
    fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags: tagList }), // 객체 배열 전송
    })
        .then((response) => response.json())
        .then((data) => console.log("서버 응답:", data))
        .catch((error) => console.error("서버 전송 오류:", error));
}

// ------------------- 태그 삭제 이벤트 리스너 -------------------
function removeTag(tagId) {
    const tagIndex = tagList.findIndex((tag) => tag.id === tagId);
    if (tagIndex === -1) return;

    if (markers[tagIndex]) {
        markers[tagIndex].setMap(null);
        markers.splice(tagIndex, 1);
    }

    tagList.splice(tagIndex, 1);
    tagList.forEach((tag, index) => (tag.id = index + 1));
    tagCount = tagList.length;

    renderTags();
    inputField.placeholder = `경로를 입력하세요. (${tagCount}/10)`;

    // 새로운 경로 설정 및 거리 재계산
    let newPath = tagList.map((tag) => new kakao.maps.LatLng(tag.lat, tag.lng));
    polyline.setPath(newPath);

    // 기존 거리 정보 삭제 후 새 거리 표시
    deleteCircleDot();

    let newDistance = Math.round(polyline.getLength());
    if (newPath.length > 1) {
        showDistance(
            `<div class="dotOverlay" style="color:#CC0000; font-weight:bold;">총 거리: <span class="number">${newDistance}</span>m</div>`,
            newPath[newPath.length - 1]
        );
    }
}

// 클릭 지점에 대한 정보 (동그라미와 거리)를 지도에서 모두 제거하는 함수
function deleteCircleDot() {
    dots.forEach((dot) => {
        if (dot.circle) dot.circle.setMap(null);
        if (dot.distance) dot.distance.setMap(null);
    });
    dots = [];

    if (distanceOverlay) {
        distanceOverlay.setMap(null);
        distanceOverlay = null;
    }
}

// 클릭 지점에 대한 정보를 지도에 표시하는 함수
function displayCircleDot(position, distance) {
    let circleOverlay = new kakao.maps.CustomOverlay({
        content: '<span class="dot"></span>',
        position: position,
        zIndex: 1,
    });
    circleOverlay.setMap(map);

    if (distance > 0) {
        let distanceOverlay = new kakao.maps.CustomOverlay({
            content: `<div class="dotOverlay" style="color:#CC0000;">거리 <span class="number">${distance}</span>m</div>`,
            position: position,
            yAnchor: 2.2,
            zIndex: 2,
        });
        distanceOverlay.setMap(map);
        dots.push({ circle: circleOverlay, distance: distanceOverlay });
    }
}

// 거리 정보 표시 함수
function showDistance(content, position) {
    if (distanceOverlay) {
        distanceOverlay.setPosition(position);
        distanceOverlay.setContent(content);
    } else {
        distanceOverlay = new kakao.maps.CustomOverlay({
            map: map,
            content: content,
            position: position,
            xAnchor: 0,
            yAnchor: -1,
            zIndex: 3,
        });
    }
}

// ------------------- 지도에 마커 추가 및 경로 연결 함수 -------------------
function addMarker(lat, lng, content) {
    if (!map) {
        console.warn("지도가 아직 초기화되지 않음");
        return;
    }

    let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(lat, lng),
    });

    let infowindow = new kakao.maps.InfoWindow({
        content: `<div>${content}</div>`,
    });

    kakao.maps.event.addListener(marker, "mouseover", () =>
        infowindow.open(map, marker)
    );
    kakao.maps.event.addListener(marker, "mouseout", () => infowindow.close());

    markers.push(marker);
    map.setCenter(new kakao.maps.LatLng(lat, lng));

    let path = polyline.getPath();
    path.push(new kakao.maps.LatLng(lat, lng));
    polyline.setPath(path);

    // 거리 계산 및 거리 정보 추가 (km 단위 변환 포함)
    let distance = Math.round(polyline.getLength());
    let formattedDistance = formatDistance(distance);
    displayCircleDot(new kakao.maps.LatLng(lat, lng), distance);
    showDistance(
        `<div class="dotOverlay" style="color:#CC0000; font-weight:bold;">총 거리: <span class="number">${formattedDistance}</span></div>`,
        new kakao.maps.LatLng(lat, lng)
    );

    // 총 거리 입력 필드 업데이트
    updateTotalDistance(distance);
}
