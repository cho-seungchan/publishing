document.addEventListener("DOMContentLoaded", () => {
    const clickList1 = document.querySelectorAll("ul > li");

    // 각 리스트 아이템에 댓글 목록을 저장할 객체 생성
    const commentStorage = new Map();

    clickList1.forEach((list, index) => {
        list.addEventListener("click", () => {
            console.log("리스트 아이템 클릭됨:", list);

            // 기존에 열린 모든 댓글창 닫기
            document
                .querySelectorAll(".createComment")
                .forEach((existingDiv) => {
                    existingDiv.remove();
                });

            // 새로운 div 생성
            const div2 = document.createElement("div");
            div2.classList.add("createComment");

            div2.innerHTML = `
                <p>안녕하세요. 크루님</p>
                <p>프립입니다.</p>
                <p>2025년 을사년 새해 복 많이 받으세요😊</p>
                <p>프립과 함께 탐험해주신 크루님께 진심으로 감사드리며,</p>
                <p>설 연휴로 인한 고객센터 휴무 안내드립니다.</p>
                <p><strong>[ 고객센터 휴무 안내 ]</strong></p>
                <p>- 1/27(월) : 임시공휴일</p>
                <p>- 1/28(화) ~1/30(목) : 설날 연휴</p>
                <p>프립(카카오톡 채널 @프립)에 남겨주신 문의사항에 대해서는 영업일에 순차적으로 처리해 드릴 예정입니다.</p>
                <p>감사합니다.</p>

                <!-- 댓글 입력창 추가 -->
                <div class="comment-section">
                    <textarea class="comment-input" placeholder="댓글을 입력하세요..." rows="3"></textarea>
                    <button class="comment-submit">댓글 남기기</button>
                    <div class="comment-list"></div>
                </div>
            `;

            // 현재 클릭한 리스트 아이템에만 div2 추가
            list.appendChild(div2);
            console.log("새로운 div 추가됨:", div2);

            // 댓글 입력 관련 요소 가져오기
            const commentInput = div2.querySelector(".comment-input");
            const commentSubmit = div2.querySelector(".comment-submit");
            const commentList = div2.querySelector(".comment-list");

            // textarea에 자동으로 포커스 주기
            commentInput.focus();

            // 댓글이 저장된 경우, 기존 댓글 복원하기
            if (commentStorage.has(index)) {
                commentList.innerHTML = commentStorage.get(index);
                addEditDeleteEvents(commentList, index);
            }

            // 버튼 클릭하면 댓글 추가
            commentSubmit.addEventListener("click", () => {
                const commentText = commentInput.value.trim();
                if (commentText) {
                    // 현재 날짜 가져오기 (YYYY-MM-DD 형식)
                    const today = new Date();
                    const dateString = today.toISOString().split("T")[0];

                    // 순번 계산 (기존 댓글 개수 + 1)
                    const commentNumber = commentList.childElementCount + 1;

                    // 댓글 HTML 생성
                    const commentItem = document.createElement("div");
                    commentItem.classList.add("comment-item");
                    commentItem.innerHTML = `
                        <span class="comment-number">${commentNumber}.</span>
                        <span class="comment-text">${commentText}</span>
                        <span class="comment-date">${dateString}</span>
                        <button class="edit-comment">수정</button>
                        <button class="delete-comment">삭제</button>
                    `;

                    commentList.appendChild(commentItem);
                    commentInput.value = ""; // 입력 필드 초기화
                    console.log("댓글 추가됨:", commentText);

                    // 댓글 목록을 저장
                    commentStorage.set(index, commentList.innerHTML);

                    // 새로 추가된 댓글에 수정/삭제 이벤트 추가
                    addEditDeleteEvents(commentList, index);
                } else {
                    alert("댓글을 입력하세요!");
                }
            });

            //  Enter 키로도 댓글 추가 가능
            commentInput.addEventListener("keypress", (event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault(); // 기본 엔터 동작 방지
                    commentSubmit.click(); // 버튼 클릭 동작 실행
                }
            });
        });
    });

    // 수정 / 삭제 이벤트 추가 함수
    function addEditDeleteEvents(commentList, index) {
        commentList.querySelectorAll(".edit-comment").forEach((editButton) => {
            editButton.onclick = () => {
                const commentItem = editButton.parentElement;
                const commentText = commentItem.querySelector(".comment-text");

                // 현재 텍스트를 가져와 prompt로 수정 가능하게
                const newText = prompt(
                    "댓글을 수정하세요:",
                    commentText.textContent
                );
                if (newText !== null && newText.trim() !== "") {
                    commentText.textContent = newText;
                    console.log("댓글 수정됨:", newText);

                    // 수정된 댓글 목록을 다시 저장
                    commentStorage.set(index, commentList.innerHTML);
                }
            };
        });

        commentList
            .querySelectorAll(".delete-comment")
            .forEach((deleteButton) => {
                deleteButton.onclick = () => {
                    const commentItem = deleteButton.parentElement;
                    commentItem.remove();
                    console.log("댓글 삭제됨");

                    // 삭제된 댓글 목록을 다시 저장
                    commentStorage.set(index, commentList.innerHTML);

                    // 순번 다시 매기기
                    commentList
                        .querySelectorAll(".comment-item")
                        .forEach((item, i) => {
                            item.querySelector(
                                ".comment-number"
                            ).textContent = `${i + 1}.`;
                        });
                };
            });
    }
});
