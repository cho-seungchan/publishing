const inputName = document.querySelector(".checkName");
const saveButton = document.querySelector(".saveButton");

saveButton.addEventListener("click", () => {
    if (inputName.value.length < 1 || inputName.value.length > 20) {
        alert("최소1자/최대20자 까지 입력해주세요.");
    } else if (/\s/.test(inputName.value)) {
        alert("닉네임에 공백문자는 사용할 수 없습니다.");
    }
});

const uploadImages = document.querySelectorAll(".uploadImage"); // 여러 개의 이미지 가져오기
const fileInput = document.getElementById("fileInput");

// 모든 이미지에 클릭 이벤트 추가 (파일 선택 창 열기)
uploadImages.forEach((uploadImage) => {
    uploadImage.addEventListener("click", () => {
        fileInput.click();
    });
});

// 파일 선택하면 모든 이미지 변경
fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadImages.forEach((uploadImage) => {
                if (uploadImage.classList.contains("mainProfile")) {
                    uploadImage.src = e.target.result;
                }
            });
        };
        reader.readAsDataURL(file);
    }
});
