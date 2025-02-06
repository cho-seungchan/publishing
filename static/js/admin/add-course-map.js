// // 지도 보여주기
// var mapContainer = document.getElementById("map"), // 지도를 표시할 div
//     mapOption = {
//         center: new kakao.maps.LatLng(35.409476, 127.396059), // 지도의 중심좌표
//         level: 9, // 지도의 확대 레벨
//     };
// let initialCenter = new kakao.maps.LatLng(35.409476, 127.396059);
// var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// let tourSpots = [
//     { name: "허브마을 채마루", address: "남원시 원천로 37" },
//     { name: "광한루원", address: "남원시 요천로 1447" },
//     { name: "김병종미술관", address: "남원시 함파우길 65-14" },
//     { name: "지리산 허브밸리", address: "남원시 바래봉길 24" },
//     { name: "구서도역", address: "남원시 서도길 32" },
//     { name: "혼불문학관", address: "남원시 노봉안길52" },
// ];

// let positions = [];
// let geocoder = new kakao.maps.services.Geocoder();
// let remains = tourSpots.length;
// tourSpots.forEach((spot) => {
//     geocoder.addressSearch(spot.address, (result, status) => {
//         if (status === kakao.maps.services.Status.OK) {
//             positions.push({
//                 content: "<div>" + spot.name + "</div>",
//                 latlng: new kakao.maps.LatLng(
//                     Math.floor(result[0].y * 1000000) / 1000000,
//                     Math.floor(result[0].x * 1000000) / 1000000
//                 ),
//             });
//         }
//         remains--;
//         if (remains < 1) {
//             createMarkers();
//         }
//     });
// });

// function createMarkers() {
//     positions.forEach((position) => {
//         console.log(position.content + " " + position.latlng);
//     });

//     for (var i = 0; i < positions.length; i++) {
//         // 마커를 생성합니다
//         var marker = new kakao.maps.Marker({
//             map: map, // 마커를 표시할 지도
//             position: positions[i].latlng, // 마커의 위치
//         });
//         console.log(marker.getPosition().toString());

//         // 마커에 표시할 인포윈도우를 생성합니다
//         var infowindow = new kakao.maps.InfoWindow({
//             content: positions[i].content, // 인포윈도우에 표시할 내용
//         });
//         console.log(infowindow.getContent());

//         // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
//         // 이벤트 리스너로는 클로저를 만들어 등록합니다
//         // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
//         kakao.maps.event.addListener(
//             marker,
//             "mouseover",
//             makeOverListener(map, marker, infowindow)
//         );
//         kakao.maps.event.addListener(
//             marker,
//             "mouseout",
//             makeOutListener(infowindow)
//         );
//     }
// }

// // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
// function makeOverListener(map, marker, infowindow) {
//     return function () {
//         infowindow.open(map, marker);
//     };
// }

// // 인포윈도우를 닫는 클로저를 만드는 함수입니다
// function makeOutListener(infowindow) {
//     return function () {
//         infowindow.close();
//     };
// }
// // 지도 보여주기

// // // 화면 확장 축소
// // document.querySelector("#fullMap").addEventListener("click", (e) => {
// //     if (mapContainer.style.position === "fixed") {
// //         mapContainer.style.position = "relative";
// //         mapContainer.style.width = "100%";
// //         mapContainer.style.height = "40vh";
// //         mapContainer.style.zIndex = ""; // 맵이 다른 요소 위에 오도록 설정한거 해제
// //         document.querySelector("#fullMap").style.position = "absolute";
// //         // 지도의 중심을 새로운 좌표로 설정
// //         map.relayout();
// //         map.setCenter(initialCenter);
// //     } else {
// //         mapContainer.style.position = "fixed";
// //         mapContainer.style.top = "0";
// //         mapContainer.style.left = "0";
// //         mapContainer.style.width = "100%";
// //         mapContainer.style.height = "100vh";
// //         mapContainer.style.zIndex = "1000"; // 맵이 다른 요소 위에 오도록 설정
// //         document.querySelector("#fullMap").style.position = "fixed";
// //         // 지도의 중심을 새로운 좌표로 설정
// //         map.relayout();
// //         map.setCenter(initialCenter);
// //     }
// // });
// // // 화면 확장 축소

// // =====================================경로 추가===============================//

const inputField = document.querySelector(".gcqwwh.gather"); // 지도 검색 및 태그 입력 필드
const mapContainerDiv = document.querySelector(".GatheringPlace"); // 지도 컨테이너
const tagContainer = document.querySelector(".bDBbNiforth"); // 태그가 추가될 컨테이너

let tagCount = 0; // 현재 추가된 태그 개수
let tagList = []; // 추가된 태그를 저장할 배열

// 사용자가 Enter 키를 입력하면 실행
inputField.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        // 기존의 지도 컨테이너가 존재하면 제거
        if (document.querySelector("#mapContainer")) {
            document.querySelector("#mapContainer").remove();
        }

        // 카카오맵 API의 Geocoder(주소 검색) 기능 사용
        let geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(inputField.value, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                // 지도 생성 성공 시, 지도 생성 후 태그 추가
                createMap(result[0].y, result[0].x);
                addTag(inputField.value);
            } else {
                // 주소 검색 실패 시 경고 메시지 출력
                alert("유효한 주소를 입력해주세요.");
            }
        });
    }
});

// 지도 생성 함수
function createMap(lat, lng) {
    const mapDiv = document.createElement("div"); // 새로운 div 요소 생성
    mapDiv.id = "mapContainer"; // id 설정
    mapDiv.innerHTML = `<div id="map"></div>`; // 내부 HTML 삽입
    mapContainerDiv.appendChild(mapDiv); // 지도 컨테이너에 추가

    let coords = new kakao.maps.LatLng(lat, lng); // 좌표 생성
    let mapOption = {
        center: coords, // 지도 중심 좌표 설정
        level: 3, // 확대 레벨 설정 (3: 기본값)
    };
    let map = new kakao.maps.Map(document.getElementById("map"), mapOption); // 지도 생성
    new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: coords, // 마커 위치 설정
    });
    map.setCenter(coords); // 지도의 중심을 새 좌표로 이동
}

// 태그 추가 함수
function addTag(tagText) {
    if (tagCount >= 10) {
        alert("태그는 최대 10개까지만 추가할 수 있습니다.");
        return;
    }

    // 첫 번째 태그가 추가될 때 헤더 생성
    if (tagCount === 0) {
        tagContainer.innerHTML = `<header class="Article__Header-sc-1mmkltm-0 gScFGo">
                                    <hgroup>
                                        <h2 class="Article__Title-sc-1mmkltm-1 bZNoYF">추가한 경로</h2>
                                    </hgroup>
                                  </header>
                                  <div class="Stuff__StuffContainer-sc-8zlrc8-0 iXEvmI"></div>`;
    }

    let parentDiv = tagContainer.querySelector(".iXEvmI"); // 태그 컨테이너 내부 div 찾기
    const tagDiv = document.createElement("div"); // 새로운 div 요소 생성
    tagDiv.className = "Tag__RoundTag-sxb61j-1 jXxsiv"; // 태그 스타일 지정
    tagDiv.innerHTML = `<span>#${tagText}</span>
                         <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E %3Cpath d='M11.828 6.172l-5.656 5.656M11.828 11.828L6.172 6.172' stroke='%23999' stroke-linecap='square'/%3E %3C/svg%3E" alt="delete tag">`;
    parentDiv.appendChild(tagDiv); // 생성된 태그를 컨테이너에 추가

    tagList.push(tagText); // 배열에 태그 추가
    inputField.value = ""; // 입력 필드 초기화
    tagCount++; // 태그 개수 증가
    inputField.placeholder = `경로를 입력하세요. (${tagCount}/10)`; // 입력 필드 플레이스홀더 업데이트
}

// 태그 삭제 기능
// 사용자가 태그 내 삭제 버튼(img)을 클릭하면 해당 태그 삭제
tagContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        const tagElement = e.target.closest(".jXxsiv");
        const tagText = tagElement.querySelector("span").textContent.slice(1); // '#' 제거
        tagElement.remove(); // 해당 태그 삭제

        tagList = tagList.filter((tag) => tag !== tagText); // 배열에서 해당 태그 제거
        tagCount--; // 태그 개수 감소

        if (tagCount === 0) {
            tagContainer.innerHTML = ""; // 태그가 없으면 컨테이너 내용 초기화
        }
        inputField.placeholder = `경로를 입력하세요. (${tagCount}/10)`; // 입력 필드 플레이스홀더 업데이트
    }
});

// const inputField = document.querySelector(".gcqwwh.gather"); // 지도 검색 및 태그 입력 필드
// const mapContainerDiv = document.querySelector(".GatheringPlace"); // 지도 컨테이너
// const tagContainer = document.querySelector(".bDBbNiforth"); // 태그가 추가될 컨테이너
// const generateMapButton = document.querySelector(".generate-map"); // 지도 생성 버튼

// let tagCount = 0; // 현재 추가된 태그 개수
// let tagList = []; // 추가된 태그를 저장할 배열

// // 사용자가 Enter 키를 입력하면 실행
// inputField.addEventListener("keyup", (e) => {
//     if (e.key === "Enter") {
//         let geocoder = new kakao.maps.services.Geocoder();
//         geocoder.addressSearch(inputField.value, (result, status) => {
//             if (status === kakao.maps.services.Status.OK && result.length > 0) {
//                 addTag(inputField.value);
//             } else {
//                 alert("유효한 주소를 입력해주세요.");
//             }
//         });
//     }
// });

// // 태그 추가 함수
// function addTag(tagText) {
//     if (tagCount >= 10) {
//         alert("태그는 최대 10개까지만 추가할 수 있습니다.");
//         return;
//     }

//     if (tagCount === 0) {
//         tagContainer.innerHTML = `<header class="Article__Header-sc-1mmkltm-0 gScFGo">
//                                     <hgroup>
//                                         <h2 class="Article__Title-sc-1mmkltm-1 bZNoYF">추가한 경로</h2>
//                                     </hgroup>
//                                   </header>
//                                   <div class="Stuff__StuffContainer-sc-8zlrc8-0 iXEvmI"></div>`;
//     }

//     let parentDiv = tagContainer.querySelector(".iXEvmI");
//     const tagDiv = document.createElement("div");
//     tagDiv.className = "Tag__RoundTag-sxb61j-1 jXxsiv";
//     tagDiv.innerHTML = `<span>#${tagText}</span>
//                          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E %3Cpath d='M11.828 6.172l-5.656 5.656M11.828 11.828L6.172 6.172' stroke='%23999' stroke-linecap='square'/%3E %3C/svg%3E" alt="delete tag">`;
//     parentDiv.appendChild(tagDiv);

//     tagList.push(tagText);
//     inputField.value = "";
//     tagCount++;
//     inputField.placeholder = `경로를 입력하세요. (${tagCount}/10)`;
// }

// // 태그 삭제 기능
// tagContainer.addEventListener("click", (e) => {
//     if (e.target.tagName === "IMG") {
//         const tagElement = e.target.closest(".jXxsiv");
//         const tagText = tagElement.querySelector("span").textContent.slice(1);
//         tagElement.remove();
//         tagList = tagList.filter((tag) => tag !== tagText);
//         tagCount--;
//         if (tagCount === 0) {
//             tagContainer.innerHTML = "";
//         }
//         inputField.placeholder = `경로를 입력하세요. (${tagCount}/10)`;
//     }
// });

// // 버튼을 클릭하면 지도에 태그 위치를 표시
// generateMapButton.addEventListener("click", () => {
//     if (document.querySelector("#mapContainer")) {
//         document.querySelector("#mapContainer").remove();
//     }

//     const mapDiv = document.createElement("div");
//     mapDiv.id = "mapContainer";
//     mapDiv.innerHTML = `<div id="map"></div>`;
//     mapContainerDiv.appendChild(mapDiv);

//     let map = new kakao.maps.Map(document.getElementById("map"), {
//         center: new kakao.maps.LatLng(37.5665, 126.978),
//         level: 9,
//     });

//     let geocoder = new kakao.maps.services.Geocoder();
//     let positions = [];
//     let remains = tagList.length;

//     tagList.forEach((address) => {
//         geocoder.addressSearch(address, (result, status) => {
//             if (status === kakao.maps.services.Status.OK && result.length > 0) {
//                 let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
//                 positions.push({
//                     content: `<div>${address}</div>`,
//                     latlng: coords,
//                 });
//             }
//             remains--;
//             if (remains === 0) {
//                 createMarkers(map, positions);
//             }
//         });
//     });
// });

// // 지도에 마커 추가
// function createMarkers(map, positions) {
//     positions.forEach((pos) => {
//         let marker = new kakao.maps.Marker({
//             map: map,
//             position: pos.latlng,
//         });
//         let infowindow = new kakao.maps.InfoWindow({ content: pos.content });
//         kakao.maps.event.addListener(marker, "mouseover", () =>
//             infowindow.open(map, marker)
//         );
//         kakao.maps.event.addListener(marker, "mouseout", () =>
//             infowindow.close()
//         );
//     });
// }
