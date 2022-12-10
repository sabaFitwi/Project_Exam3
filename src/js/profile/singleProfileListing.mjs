import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";

const form = document.querySelector("#edit-form");

/**
 * submit register form data.
 * @param {Event} submit form submission

 */
form.addEventListener("submit", updateListener);

async function updateListener(event) {
  event.preventDefault();
  const form = event.target;
  const mediaInputs = Array.from(
    form.querySelectorAll("input[type=url]:enabled")
  );

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let id = params.get("id");

  const bodyData = {
    title: form.title.value,
    description: form.description.value,
    tags: form.tags.value
      .split(",")
      .map((tag) => tag.trim())
      .slice(0, 3),
    media: mediaInputs.map((image) => image.value),
    endsAt: new Date(form.endsAt.value),
  };
  console.log(bodyData);

  try {

    let response = await updateListing(bodyData, id);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  updateListing(bodyData);
}
async function updateListing(bodyData, id) {
  const API = `${Auction_API_URL}/listings/${id}`
  console.log(API);
  const options = {
    method: "PUT",
    body: JSON.stringify(bodyData),
    headers: headers("application/json"),
  };

  const response = await fetch(API, options);
  console.log(response);
  if (response.ok) {
    return await response.json();
  }

  throw new Error(response);
}
