// 로그인 버튼 눌렀을 때 (로그인은 차후 반영)
document.querySelector(".ContentComment").addEventListener("click", () => {
    if (document.querySelector(".ContentComment").textContent == "등록") {
        return;
    }
    document.querySelector(".replyWrap").className = "replyWrap subscription login";
    document.querySelector(".writeForm").removeAttribute("style");
    document.querySelector("#comment").removeAttribute("readonly");
    document.querySelector("#comment").removeAttribute("style");
    document.querySelector("#comment").textContent = "질문을 남겨주세요.";
    document.querySelector("#fileUp").removeAttribute("disabled");
    document.querySelector(".ContentComment").textContent = "등록";
});
// 로그인 버튼 눌렀을 때 (로그인은 차후 반영)

// 댓글 더보기 버튼

{
    /* <ul>
<li id="25b753aa-b601-4ce1-baed-ec474e50fa6b">
    <div class="profile">
        <div class="photo" icid="25b753aa-b601-4ce1-baed-ec474e50fa6b" style="background-image:url(https://ssl.pstatic.net/static/pwe/address/img_profile.png)"></div>
        <span class="ico">
            <img src="https://korean.visitkorea.or.kr/resources/images/sub/ico_naver.png" alt="네이버">
        </span>
    </div>
    <div class="txt_reply">	
        <p>올레길을 걷다보면 자동으로 힐링이 되는 기분 너무 좋아요</p>
        <div class="date">	
            <em class="name">g*****4</em>
            <span>2025. 1. 7.</span>
        </div>
    </div>
    <span class="replyBtn active">
        <!-- <button type="button" class="btn1" title="">
            <em class="blind">좋아요</em>
            <span>0</span>
        </button> -->
        <button type="button" class="btn2">
            <em class="blind">댓글</em>
            <!-- <span>0</span> -->
        </button>
    </span>
    <!-- <span class="btn_report">
        <button type="button" onclick="OpenReportPopup('25b753aa-b601-4ce1-baed-ec474e50fa6b');">신고하기</button>
    </span> -->
    <div class="replyBox" style="display: none;">	
        <ul>	
            <li class="inputcomment">
                <div class="mLine">	
                    <div class="replyForm">	
                        <form name="form">	
                            <label class="blind" for="replyForm">답글을 입력하세요.</label>		
                            <textarea class="comment" id="replyForm" rows="" placeholder="로그인 후 소중한 답글을 남겨주세요." cols="" readonly="readonly"></textarea>		
                            <div class="btn">
                                <span class="fileRegbtn">
                                    <input type="file" class="fileUp" id="fileUp25b753aa-b601-4ce1-baed-ec474e50fa6b" name="fileUp25b753aa-b601-4ce1-baed-ec474e50fa6b" onchange="fileChange(this)" disabled="disabled">
                                    <label for="fileUp25b753aa-b601-4ce1-baed-ec474e50fa6b" class="btn_fileUp">파일찾기</label>		
                                </span>	
                                <a href="javascript:;" class="btn_apply ContentComment">로그인</a>
                            </div>
                        </form>	
                    </div>	
                </div>
            </li>
        </ul>
    </div>
</li>
</ul> */
}

// 댓글 더보기 버튼
