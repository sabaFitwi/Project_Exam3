import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";

const form = document.querySelector("#sellForm");

/**
 * submit register form data.
 * @param {Event} submit form submission

 */
form.addEventListener("submit", sellListener);

async function sellListener(event) {
  event.preventDefault();
  const form = event.target;
  const mediaInputs = Array.from(
    form.querySelectorAll("input[type=url]:enabled")
  );

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
    // const queryString = window.location.search;
    // const params = new URLSearchParams(queryString);
    // let id = params.get("id");
    let response = await sellListing(bodyData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  //sellListing(bodyData);
}
async function sellListing(bodyData) {
  const options = {
    method: "post",
    body: JSON.stringify(bodyData),
    headers: headers("application/json"),
  };

  const response = await fetch(Auction_API_URL + "/listings", options);
  console.log(response);
  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
