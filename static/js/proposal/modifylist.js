// 수정 삭제 모달창 처리

document.querySelectorAll(".FvtMb").forEach((kebab) => {
    kebab.addEventListener("click", (e) => {
        document.querySelector("#modal-root").style.display = "flex";

        document.querySelector(".eCzJv").addEventListener("click", () => {
            document.querySelector("#modal-root").style.display = "none";
        });
    });
});
