document.querySelectorAll(".ldvBHS").forEach((div) => {
    div.addEventListener("click", function () {
        let existingContent = this.parentElement.querySelector(".fFhAfW"); // 현재 li 내부의 fFhAfW 찾기

        if (existingContent) {
            // 이미 열려있는 경우 => 닫기
            existingContent.remove();
        } else {
            // 기존 .fFhAfW 요소들 제거 (다른 항목이 열려있다면 닫기)
            document.querySelectorAll(".fFhAfW").forEach((el) => el.remove());

            // 새로운 div 생성
            let newDiv = document.createElement("div");
            newDiv.setAttribute("font-size", "14px");
            newDiv.classList.add("FAQEntity__Content-cpxlp5-1", "fFhAfW");

            newDiv.innerHTML = `
                <p>세상 모든 경험의 시작, 프립(FRIP)은 취미 여가 플랫폼입니다.</p>
                <p><br /></p>
                <p>누구나 원하는 취미 여가를 쉽고 당연하게 즐길 수 있도록,&nbsp;</p>
                <p>호스트와 크루를 연결하고 등산, 윈드서핑, 클라이밍, 베이킹, 모임, 여행 등&nbsp;</p>
                <p>세상을 더 경험할 수 있도록 도와주는 서비스 플랫폼입니다.</p>
                <p><br /></p>
                <p>인터넷 홈페이지와 app에서 이용 가능합니다.</p>
                <p>* 인터넷 홈페이지: <a href="https://www.frip.co.kr" target="_blank">www.frip.co.kr</a></p>
                <p>* 안드로이드: Play 스토어에서 "프립" 검색</p>
                <p>* iOS: 앱스토어에서 "프립" 검색</p>
                <p><br /></p>
                <p>프립을 통해 지친 일상 속에서 활력을 찾고 일상을 바꾸는 경험을 하시기를 응원합니다.</p>
                <p><br /></p>
                <p>&lt;참고사항&gt;</p>
                <p>- 플랫폼에 올라와 있는 프로그램들을 [프립] 이라고 칭하고 있습니다.</p>
                <p>- 프립을 진행하시는 분을 [호스트], 참여하시는 분을 [크루]라고 칭하고 있습니다.</p>
            `;

            // 클릭한 .ldvBHS div 아래에 새로운 .fFhAfW 추가
            this.insertAdjacentElement("afterend", newDiv);
        }
    });
});

// document.querySelectorAll("span").forEach((span) => {
//     span.addEventListener("click", function () {
//         // 부모 .cxqTPR 요소 찾기
//         let parentDiv = this.closest(".cxqTPR");

//         // 이미 존재하는 ul 제거 (다른 span 클릭 시 기존 ul 제거)
//         let existingUl = parentDiv.querySelector(".jaTQXA");
//         if (existingUl) {
//             existingUl.remove();
//         }

//         // 새로운 ul 생성
//         let ul = document.createElement("ul");
//         ul.classList.add("jaTQXA");

//         // 5개의 li와 div 생성하여 ul에 추가
//         for (let i = 0; i < 5; i++) {
//             let li = document.createElement("li");

//             // gvlnCr div 생성
//             let innerDiv = document.createElement("div");
//             innerDiv.classList.add("gvlnCr");
//             innerDiv.textContent = `항목 ${i + 1}`; // 각 항목에 텍스트 추가

//             // gvlnCr 클릭 이벤트
//             innerDiv.addEventListener("click", function () {
//                 // 기존의 fFhAfW 제거
//                 let existingContent = li.querySelector(".fFhAfW");
//                 if (existingContent) {
//                     existingContent.remove();
//                 } else {
//                     // 새로운 fFhAfW div 생성
//                     let contentDiv = document.createElement("div");
//                     contentDiv.classList.add("fFhAfW");
//                     contentDiv.innerHTML = `
//                         <p>세상 모든 경험의 시작, 프립(FRIP)은 취미 여가 플랫폼입니다.</p>
//                         <p><br /></p>
//                         <p>누구나 원하는 취미 여가를 쉽고 당연하게 즐길 수 있도록,&nbsp;</p>
//                         <p>호스트와 크루를 연결하고 등산, 윈드서핑, 클라이밍, 베이킹, 모임, 여행 등&nbsp;</p>
//                         <p>세상을 더 경험할 수 있도록 도와주는 서비스 플랫폼입니다.</p>
//                         <p><br /></p>
//                         <p>인터넷 홈페이지와 app에서 이용 가능합니다.</p>
//                         <p>* 인터넷 홈페이지: <a href="https://www.frip.co.kr" target="_blank">www.frip.co.kr</a></p>
//                         <p>* 안드로이드: Play 스토어에서 "프립" 검색</p>
//                         <p>* iOS: 앱스토어에서 "프립" 검색</p>
//                         <p><br /></p>
//                         <p>프립을 통해 지친 일상 속에서 활력을 찾고 일상을 바꾸는 경험을 하시기를 응원합니다.</p>
//                         <p><br /></p>
//                         <p>&lt;참고사항&gt;</p>
//                         <p>- 플랫폼에 올라와 있는 프로그램들을 [프립] 이라고 칭하고 있습니다.</p>
//                         <p>- 프립을 진행하시는 분을 [호스트], 참여하시는 분을 [크루]라고 칭하고 있습니다.</p>
//                     `;

//                     // li에 fFhAfW 추가
//                     li.appendChild(contentDiv);
//                 }
//             });

//             li.appendChild(innerDiv);
//             ul.appendChild(li);
//         }

//         // .cxqTPR div 아래에 ul 추가
//         parentDiv.appendChild(ul);
//     });
// });
