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

document.querySelector(".volunteerBtn").addEventListener("click", function () {
    document
        .querySelector(".DurationOfTourContainer")
        .classList.toggle("hidden");
});

// // 경로 추가

// document.addEventListener("DOMContentLoaded", function () {
//     // 페이지가 로드되면 실행되는 이벤트 리스너

//     const addressInput = document.querySelector(".gather");
//     // 화면에 기본으로 있는 주소 입력창을 가져옴

//     const addPathBtn = document.querySelector(".addPathBtn");
//     // "경로 추가" 버튼을 가져옴

//     const gatheringPlace = document.querySelector(".GatheringPlace");
//     // 지도를 표시할 부모 div (기본 주소 입력창이 있는 곳)

//     // **초기 "경로 추가" 버튼 비활성화**
//     if (addPathBtn) {
//         addPathBtn.setAttribute("disabled", "true"); // 버튼 비활성화
//         addPathBtn.classList.add("disabled"); // CSS 적용을 위해 클래스 추가
//     }

//     // **주소 입력 후 Enter를 눌러 지도를 생성하면 버튼 활성화**
//     addressInput.addEventListener("keyup", function (event) {
//         if (event.key === "Enter") {
//             // 사용자가 Enter를 누르면 실행됨
//             let address = addressInput.value.trim();
//             if (!address) return; // 주소가 없으면 함수 종료

//             let existingMap = gatheringPlace.querySelector(".mapContainer");
//             if (existingMap) existingMap.remove(); // 기존에 생성된 지도가 있으면 삭제

//             let geocoder = new kakao.maps.services.Geocoder();
//             // 카카오맵 API에서 주소 검색을 위한 Geocoder 객체 생성

//             geocoder.addressSearch(address, (result, status) => {
//                 if (status === kakao.maps.services.Status.OK) {
//                     // 주소 검색이 성공했을 경우 실행

//                     // **지도 컨테이너 생성**
//                     const mapDiv = document.createElement("div");
//                     mapDiv.className = "mapContainer";
//                     mapDiv.style.width = "100%";
//                     mapDiv.style.height = "300px";
//                     mapDiv.style.marginTop = "10px";

//                     const mapInnerDiv = document.createElement("div");
//                     mapInnerDiv.style.width = "100%";
//                     mapInnerDiv.style.height = "100%";
//                     mapDiv.appendChild(mapInnerDiv);

//                     gatheringPlace.appendChild(mapDiv); // 지도 컨테이너를 추가

//                     let coords = new kakao.maps.LatLng(
//                         result[0].y,
//                         result[0].x
//                     );
//                     // 검색된 주소의 좌표 가져오기

//                     let mapOption = {
//                         center: coords,
//                         level: 3,
//                     };

//                     let map = new kakao.maps.Map(mapInnerDiv, mapOption);
//                     // 새로운 지도 생성

//                     new kakao.maps.Marker({ map: map, position: coords });
//                     // 지도에 마커 추가

//                     map.setCenter(coords);
//                     // 지도를 해당 좌표로 이동

//                     // **지도 생성 완료 후 "경로 추가" 버튼 활성화**
//                     addPathBtn.removeAttribute("disabled"); // 버튼 활성화
//                     addPathBtn.classList.remove("disabled");
//                 }
//             });
//         }
//     });

//     // **"경로 추가" 버튼 클릭 시 새로운 입력창 추가**
//     addPathBtn.addEventListener("click", function () {
//         if (addPathBtn.hasAttribute("disabled")) {
//             alert("먼저 주소를 입력하고 지도를 생성해주세요.");
//             return; // 지도가 생성되지 않았으면 경고 메시지를 띄우고 실행 중단
//         }

//         const newElement = document.createElement("div");
//         newElement.className = "GatheringPlacejk1";
//         // 새롭게 추가될 입력창을 감싸는 div 생성

//         newElement.innerHTML = `
//             <input
//                 placeholder="주소를 입력하세요"
//                 class="SocialRecruiteTagsContainer__SocialRecruiteTagsInput-sc-2762su-1 gcqwwh gatherjk1"
//                 value=""
//             />
//             <button class="deletePathBtn">경로 삭제</button>
//         `;
//         // 새로운 주소 입력창과 삭제 버튼 추가

//         const divider = document.createElement("div");
//         divider.className = "WriteRecruitePage__Divider-bnh5u-2 hgZork";
//         // 새로운 경로 추가 시 구분선 생성

//         gatheringPlace.appendChild(newElement);
//         gatheringPlace.appendChild(divider);
//         // 새롭게 만든 입력창과 구분선을 부모 요소에 추가

//         // **경로 추가 버튼 다시 비활성화 (새로운 주소 입력을 강제)**
//         addPathBtn.setAttribute("disabled", "true");
//         addPathBtn.classList.add("disabled");
//     });

//     // **삭제 버튼 클릭 시 해당 경로 삭제**
//     document.addEventListener("click", function (event) {
//         if (event.target.classList.contains("deletePathBtn")) {
//             // 클릭한 요소가 삭제 버튼인지 확인
//             let gatheringPlacejk1 = event.target.closest(".GatheringPlacejk1");
//             if (gatheringPlacejk1) {
//                 gatheringPlacejk1.nextElementSibling?.remove(); // 구분선 삭제
//                 gatheringPlacejk1.remove(); // 입력창 삭제
//             }
//         }
//     });

//     // **새로운 입력창에서도 동일한 동작 적용**
//     document.addEventListener("keyup", function (event) {
//         if (
//             event.target.classList.contains("gatherjk1") &&
//             event.key === "Enter"
//         ) {
//             let input = event.target;
//             let gatheringPlacejk1 = input.closest(".GatheringPlacejk1");

//             let existingMap = gatheringPlacejk1.querySelector(".mapContainer");
//             if (existingMap) existingMap.remove(); // 기존 지도 삭제

//             let geocoder = new kakao.maps.services.Geocoder();
//             // 새 입력창에서도 주소 검색을 수행

//             geocoder.addressSearch(input.value, (result, status) => {
//                 if (status === kakao.maps.services.Status.OK) {
//                     const mapDiv = document.createElement("div");
//                     mapDiv.className = "mapContainer";
//                     mapDiv.style.width = "100%";
//                     mapDiv.style.height = "300px";
//                     mapDiv.style.marginTop = "10px";

//                     const mapInnerDiv = document.createElement("div");
//                     mapInnerDiv.style.width = "100%";
//                     mapInnerDiv.style.height = "100%";
//                     mapDiv.appendChild(mapInnerDiv);

//                     gatheringPlacejk1.appendChild(mapDiv);

//                     let coords = new kakao.maps.LatLng(
//                         result[0].y,
//                         result[0].x
//                     );
//                     // 검색된 주소의 좌표 가져오기

//                     let mapOption = {
//                         center: coords,
//                         level: 3,
//                     };

//                     let map = new kakao.maps.Map(mapInnerDiv, mapOption);
//                     // 새로운 지도 생성

//                     new kakao.maps.Marker({ map: map, position: coords });
//                     // 지도에 마커 추가

//                     map.setCenter(coords);
//                     // 지도를 해당 좌표로 이동

//                     // **지도 생성 완료 후 "경로 추가" 버튼 활성화**
//                     addPathBtn.removeAttribute("disabled"); // 버튼 활성화
//                     addPathBtn.classList.remove("disabled");
//                 }
//             });
//         }
//     });
// });
