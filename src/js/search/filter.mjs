

const filterButtons = document.querySelectorAll(".filter-title");

export function filterListings(newCardBody) {
    filterButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            for (let i = 0; i < filterButtons.length; i++) {
                filterButtons[i].classList.remove("active");
            }
            button.classList.add("active");
            let datafilter = event.target.dataset.filter;
            for (let k = 0; k < newCardBody.length; k++) {
                const blockCaterory = newCardBody[k].getAttribute("data-category");



                if (blockCaterory == datafilter || datafilter == "all") {
                    newCardBody[k].style.display = "block";
                } else {
                    newCardBody[k].style.display = "none";
                }
            }
        });
    });
}