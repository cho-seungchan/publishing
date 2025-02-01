// dropdown menu 클릭시 처리
// hSyPxW => idBToY button text
const ldipRM = document.createElement("div");
ldipRM.className = "FilterReview__AbsoluteDropMenuWrapper-t2nsz-2 ldipRM";
ldipRM.innerHTML = `<button class="FilterReview__Option-t2nsz-3 idBToY">평점 높은순</button
                    ><button class="FilterReview__Option-t2nsz-3 hSyPxW">평점 낮은순</button
                    ><button class="FilterReview__Option-t2nsz-3 hSyPxW">최신순</button
                    ><button class="FilterReview__Option-t2nsz-3 hSyPxW">도움순</button>`;

document.querySelector(".dYjXLj button").addEventListener("click", (e) => {
    document.querySelector(".dYjXLj").querySelector("div").appendChild(ldipRM);

    document.querySelector(".dYjXLj").addEventListener((e) => {
        if (e.target.classList.contains("FilterReview__Option-t2nsz-3")) {
            document.querySelectorAll(".FilterReview__Option-t2nsz-3").forEach((e) => {
                if (e.classList.contains("idBToY")) {
                    e.classList.remove("idBToY");
                    e.classList.add("hSyPxW");
                }
            });
            e.target.classList.remove("hSyPxW");
            e.target.classList.remove("idBToY");
        }
    });
});
// dropdown menu 클릭시 처리

/*<div class="FilterReview__Wrapper-t2nsz-0 dYjXLj">
                                    <button type="button">
                                        평점 높은순<img
                                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E %3Cg fill='none' fill-rule='evenodd'%3E %3Cpath d='M18 0H0v18h18z'/%3E %3Cpath stroke='%23000' stroke-width='1.5' d='M7 5l4 4-4 4'/%3E %3C/g%3E %3C/svg%3E"
                                            class="FilterReview__Caret-t2nsz-1 esTgfk"
                                            style="transform: rotate(90deg)"
                                        />
                                    </button>
                                    <div></div> </div>*/
