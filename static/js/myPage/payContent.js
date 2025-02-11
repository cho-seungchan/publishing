// NodeList.prototype.filter = Array.prototype.filter;

const checkAll = document.querySelector(".checkboxAll");
const checkbox = document.querySelectorAll(".otherCheckbox");

checkAll.addEventListener("change", (e) => {
    checkbox.forEach((input) => {
        input.checked = e.target.checked;
    });
});

// checkbox.forEach((check) => {
//     check.addEventListener("change", (e) => {
//         checkAll.checked =
//             checkbox.filter((check) => check.checked).length === 5;
//     });
// });

checkbox.forEach((check) => {
    check.addEventListener("change", function () {
        checkAll.checked = [...checkbox].every((cb) => cb.checked);
    });
});
