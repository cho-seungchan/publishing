// 사용자가 주소를 입력하는 HTML 입력 필드 요소를 선택
const inputField = document.querySelector(".gcqwwh.gather");

// 지도를 표시할 컨테이너 요소 선택
const mapContainerDiv = document.querySelector(".GatheringPlace");

// 입력된 주소를 태그 형태로 표시할 컨테이너 요소 선택
const tagContainer = document.querySelector(".bDBbNiforth");

// 입력된 주소(태그)들을 저장할 배열
let tagList = [];

// 지도에 표시된 마커(위치 아이콘) 객체들을 저장할 배열
let markers = [];

// 지도 위에 표시할 경로(폴리라인) 객체 (초기값 null)
let polyline = null;

// 카카오 지도 객체를 저장할 변수
let map;

// 거리 표시를 위한 커스텀 오버레이 객체
let distanceOverlay;

// 지도 위의 거리 표시 점(클릭 지점)들을 저장하는 배열
let dots = [];

// ------------------- 지도 초기화 함수 -------------------
function initializeMap() {
    // 만약 카카오 맵 API가 로드되지 않았다면, 사용자에게 경고 메시지 표시
    if (typeof kakao === "undefined" || !kakao.maps) {
        alert("카카오 지도 API가 로드되지 않았습니다. API 키를 확인하세요.");
        return; // 함수 종료
    }

    // "map"이라는 id를 가진 요소가 존재하지 않으면, 동적으로 지도 컨테이너 생성
    if (!document.getElementById("map")) {
        const mapDiv = document.createElement("div"); // 새로운 div 요소 생성
        mapDiv.id = "map"; // id를 "map"으로 설정
        mapDiv.style.width = "100%"; // 너비 100%
        mapDiv.style.height = "400px"; // 높이 400px
        mapContainerDiv.appendChild(mapDiv); // mapContainerDiv에 추가
    }

    // 카카오 지도 객체 생성 및 초기 설정 (서울 중심 좌표, 줌 레벨 9)
    map = new kakao.maps.Map(document.getElementById("map"), {
        center: new kakao.maps.LatLng(37.5665, 126.978), // 서울 좌표
        level: 9, // 줌 레벨 (9는 광역 보기)
    });

    // 경로(폴리라인) 객체 생성 (비어 있는 상태)
    polyline = new kakao.maps.Polyline({
        map: map, // 지도에 표시
        path: [], // 초기 경로 없음
        strokeWeight: 5, // 선 두께
        strokeColor: "#FF0000", // 선 색상 (빨강)
        strokeOpacity: 0.7, // 선 투명도 (70%)
        strokeStyle: "solid", // 선 스타일 (실선)
    });
}

// 페이지가 로드될 때 지도 초기화 실행
initializeMap();

// ------------------- 거리 관련 함수 -------------------

// 거리 값을 받아서 km 또는 m 단위로 변환하는 함수
function formatDistance(distance) {
    return distance >= 1000 // 거리가 1000m 이상이면 km로 변환
        ? (distance / 1000).toFixed(2) + " km" // 소수점 2자리까지 표시
        : distance + " m"; // 1000m 미만이면 그대로 표시
}

// 총 거리 입력 필드 업데이트 함수
function updateTotalDistance() {
    // HTML에서 거리 정보를 입력받는 필드를 선택
    const totalDistanceInput = document.querySelector(
        "input.SocialRecruiteTagsContainer__SocialRecruiteTagsInput-sc-2762su-1.gcqwwh.max"
    );

    // 입력 필드가 존재하지 않으면 함수 종료
    if (!totalDistanceInput) return;

    // 현재 폴리라인(경로)의 총 길이를 가져와서 반올림한 후 입력 필드에 반영
    let distance = Math.round(polyline.getLength());
    totalDistanceInput.value = formatDistance(distance);
}

// ------------------- 지도 요소 초기화 (마커 & 거리) -------------------

// 지도에서 거리 표시 요소(오버레이, 점)를 모두 삭제하는 함수
function clearMapElements() {
    dots.forEach((dot) => {
        if (dot.circle) dot.circle.setMap(null); // 원형 점 제거
        if (dot.distance) dot.distance.setMap(null); // 거리 표시 제거
    });
    dots = []; // 배열 초기화

    if (distanceOverlay) {
        distanceOverlay.setMap(null); // 거리 오버레이 제거
        distanceOverlay = null; // 변수 초기화
    }
}

// ------------------- 폴리라인 및 거리 업데이트 -------------------

// 경로를 업데이트하고 총 거리를 갱신하는 함수
function updatePolylineAndDistance() {
    polyline.setPath([]); // 기존 경로 초기화
    let newPath = tagList.map((tag) => new kakao.maps.LatLng(tag.lat, tag.lng)); // 태그 리스트 기반 새 경로 생성
    polyline.setPath(newPath); // 경로 업데이트

    clearMapElements(); // 거리 표시 초기화
    updateTotalDistance(); // 거리 갱신

    // 경로가 1개 이상일 경우, 거리 정보 오버레이를 표시
    if (newPath.length > 1) {
        showDistance(
            `<div class="dotOverlay" style="color:#CC0000; font-weight:bold;">총 거리: <span class="number">${formatDistance(
                polyline.getLength()
            )}</span></div>`,
            newPath[newPath.length - 1]
        );
    }
}

// ------------------- 주소 입력 이벤트 리스너 -------------------

// 사용자가 엔터를 누르면 주소를 검색하고 태그로 추가하는 기능
if (inputField) {
    inputField.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            // 사용자가 Enter 키를 눌렀을 때 실행
            let geocoder = new kakao.maps.services.Geocoder(); // 카카오맵 주소 검색 API 사용

            // 입력된 주소를 검색
            geocoder.addressSearch(inputField.value, (result, status) => {
                if (
                    status === kakao.maps.services.Status.OK &&
                    result.length > 0
                ) {
                    addTag(inputField.value, result[0].y, result[0].x); // 태그 추가
                    inputField.value = ""; // 입력 필드 초기화
                } else {
                    alert("유효한 주소를 입력해주세요."); // 주소 검색 실패 시 경고
                }
            });
        }
    });
}

// ------------------- 태그 추가 함수 -------------------

function addTag(tagText, lat, lng) {
    // 태그 개수가 10개 이상이면 추가할 수 없음 (최대 10개 제한)
    if (tagList.length >= 10) {
        alert("태그는 최대 10개까지만 추가할 수 있습니다.");
        return; // 함수 종료
    }

    // tagList 배열에서 이미 동일한 이름을 가진 태그가 존재하는지 확인
    if (tagList.some((tag) => tag.name === tagText)) {
        alert("이미 추가된 주소입니다.");
        return; // 중복 태그 방지
    }

    // 새로운 태그 객체 생성 (순번, 태그명, 위도, 경도 포함)
    let tagNumber = tagList.length + 1; // 태그의 순번 (1부터 시작)
    let newTag = { id: tagNumber, name: tagText, lat: lat, lng: lng };

    // tagList 배열에 새로운 태그 추가
    tagList.push(newTag);

    // 태그가 첫 번째로 추가된 경우, UI에 "추가한 경로" 제목을 동적으로 생성
    if (tagList.length === 1) {
        tagContainer.innerHTML = `<header class="Article__Header-sc-1mmkltm-0 gScFGo">
                                    <hgroup>
                                        <h2 class="Article__Title-sc-1mmkltm-1 bZNoYF">추가한 경로</h2>
                                    </hgroup>
                                  </header>
                                  <li class="Stuff__StuffContainer-sc-8zlrc8-0 iXEvmI"></li>`;
    }

    renderTags(); // 태그 UI 갱신 (새 태그가 UI에 반영됨)

    tagCount = tagList.length; // 태그 개수 업데이트
    inputField.value = ""; // 입력 필드 초기화
    inputField.placeholder = `경로를 입력하세요. (${tagCount}/10)`; // 현재 추가된 태그 개수 표시

    addMarker(lat, lng, tagText); // 지도에 새로운 마커 추가
}

// ------------------- 태그 삭제 -------------------
function removeTag(tagId) {
    // tagList 배열에서 tagId와 일치하는 태그의 인덱스를 찾음
    const tagIndex = tagList.findIndex((tag) => tag.id === tagId);

    // 만약 찾지 못하면 (존재하지 않는 태그라면) 함수 종료
    if (tagIndex === -1) return;

    // 해당 태그를 tagList 배열에서 삭제
    tagList.splice(tagIndex, 1);

    // 삭제 후 남아있는 태그들의 id를 다시 정렬 (1부터 시작하도록)
    tagList.forEach((tag, index) => (tag.id = index + 1));

    // 지도에서 해당 마커 삭제
    if (markers[tagIndex]) {
        markers[tagIndex].setMap(null); // 지도에서 마커 숨기기
        markers.splice(tagIndex, 1); // markers 배열에서도 제거
    }

    renderTags(); // 태그 UI 갱신 (삭제 후 남아있는 태그들 반영)
    updatePolylineAndDistance(); // 지도 경로 및 거리 다시 계산
}

// ------------------- 태그 UI 렌더링 -------------------
// ---------------- 태그 UI에 "인근 여행지" & "사진 업로드" 기능 추가 ----------------
function renderTags() {
    let parentDiv = tagContainer.querySelector(".iXEvmI");

    if (!parentDiv) {
        parentDiv = document.createElement("ul");
        parentDiv.className = "iXEvmI";
        tagContainer.appendChild(parentDiv);
    }

    const tagDiv = document.createElement("li");
    tagDiv.className = "Tag__RoundTag-sxb61j-1 jXxsiv";
    tagDiv.innerHTML = `
        <span>#${tagList.length}. ${tagList[tagList.length - 1].name}</span>
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E 
        %3Cpath d='M11.828 6.172l-5.656 5.656M11.828 11.828L6.172 6.172' stroke='%23999' stroke-linecap='square'/%3E %3C/svg%3E" 
        alt="delete tag" onclick="event.stopPropagation(); removeTag(${
            tagList[tagList.length - 1].id
        })">
    `;

    const detailsDiv = document.createElement("div");
    detailsDiv.className = "tag-details";
    detailsDiv.style.display = "none";
    detailsDiv.innerHTML = `
        <ul class="nearby-list" id="nearby-list-${tagList.length}"></ul>
        <input type="text" class="nearby-input" placeholder="인근 여행지를 입력하세요" 
            onkeydown="if(event.key==='Enter') addNearby(${tagList.length}, this)" onclick="event.stopPropagation();">
        <div class="upload-container">
            <input type="file" id="upload-${tagList.length}" accept="image/*" multiple 
                onchange="uploadImages(${tagList.length}, this)" onclick="event.stopPropagation();">
            <div id="image-preview-${tagList.length}"></div>
        </div>
    `;

    tagDiv.addEventListener("click", (event) => {
        if (
            event.target.tagName !== "INPUT" &&
            event.target.tagName !== "FILE"
        ) {
            detailsDiv.style.display =
                detailsDiv.style.display === "block" ? "none" : "block";
        }
    });

    tagDiv.appendChild(detailsDiv);
    parentDiv.appendChild(tagDiv);

    renderNearby(tagList.length);
    inputField.placeholder = `경로를 입력하세요. (${tagList.length}/10)`;
}

// ------------------- 지도에 마커 추가 -------------------
function addMarker(lat, lng, content) {
    // 카카오 지도 API를 사용하여 새로운 마커 객체 생성
    let marker = new kakao.maps.Marker({
        map, // 마커를 표시할 지도 객체
        position: new kakao.maps.LatLng(lat, lng), // 마커의 위치 (위도, 경도)
    });

    // 마커에 마우스를 올리면 나타나는 정보 창 생성
    let infowindow = new kakao.maps.InfoWindow({
        content: `<div>${content}</div>`, // 정보 창에 표시할 내용
    });

    // 마커에 마우스를 올리면 정보 창 열기
    kakao.maps.event.addListener(marker, "mouseover", () =>
        infowindow.open(map, marker)
    );

    // 마커에서 마우스를 떼면 정보 창 닫기
    kakao.maps.event.addListener(marker, "mouseout", () => infowindow.close());

    markers.push(marker); // markers 배열에 마커 추가 (나중에 삭제할 때 사용)
    map.setCenter(new kakao.maps.LatLng(lat, lng)); // 지도 중심을 새 마커 위치로 이동

    // 폴리라인(경로) 업데이트
    let path = polyline.getPath(); // 기존 경로 가져오기
    path.push(new kakao.maps.LatLng(lat, lng)); // 새로운 좌표 추가
    polyline.setPath(path); // 변경된 경로 적용

    updatePolylineAndDistance(); // 거리 및 지도 UI 업데이트
}

// ------------------- 거리 표시 -------------------
function showDistance(content, position) {
    // 기존 거리 오버레이가 존재하면 내용을 업데이트하고 위치를 변경
    if (distanceOverlay) {
        distanceOverlay.setPosition(position); // 새로운 위치 설정
        distanceOverlay.setContent(content); // 거리 정보 업데이트
    } else {
        // 새로운 거리 오버레이 객체 생성
        distanceOverlay = new kakao.maps.CustomOverlay({
            map, // 표시할 지도 객체
            content, // 거리 정보 HTML 문자열
            position, // 오버레이를 표시할 위치 (위도, 경도)
            xAnchor: 0, // X축 정렬
            yAnchor: -1, // Y축 정렬 (위로 배치)
            zIndex: 3, // 오버레이가 지도 위에서 가장 위에 보이도록 설정
        });
    }
}

// --------------- "인근 여행지" & "사진 업로드" 기능 추가 ---------------

// 인근 여행지 추가 함수
function addNearby(tagId, input) {
    const tag = tagList.find((tag) => tag.id === tagId);
    if (tag.nearby && tag.nearby.length >= 3) {
        alert("인근 여행지는 최대 3개까지만 추가할 수 있습니다.");
        return;
    }

    if (input.value.trim() === "") return;

    // 인근 여행지 데이터 추가
    if (!tag.nearby) tag.nearby = [];
    tag.nearby.push(input.value.trim());

    input.value = "";
    renderNearby(tagId);
}

// 인근 여행지 UI 렌더링
function renderNearby(tagId) {
    const tag = tagList.find((tag) => tag.id === tagId);
    const nearbyList = document.getElementById(`nearby-list-${tagId}`);
    if (!nearbyList) return;

    nearbyList.innerHTML = "";
    tag.nearby.forEach((place, index) => {
        const li = document.createElement("li");
        li.className = "nearby-item";
        li.innerHTML = `${place} <button onclick="removeNearby(${tagId}, ${index})">X</button>`;
        nearbyList.appendChild(li);
    });
}

// 인근 여행지 삭제
function removeNearby(tagId, index) {
    const tag = tagList.find((tag) => tag.id === tagId);
    tag.nearby.splice(index, 1);
    renderNearby(tagId);
}

// 이미지 업로드 함수
function uploadImages(tagId, input) {
    const tag = tagList.find((tag) => tag.id === tagId);
    const previewContainer = document.getElementById(`image-preview-${tagId}`);

    if (!previewContainer) return;

    if (!tag.images) tag.images = [];

    if (input.files.length + tag.images.length > 3) {
        alert("최대 3개의 이미지만 업로드할 수 있습니다.");
        input.value = "";
        return;
    }

    [...input.files].forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageId = tag.images.length;
            tag.images.push(e.target.result);

            const imgContainer = document.createElement("div");
            imgContainer.className = "image-container";
            imgContainer.innerHTML = `
                <img src="${e.target.result}" alt="Uploaded Image">
                <button class="delete-img-btn" onclick="removeImage(${tagId}, ${imageId}, event)">X</button>
            `;
            previewContainer.appendChild(imgContainer);
        };
        reader.readAsDataURL(file);
    });

    input.value = "";
}
function removeImage(tagId, imageIndex, event) {
    event.stopPropagation(); // 클릭 이벤트가 부모로 전달되지 않도록 차단
    const tag = tagList.find((tag) => tag.id === tagId);
    if (!tag || !tag.images) return;

    tag.images.splice(imageIndex, 1);
    renderImages(tagId);
}

function renderImages(tagId) {
    const tag = tagList.find((tag) => tag.id === tagId);
    const previewContainer = document.getElementById(`image-preview-${tagId}`);

    if (!previewContainer) return;

    previewContainer.innerHTML = ""; // 기존 이미지 삭제 후 다시 그리기

    tag.images.forEach((imageSrc, index) => {
        const imgContainer = document.createElement("div");
        imgContainer.className = "image-container";
        imgContainer.innerHTML = `
            <img src="${imageSrc}" alt="Uploaded Image">
            <button class="delete-img-btn" onclick="removeImage(${tagId}, ${index})">X</button>
        `;
        previewContainer.appendChild(imgContainer);
    });
}
