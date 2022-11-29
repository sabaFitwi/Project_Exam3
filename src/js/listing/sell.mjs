import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";


const form = document.querySelector("#sellForm");

/**
 * submit register form data.
 * @param {Event} submit form submission
 
 */


async function createUpdateFormListener(event) {
    event.preventDefault();

    const mediaInputs = Array.from(
        event.target.querySelectorAll("input[type=url]:enabled")
    );

    console.log(event.target.endingAt);
    const bodyData = {
        title: event.target.title.value,
        description: event.target.description.value,
        tags: event.target.tags.value
            .split(",")
            .map((tag) => tag.trim())
            .slice(0, 8),
        media: mediaInputs.map((input) => input.value),
        endsAt: new Date(event.target.endingAt.value),
    };
    console.log(bodyData);

    try {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        let id = params.get("id");
        let response = {};

        if (id === null) {
            response = await sellListing(bodyData);
        } else {
            console.log("hihi")
            // response = await updateListing(bodyData, id);
        }
        //console.log(response);

        // const deleted = await deleteListing(response.id);
        //console.log(deleted);
    } catch (error) {
        console.log(error);
    }
};

async function sellListing(bodyData) {
    const options = {
        method: "post",
        body: JSON.stringify(bodyData),
        headers: headers("application/json"),
    }

    const response = await fetch(Auction_API_URL + "/listings", options);
    console.log(response);
    if (response.ok) {
        return await response.json();
    }

    throw new Error(response.statusText);

}
form.addEventListener("submit", createUpdateFormListener())