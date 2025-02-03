document.querySelectorAll(".ldvBHS").forEach((div) => {
    div.addEventListener("click", function () {
        let existingContent = this.parentElement.querySelector(".fFhAfW");

        if (existingContent) {
            existingContent.remove();
        } else {
            document.querySelectorAll(".fFhAfW").forEach((el) => el.remove());

            let newDiv = document.createElement("div");
            newDiv.setAttribute("font-size", "14px");
            newDiv.classList.add("FAQEntity__Content-cpxlp5-1", "fFhAfW");

            newDiv.innerHTML = `
                <p>세상 모든 경험의 시작, 픽커스(Pick+Course)는 여행지 추천 플랫폼입니다.</p>
                <p><br /></p>
                <p>누구나 원하는 지역으로의 여행을 쉽고 당연하게 즐길 수 있도록,&nbsp;</p>
                <p>호스트와 크루를 연결하고 여행뿐만 아닌 주변 엑티비티 등산, 윈드서핑, 클라이밍 등&nbsp;</p>
                <p>세상을 더 경험할 수 있도록 도와주는 서비스 플랫폼입니다.</p>
                <p><br /></p>
                <p>인터넷 홈페이지와 app에서 이용 가능합니다.</p>
                <p>* 인터넷 홈페이지: <a href="https://www.frip.co.kr" target="_blank">www.frip.co.kr</a></p>
                <p>* 안드로이드: Play 스토어에서 "픽커스" 검색</p>
                <p>* iOS: 앱스토어에서 "픽커스" 검색</p>
                <p><br /></p>
                <p>픽커스를 통해 지친 일상 속에서 활력을 찾고 일상을 바꾸는 경험을 하시기를 응원합니다.</p>
                <p><br /></p>
                <p>&lt;참고사항&gt;</p>
                <p>- 플랫폼에 올라와 있는 프로그램들을 [픽커스] 라고 칭하고 있습니다.</p>
                <p>- 픽커스를 진행하시는 분을 [호스트], 참여하시는 분을 [크루]라고 칭하고 있습니다.</p>
            `;

            this.insertAdjacentElement("afterend", newDiv);
        }
    });
});
