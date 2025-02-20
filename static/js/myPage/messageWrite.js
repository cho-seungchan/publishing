const button = document.querySelector(".uploadButton");
const parent = document.querySelector(".imageContainer");
const lastChild = document.querySelector(".lastChild");

button.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newDiv = document.createElement("div");
            newDiv.classList.add(
                "ImageList__ImageWrapper-sc-9v1mt2-1",
                "kZTsQf",
                "imageWrap"
            );

            newDiv.innerHTML = `
                <div class="ImageList__ImageWrapper-sc-9v1mt2-1 kZTsQf">
                    <div class="Image__Wrapper-v97gyx-0 gDuKGF">
                        <div class="Ratio" style="display: block">
                            <div class="Ratio-ratio" style="height: 0px; position: relative; width: 180px; padding-top: 100%">
                                <div class="Ratio-content" style="height: 100%; left: 0px; position: absolute; top: 0px; width: 100%">
                                    <img src="${e.target.result}" alt="후기 이미지" class="Image__DefaultImage-v97gyx-3 hVNKgp" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E %3Cg fill='none' fill-rule='nonzero'%3E %3Cpath fill='%23FFF' fill-opacity='0' d='M0 0h18v18H0z'/%3E %3Cg stroke='%23FFF' stroke-linecap='square'%3E %3Cpath d='M11.828 6.172l-5.656 5.656M11.828 11.828L6.172 6.172'/%3E %3C/g%3E %3C/g%3E %3C/svg%3E" class="ImageList__IconDelete-sc-9v1mt2-2 benIbu cancelButton" />
                </div>
            `;

            parent.append(newDiv);
        };
        reader.readAsDataURL(file);
    }
});

const textContent = document.querySelector(".textContent");
const characters = document.querySelector(".characters");
const receiver = document.querySelector(".inputBox");

textContent.addEventListener("input", () => {
    const text = textContent.value;
    characters.innerHTML = text.length + ` / 1200 (추천 글자수: 30자 이내)`;
});

const sendButton = document.querySelector(".sendButton");

sendButton.addEventListener("click", () => {
    if (receiver.value.length === 0) {
        alert("받는 사람을 입력해주세요!");
    } else if (textContent.value.length === 0) {
        alert("내용을 입력해주세요!");
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cancelButton")) {
        const parentElement = e.target.parentElement;
        console.log(parentElement.parentElement.classList);
        if (parentElement.parentElement.classList.contains("imageWrap")) {
            parentElement.parentElement.remove();
        } else {
            parentElement.remove();
        }
    }
});
