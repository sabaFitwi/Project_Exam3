import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { displayError } from "../component/displayError.mjs";
//import { filterListings } from "../search/filter.mjs";
// import { countDown } from "../js/component/timeCount.mjs"
// const getCount = countDown("dec 19, 2022 00:00:00")
// console.log(getCount)

const listingsDiv = document.querySelector(".listings-div");

export async function getListings(limit = 20, offset = 0) {
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
      `${Auction_API_URL}/listings?limit=${limit}&offset=${offset}&sort=created&sortOrder=desc`,
      options
    );
    const data = await response.json();
    console.log(data);
    getListingsTemplet(data);
    //countDown(data.endsAt)
  } catch (error) {
    loaderButton.style.display = "none";
    listingsDiv.innerHTML = displayError("An error occurred. Please try again");

  }
}
getListings();

export function getListingsTemplet(listings) {
  // const countdownDiv = document.querySelector(countdownDiv)
  listingsDiv.innerHTML = "";
  if (listings) {
    listings.map(
      (listing) =>
      (listingsDiv.innerHTML += `<a href="/auction-house/view-detail/index.html?id=${listing.id}"  class="p-2 p-xl-3 col-sm-6 col-md-4 col-lg-3 listing-card mt-5 shadow new">
          <div class="container border-0">
             <img  id="img" class="img-thumbnail listing-image  rounded" src="${listing.media[0]}" onerror="src='/assets/images/image-default.jpg'"   />
            <div class="text-center">
             <h4 class="text-capitalize flex-shrink-1 my-1">${listing.title}</h4>
             <p fw-bold>End date: <div class="countdownDiv d-flex">

             </div> <span text-primary f-large>${listing.endsAt}</span></p>
             <button type="buttom" class="btn btn-primary my-3"> view Detail
             <span> Bid(${listing._count.bids})</span>
              </button>
           </div>
          </div >
         </a > `)
    );
  }
}
