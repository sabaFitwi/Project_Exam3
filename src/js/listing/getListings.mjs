import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
const listingsDiv = document.querySelector(".listings-div");

export async function getListings(limit = 20, offset = 0) {
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
  if (response.ok) {
    return data;
  }

  throw new Error(response.statusText);
}
getListings();

function getListingsTemplet(listings) {
  listingsDiv.innerHTML = "";
  if (listings) {
    listings.map(
      (listing) =>
        (listingsDiv.innerHTML += `<a href="view-detail/?id=${listing.id}" class="col-md-4 col-lg-4 col-xl-3 p-2 mt-5 shadow new">
          <div class="container border-0 ">
             <img  id="img" src="${listing.media[0]}"  class="img-thumbnail listing-image"  />
            <div class="text-center">
             <h4 class="text-capitalize  my-1">${listing.title}</h4>
             <p >${listing.description}</p>
             <p fw-bold>End date: <span text-primary f-large>${listing.endsAt}</span></p>
             <button type="buttom" class="btn btn-primary my-3"> view Detail
             <span> Bid(${listing._count.bids})</span>
              </button>
           </div>
          </div >
         </a > `)
    );
  }
}

// const images = document.querySelectorAll('img');

// images.forEach(img => {

//   img.addEventListener('error', function handleError() {
//     const defaultImage =
//       "https://picsum.photos/id/1/200/300";
//     console.log(defaultImage)
//     img.src = defaultImage;
//     img.alt = 'default';
//   });
// });
