import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { displayError } from "../component/displayError.mjs";
import { countDown } from "../component/timeCount.mjs"


/**
 * Get a listings
 * @param {string} id the posts id
 * @returns {Promise<Array>} Response array of listing objects.
 */

const listingsDiv = document.querySelector(".listings-div");

export async function getListings(limit = 100, offset = 0) {
  listingsDiv.innerHTML += `<div class="d-flex justify-content-center">
  <div class="spinner-border loader-size text-primary " role="status">
    <span class="sr-only">Loading...</span>
  </div>`;
  const loaderButton = document.querySelector(".loader-size");
  try {
    const options = {
      headers: headers("application/json"),
    };
    const response = await fetch(
      `${Auction_API_URL}/listings?limit=${limit}&offset=${offset}&sort=created&sortOrder=desc&_seller=true&_bids=true`,
      options
    );
    const data = await response.json();

    console.log(data);

    getListingsTemplet(data);
    return data

  } catch (error) {
    loaderButton.style.display = "none";
    listingsDiv.innerHTML = displayError("An error occurred. Please try again");
  }
}
getListings();

export function getListingsTemplet(listings) {

  listingsDiv.innerHTML = "";
  if (listings) {

    listings.map(
      (listing) =>


      (listingsDiv.innerHTML += `<a href="/auction-house/view-detail/index.html?id=${listing.id}"  class="p-2 p-xl-3 col-sm-6 col-md-4 col-lg-3 loader-div listing-card mt-5 shadow new">
          <div class="container border-0">
             <img  id="img" class="img-thumbnail listing-image  rounded" src="${listing.media[0]}" onerror="src='/assets/images/image-default.jpg'"   />
            <div class="text-center">
             <h4 class="text-capitalize flex-shrink-1 my-1">${listing.title}</h4>
             <div fw-bold>Time Left: <span text-primary f-large>${countDown(listing.endsAt)}</span></div>
             <button type="buttom" class="btn btn-primary my-3"> view Detail
             <span> Bid(${listing._count.bids})</span>
              </button>
           </div>
          </div >
         </a > `)
    );
  }
}
