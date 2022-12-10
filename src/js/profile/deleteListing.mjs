import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";

const deleteBtn = document.querySelector("#delete-btn");

deleteBtn.addEventListener("click", deleteListener);

async function deleteListener() {
  try {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    let id = params.get("id");
    const response = await deleteListing(id);
    if (response) {
      location.href = "../profile/";
    }
  } catch (error) {
    console.log(error);
    // const errorContainer = document.querySelector("#error-reporting-container");
    // errorContainer.innerHTML = `<p class="p-3 text-losing bg-secondary">An error occurred please refresh and try again.</br> Listing might no longer exists. </p>`;
    // location.hash = "#error-reporting-container";
  }
};

async function deleteListing(id) {
  const API = `${Auction_API_URL}/listings/${id}`

  const options = {
    method: "DELETE",
    headers: headers("application/json"),
  };

  const response = await fetch(API, options);

  if (response.ok) {
    return true;
  }

  throw new Error(response);
}
