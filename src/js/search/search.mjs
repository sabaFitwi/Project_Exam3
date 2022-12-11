import { getListingsTemplet } from "../listing/getListings.mjs"




let data = [];
/**
 *uses the input value to filter the user by its title and name
 * @param {keyup} event
 */

const listingsDiv = document.querySelector(".listings-div");

const searchInput = document.querySelector("input[name=search]");

searchInput.addEventListener("keyup", (event) => {
    const inputValue = event.target.value.toLowerCase();

    const inputResult = data.filter((listing) => {

        if (
            listing.title.toLowerCase().startsWith(inputValue) ||
            listing.seller.name.toLowerCase().startsWith(inputValue)
        ) {
            return true;

        }
        // else {
        //     return `<div class="danger">Search Not found</div>`;
        // }
    });
    console.log(inputResult)


    getListingsTemplet(inputResult);

    listingsDiv.innerHTML = getListingsTemplet(inputResult)
});


