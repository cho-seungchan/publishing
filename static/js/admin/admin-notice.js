// HTML 문서가 완전히 로드된 후 실행되는 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", () => {
    // <ul> 내부의 모든 <li> 요소를 가져와서 clickList1 변수에 저장
    const clickList1 = document.querySelectorAll("ul > li");

    // 닫기 시도 여부를 저장하는 플래그 (한 번 클릭하면 닫히도록 조정)
    let closeAttempt = false;

    // 모든 <li> 요소에 대해 클릭 이벤트 리스너 추가
    clickList1.forEach((list) => {
        list.addEventListener("click", (event) => {
            // 사용자가 textarea, "공지 수정" 버튼, "공지 저장" 버튼을 클릭한 경우 닫히지 않도록 예외 처리
            if (
                event.target.tagName.toLowerCase() === "textarea" ||
                event.target.classList.contains("editBtn") ||
                event.target.classList.contains("saveBtn") ||
                event.target.classList.contains("deletBtn")
            ) {
                return;
            }

            // 기존에 열려 있는 공지(.createComment)를 모두 삭제 (기존 공지 닫기)
            document
                .querySelectorAll(".createComment")
                .forEach((comment) => comment.remove());

            // 새로운 공지 컨테이너 div 생성
            const div2 = document.createElement("div");
            div2.classList.add("createComment"); // 클래스 추가하여 스타일 적용 가능

            // 공지 내용 (HTML 문자열)
            let contentText = `
            안녕하세요. 크루님<br>
            프립입니다.<br><br>
            2025년 을사년 새해 복 많이 받으세요😊<br>
            프립과 함께 탐험해주신 크루님께 진심으로 감사드리며,<br>
            설 연휴로 인한 고객센터 휴무 안내드립니다.<br><br>
            <strong>[ 고객센터 휴무 안내 ]</strong><br>
            - 1/27(월) : 임시공휴일<br>
            - 1/28(화) ~ 1/30(목) : 설날 연휴<br><br>
            주말 및 휴무 동안 진행하는 프립에 대해서는 해당 상품의 호스트님과 소통하실 수 있으며,<br>
            프립(카카오톡 채널 @프립)에 남겨주신 문의사항에 대해서는 영업일에 순차적으로 처리해 드릴 예정입니다.<br><br>
            감사합니다.
            `;

            // 공지 내용을 담을 div 생성
            const contentDiv = document.createElement("div");
            contentDiv.classList.add("content"); // 스타일 적용을 위한 클래스 추가
            contentDiv.innerHTML = contentText; // 기본 공지 내용 삽입

            // "공지 수정" 버튼 생성
            const editBtn = document.createElement("button");
            editBtn.textContent = "공지 수정"; // 버튼 텍스트 설정
            editBtn.classList.add("editBtn"); // 스타일 적용을 위한 클래스 추가

            // "공지 삭제" 버튼 생성
            const deletBtn = document.createElement("button");
            deletBtn.textContent = "공지 삭제"; // 버튼 텍스트 설정
            deletBtn.classList.add("deletBtn"); // 스타일 적용을 위한 클래스 추가

            // 공지 내용과 버튼을 공지 컨테이너 div2에 추가
            div2.appendChild(contentDiv);
            div2.appendChild(editBtn);
            div2.appendChild(deletBtn);

            // 해당 리스트 항목(li) 안에 공지 div 추가 (공지 열기)
            list.appendChild(div2);

            // "공지 삭제" 버튼 클릭 시 해당 li 삭제
            deletBtn.addEventListener("click", (event) => {
                event.stopPropagation(); // li 클릭 이벤트 방지
                list.remove(); // 해당 li 삭제
            });

            // "공지 수정" 버튼 클릭 시 textarea를 추가하여 편집할 수 있도록 설정
            editBtn.addEventListener("click", () => {
                // 공지 컨테이너 div2를 가져옴
                let commentBox = list.querySelector(".createComment");

                // 만약 공지 컨테이너가 없거나 이미 textarea가 존재하면 함수 종료
                if (!commentBox || commentBox.querySelector("textarea")) return;

                // textarea 요소 생성
                const textArea = document.createElement("textarea");
                textArea.style.width = "100%";
                textArea.style.height = "200px";
                textArea.style.border = "1px solid blue"; // 파란색 테두리 추가 (확인용)
                textArea.value = contentDiv.innerHTML.replace(/<br>/g, "\n"); // 기존 공지 내용을 textarea에 넣기

                // "공지 저장" 버튼 생성
                const saveBtn = document.createElement("button");
                saveBtn.textContent = "공지 저장"; // 버튼 텍스트 설정
                saveBtn.classList.add("saveBtn"); // 스타일 적용을 위한 클래스 추가

                // "공지 저장" 버튼 클릭 시 textarea의 내용을 저장
                saveBtn.addEventListener("click", () => {
                    // textarea에서 수정된 텍스트를 가져옴
                    const updatedContent = textArea.value
                        .trim()
                        .replace(/\n/g, "<br>");

                    // 공지 내용을 업데이트할 div 가져오기
                    let targetContentDiv = commentBox.querySelector(".content");

                    // 만약 대상 div가 없으면 함수 종료
                    if (!targetContentDiv) return;

                    // 업데이트된 내용을 적용하여 저장
                    targetContentDiv.innerHTML = updatedContent;
                    targetContentDiv.style.display = "block"; // 다시 표시

                    // textarea 및 저장 버튼 제거
                    textArea.remove();
                    saveBtn.remove();
                });

                // 기존 공지 내용을 숨김
                contentDiv.style.display = "none";

                // textarea와 저장 버튼을 공지 컨테이너 div2에 추가
                commentBox.appendChild(textArea);
                commentBox.appendChild(saveBtn);
            });
        });
    });

    // 공지 바깥을 클릭했을 때 닫는 로직
    document.addEventListener("click", (event) => {
        // textarea, "공지 수정" 버튼, "공지 저장" 버튼, <li> 내부를 클릭하면 공지를 닫지 않음
        if (
            event.target.tagName.toLowerCase() === "textarea" ||
            event.target.classList.contains("editBtn") ||
            event.target.classList.contains("saveBtn") ||
            event.target.classList.contains("deletBtn") ||
            event.target.closest("ul > li")
        ) {
            closeAttempt = false; // 닫기 방지
            return;
        }

        // 첫 번째 클릭에서는 닫지 않고 1.5초 동안 기다렸다가 취소 가능하도록 설정
        if (!closeAttempt) {
            closeAttempt = true;
            setTimeout(() => {
                closeAttempt = false;
            }, 1500);
        } else {
            // 두 번째 클릭 시 공지 닫기
            document
                .querySelectorAll(".createComment")
                .forEach((comment) => comment.remove());
        }
    });
});
