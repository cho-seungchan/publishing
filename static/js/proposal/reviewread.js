// dropdown menu 클릭시 처리
// hSyPxW => idBToY button text
const ldipRM = document.createElement("div");
ldipRM.className = "FilterReview__AbsoluteDropMenuWrapper-t2nsz-2 ldipRM";
ldipRM.innerHTML = `<button class="FilterReview__Option-t2nsz-3">평점 높은순</button
                    ><button class="FilterReview__Option-t2nsz-3">평점 낮은순</button
                    ><button class="FilterReview__Option-t2nsz-3">최신순</button
                    ><button class="FilterReview__Option-t2nsz-3">도움순</button>`;

document.querySelector(".dYjXLj button").addEventListener("click", (e) => {
    document.querySelector(".dYjXLj").querySelector("div").appendChild(ldipRM); // dropdown menu 생성
    const titleMenu = document.querySelector(".dYjXLj button").childNodes[0].textContent;
    document.querySelectorAll(".FilterReview__Option-t2nsz-3").forEach((e) => {
        // 타이틀과 같은 버튼 진하게
        if (e.textContent.trim() === titleMenu.trim()) {
            e.classList.add("idBToY");
        } else {
            e.classList.add("hSyPxW");
        }
    });

    document.querySelector(".dYjXLj").addEventListener("click", (e) => {
        // 눌린 메뉴로 타이틀 바꿔주기
        if (e.target.classList.contains("FilterReview__Option-t2nsz-3")) {
            document.querySelector(".dYjXLj button").childNodes[0].textContent = e.target.textContent;
            document.querySelector(".ldipRM").remove();
        }
    });
});
// dropdown menu 클릭시 처리
