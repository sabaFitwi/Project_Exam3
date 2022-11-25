import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";


const form = document.querySelector("#sellForm");

/**
 * submit register form data.
 * @param {Event} submit form submission
 
 */
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target
    const formData = new FormData(form)
    const sellsInput = Object.fromEntries(formData.entries())
    console.log(sellsInput)


    sellListing(sellsInput)
}); async function sellListing(title, description, media, tags, endsAt) {
    const options = {
        method: "post",
        body: JSON.stringify({ title, description, media, tags, endsAt }),
        headers: headers("application/json"),
    }

    const response = await fetch(Auction_API_URL + "/listings", options);
    console.log(response)
    if (response.ok) {
        return await response.json();
    }

    throw new Error(response.statusText);
}