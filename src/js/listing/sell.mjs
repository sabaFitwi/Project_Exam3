import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";


const form = document.querySelector("#sellForm");
const newTags = []
/**
 * submit register form data.
 * @param {Event} submit form submission
 
 */
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target

    const sellsInput = {
        title: form.title.value,
        tags: form.tags.value,
        media: form.media.value,
        description: form.description.value,
        endsAt: form.endsAt.value
    };

    console.log();



    sellListing(sellsInput)
});



async function sellListing(title, description, media, tags, endsAt) {
    const options = {
        method: "post",
        body: JSON.stringify({ title, description, media, tags, endsAt }),
        headers: headers("application/json"),
    }

    const response = await fetch(Auction_API_URL + "/listings", options);
    console.log(response);
    if (response.ok) {
        return await response.json();
    }

    throw new Error(response.statusText);

}