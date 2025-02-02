document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('span[class*="show"]').forEach((span) => {
        span.addEventListener("click", () => {
            const parentContainer = span.closest(".spans");
            if (!parentContainer) return;

            const allULs = parentContainer.parentElement.querySelectorAll("ul");
            if (allULs.length === 0) return;
            allULs.forEach((ul) => ul.classList.add("hidden"));

            parentContainer
                .querySelectorAll('span[class*="show"]')
                .forEach((s) => s.classList.remove("active"));

            const spanPrimaryClass = [...span.classList].find((cls) =>
                cls.startsWith("show")
            );
            if (!spanPrimaryClass) return;
            const targetClass = spanPrimaryClass.replace("1", "0");

            const targetUl = parentContainer.parentElement.querySelector(
                `.${targetClass}`
            );
            if (!targetUl) return;
            targetUl.classList.remove("hidden");

            span.classList.add("active");
        });
    });
});
