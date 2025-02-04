// 로그인 버튼 눌렀을 때 (로그인은 차후 반영)
document.querySelectorAll(".ContentComment").forEach((ContentComment) => {
    ContentComment.addEventListener("click", () => {
        if (document.querySelector(".ContentComment").textContent == "등록") {
            return;
        }
        document.querySelector(".replyWrap").className = "replyWrap subscription login";
        document.querySelector(".writeForm").removeAttribute("style");
        document.querySelectorAll(".comment").forEach((e) => {
            e.removeAttribute("readonly");
            e.removeAttribute("style");
            e.placeholder = "글을 남겨주세요.";
        });
        document.querySelectorAll(".fileUp").forEach((e) => {
            e.removeAttribute("disabled");
        });
        document.querySelectorAll(".ContentComment").forEach((e) => {
            e.textContent = "등록";
        });
    });
});
// 로그인 버튼 눌렀을 때 (로그인은 차후 반영)

// 댓글에 답글 달기 버튼
document.querySelectorAll(".btn2").forEach((btn2) => {
    // 화면에 보여지는 버튼 모으기
    btn2.addEventListener("click", (e) => {
        if (e.target.title == "선택됨") {
            e.target.setAttribute("title", "");
            e.target.closest("li").querySelector(".replyBox").style.display = "none";
        } else {
            e.target.setAttribute("title", "선택됨");
            e.target.closest("li").querySelector(".replyBox").style.display = "block";
        }
    });
});
// 댓글에 답글 달기 버튼

// textarea에 글자 입력시 입력된 글자 수 보여주기
document.querySelectorAll(".comment").forEach((comment) => {
    comment.addEventListener("input", (e) => {
        e.target.nextElementSibling.textContent = `${e.target.value.length} / 1200 (추천 글자수: 30자 이내)`;
    });
});
// textarea에 글자 입력시 입력된 글자 수 보여주기

// 댓글 더보기 버튼
document.querySelector(".btn_more").addEventListener("click", () => {
    const li = document.createElement("li");
    // 향후 데이타를 받을 때는 for문으로 처리
    li.id = "b940dab6-e56b-4103-b120-a1f4c83c5e25";
    li.innerHTML = `
    <div class="profile">
        <div class="photo" icid="b940dab6-e56b-4103-b120-a1f4c83c5e25" style="background-image:url(https://phinf.pstatic.net/contact/20210105_226/1609820759733fLo89_PNG/avatar_profile.png)">
        </div>
        <span class="ico"><img src="https://korean.visitkorea.or.kr/resources/images/sub/ico_naver.png" alt="네이버"></span>
    </div>
    <div class="txt_reply">
        <p>올레길 제주 필수 코스죠. 걷다보면 힐링 로드 그 자체입니다. 가족 연인과 같이 가기 좋아요</p>
        <div class="date">
            <em class="name">몬*</em>
            <span>2025. 2. 3.</span>
        </div>
    </div>
    <span class="replyBtn active">
        <button type="button" class="btn2">
            <em class="blind">댓글</em>
            <span>0</span>
        </button>
    </span>
    <span class="btn_report">
        <button type="button" onclick="OpenReportPopup('b940dab6-e56b-4103-b120-a1f4c83c5e25');">신고하기</button>
    </span>
    <div class="replyBox" style="display: none;">
        <ul>
            <li class="inputcomment">
                <div class="mLine">
                    <div class="replyForm">
                        <form name="form">
                            <label class="blind" for="replyForm">글을 입력하세요.</label>
                            <span class="writeForm" style="height: 80px;">
                                <textarea class="comment" id="replyForm" rows="" placeholder="로그인 후 소중한 글을 남겨주세요." cols="" readonly="readonly"></textarea>
                                <p class="Textarea__Count-sc-1b9phu6-2 jvAusQ">0 / 1200 (추천 글자수: 30자 이내)</p>
                            </span>
                            <div class="btn">
                                <span class="fileRegbtn">
                                    <input type="file" class="fileUp" id="fileUpb940dab6-e56b-4103-b120-a1f4c83c5e25" name="fileUpb940dab6-e56b-4103-b120-a1f4c83c5e25" onchange="fileChange(this)" disabled="disabled">
                                        <label for="fileUpb940dab6-e56b-4103-b120-a1f4c83c5e25" class="btn_fileUp">파일찾기</label>
                                </span>
                                <a href="javascript:;" class="btn_apply ContentComment">로그인</a>
                            </div>
                        </form>
                    </div>
                </div>
            </li>
        </ul>
    </div>`;

    // 댓글 목록 제일 밑에 추가
    document.querySelector(".list_reply").querySelector("ul").appendChild(li);

    // 동적으로 생성된 댓글에 답글 달기 버튼
    document.querySelectorAll(".btn2").forEach((btn2) => {
        if (!btn2.getAttribute("listener")) {
            // 리스너가 없는 경우 추가
            btn2.setAttribute("listener", "true");
            btn2.addEventListener("click", (e) => {
                if (e.target.title == "선택됨") {
                    e.target.setAttribute("title", "");
                    e.target.closest("li").querySelector(".replyBox").style.display = "none";
                } else {
                    e.target.setAttribute("title", "선택됨");
                    e.target.closest("li").querySelector(".replyBox").style.display = "block";
                }

                // 로그인 됬을 때는 "등록"으로 변경
                if (document.querySelector(".replyWrap.login")) {
                    document.querySelectorAll(".ContentComment").forEach((e) => {
                        e.textContent = "등록";
                    });
                }
            });
        }
    });
    // 동적으로 생성된 댓글에 답글 달기 버튼

    // 동적으로 생성된 textarea에 글자 입력시 입력된 글자 수 보여주기
    document.querySelectorAll(".comment").forEach((comment) => {
        if (!comment.getAttribute("listener")) {
            // 리스너가 없는 경우 추가
            comment.setAttribute("listener", "true");
            comment.addEventListener("input", (e) => {
                e.target.nextElementSibling.textContent = `${e.target.value.length} / 1200 (추천 글자수: 30자 이내)`;
            });
        }
    });
    // 동적으로 생성된 textarea에 글자 입력시 입력된 글자 수 보여주기

    // 로그인 버튼 눌렀을 때 (로그인은 차후 반영)
    document.querySelectorAll(".ContentComment").forEach((ContentComment) => {
        if (!ContentComment.getAttribute("listener")) {
            // 리스너가 없는 경우 추가
            ContentComment.setAttribute("listener", "true");
            ContentComment.addEventListener("click", () => {
                if (document.querySelector(".ContentComment").textContent == "등록") {
                    return;
                }
                document.querySelector(".replyWrap").className = "replyWrap subscription login";
                document.querySelector(".writeForm").removeAttribute("style");
                document.querySelectorAll(".comment").forEach((e) => {
                    e.removeAttribute("readonly");
                    e.removeAttribute("style");
                    e.placeholder = "글을 남겨주세요.";
                });
                document.querySelectorAll(".fileUp").forEach((e) => {
                    e.removeAttribute("disabled");
                });
                document.querySelectorAll(".ContentComment").forEach((e) => {
                    e.textContent = "등록";
                });
            });
        }
    });
    // 로그인 버튼 눌렀을 때 (로그인은 차후 반영)
});
// 댓글 더보기 버튼

function commentresize(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
}
{
    /* <span class="writeForm" style="height: 80px;">
<textarea maxlength="1200" name="" rows="" class="comment" placeholder="로그인 후 글을 남겨주세요." cols="" onkeydown="commentresize(this);" readonly="readonly" style="height: 80px;"></textarea>
<p class="Textarea__Count-sc-1b9phu6-2 jvAusQ">0 / 1200 (추천 글자수: 30자 이내)</p>
</span>

<span class="writeForm" style="height: 80px;">
<textarea class="comment" id="replyForm" rows="" placeholder="로그인 후 소중한 글을 남겨주세요." cols="" readonly="readonly"></textarea>
<p class="Textarea__Count-sc-1b9phu6-2 jvAusQ">0 / 1200 (추천 글자수: 30자 이내)</p>
</span>
 */
}
