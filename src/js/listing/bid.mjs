import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";

const form = document.querySelector("#bidForm");

/**
 * submit register form data.
 * @param {Event} submit form submission
 
 */
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;

    const formData = new FormData(form);
    const sellsInput = Object.fromEntries(formData.entries());
    console.log(sellsInput);

    sellListing(sellsInput);
});

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
let id = params.get("id");

async function sellListing(amount) {
    const options = {
        method: "post",
        body: JSON.stringify(amount),
        headers: headers("application/json"),
    };

    const response = await fetch(
        `${Auction_API_URL}/listings/${id}/bids`,
        options
    );
    console.log(response);
    if (response.ok) {
        return await response.json();
    }

    throw new Error(response.statusText);
}
