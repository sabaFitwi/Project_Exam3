import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { load } from "../storage/localStorage.mjs";

async function viewAllProfiles() {
  const profile = load("profile");
  const name = profile.name;
  console.log(name);
  const options = {
    headers: headers("application/json"),
  };
  const api =
    Auction_API_URL + `/profiles/${name}/listings?_seller=true&_bids=true`;
  const response = await fetch(api, options);
  console.log(api);
  const result = await response.json();
  console.log(result);
  getListingsTemplet(result);
  //bidderTemplate(result.seller);
  return result;

  // profileInfoHeading(result);
}

function getListingsTemplet(profileListing) {
  const profileListingContainer = document.querySelector("#profile-listings");
  if (profileListing) {
    profileListing.map(
      (listing) =>
        (profileListingContainer.innerHTML += `<a href="/auction-house/v-detail/index.html?id=${listing.id}" class="col-md-4 col-lg-4 col-xl-3 p-2 mt-5 shadow new">
    <div class="container border-0 ">
       <img  id="img" src="${listing.media[0]}" onerror="src='https://picsum.photos/id/111/4400/2656'"  class="img-thumbnail listing-image"  />
      <div class="text-center">
       <h4 class="text-capitalize  my-1">${listing.title}</h4>
       <p >${listing.bids.description}</p>
       <p fw-bold>End date: <span text-primary f-large>${listing.bids.endsAt}</span></p>
       <button type="buttom" class="btn btn-primary my-3"> view Detail
       <span> Bid(${listing._count.bids})</span>
        </button>
     </div>
    </div >
   </a >`)
    );
  }
}

// const headerInfo = document.querySelector(".bidder")

// function bidderTemplate(bids) {
//   if (bids) {
//     Array.from(bids).forEach((bid) => {
//       let dates = new Date(`${bid[seller.length - 2]} `);

//       headerInfo.innerHTML += `
//     <tr>
//         <td>${seller.bidderName}</td>
//         <td>${dates
//           .toLocaleDateString("en-US", dateFormat)
//           .replace(/[/]/g, "-")}</td>
//         <td>${seller.amount}</td>
//       </tr > `;
//     });
//   }
// }

// headerInfo += `<table class="table bg-primary text-light">
//     <thead>
//       <tr>
//         <th scope="col" class="large-font">Your Listings</th>

//         <th scope="col">Listing Number: </th>
//         <th scope="col">Win:</th>
//       </tr>
//     </thead>
//   </table>`

viewAllProfiles();
