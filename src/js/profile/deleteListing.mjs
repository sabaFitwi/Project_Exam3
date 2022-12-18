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
    if (response.ok) {
      window.location.href = "../profile/";
    }
  } catch (error) {
    console.log(error);

  }
}

/**
 * Deletes a listing
 * @param {String} id Listings id
 * @returns
 */
async function deleteListing(id) {
  const API = `${Auction_API_URL}/listings/${id}`;

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
