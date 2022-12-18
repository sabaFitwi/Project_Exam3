import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { load } from "../storage/localStorage.mjs";
import { displayError } from "../component/displayError.mjs";
import { countDown } from "../component/timeCount.mjs"
const profileBidsContainer = document.querySelector("#profile-bids");
const profileListingContainer = document.querySelector("#profile-listings");

export async function viewBidsProfiles() {
  profileBidsContainer.innerHTML += `<div class="d-flex justify-content-center">
  <div class="spinner-border loader-size text-primary " role="status">
    <span class="sr-only">Loading...</span>
  </div>`;
  const loaderButton = document.querySelector(".loader-size");
  const profile = load("profile");
  const name = profile.name;
  console.log(name);
  try {
    const options = {
      headers: headers("application/json"),
    };
    const api = Auction_API_URL + `/profiles/${name}/bids?_listings=true`;
    const response = await fetch(api, options);
    console.log(api);
    const result = await response.json();
    console.log(result);
    getYourBids(result);
    return result;
  } catch (error) {
    loaderButton.style.display = "none";
    profileBidsContainer.innerHTML = displayError("An error occurred. Please try again");
  }
}

export function getYourBids(bidsListing) {
  profileBidsContainer.innerHTML = "";
  if (bidsListing) {
    bidsListing.map(
      (profile) =>
      (profileBidsContainer.innerHTML += `<a href="../profile-detail/index.html?id=${profile.listing.id}" class="col-md-4 col-lg-4 col-xl-3 p-2 mt-5 shadow new">
                                          <div class="container border-0 ">
                                              <img  id="img" src="${profile.listing.media[0]}" onerror="src='/assets/images/image-default.jpg'"  class="img-thumbnail listing-image  rounded"  />
                                            <div class="text-center div-container">
                                              <h4 class="text-capitalize  my-1">${profile.listing.title}</h4>
                                            
                                              <p fw-bold>End date: <span text-primary f-large>${profile.listing.endsAt}</span></p>      
                                            </div> 
                                            <div  class=" bg-secondary my-3  p-2 text-capitalize fs-5"> <strong> 
                                         Bids amount: $ ${profile.amount}</strong>
                                              </div>
                                          </div >
                                        </a >`)
    );
  }
}


export async function viewAllProfiles() {
  const profile = load("profile");
  const name = profile.name;
  console.log(name);
  profileListingContainer.innerHTML += `<div class="d-flex justify-content-center">
  <div class="spinner-border loader-size text-primary " role="status">
    <span class="sr-only">Loading...</span>
  </div>`;
  const loaderButton = document.querySelector(".loader-size");
  try {
    const options = {
      headers: headers("application/json"),
    };
    const api = Auction_API_URL + `/profiles/${name}/listings`;
    const response = await fetch(api, options);
    console.log(api);
    const result = await response.json();
    console.log(result);
    getProfilesTemplet(result);

    return result;
  } catch (error) {
    loaderButton.style.display = "none";
    profileListingContainer.innerHTML = displayError("An error occurred. Please try again");
  }
}

export function getProfilesTemplet(profileListing) {
  profileListingContainer.innerHTML = "";
  if (profileListing) {
    profileListing.map(
      (profile) =>
      (profileListingContainer.innerHTML += `       
                             <a href="../profile-detail/index.html?id=${profile.id} " 
                             class="col-md-4 col-lg-3 col-xl-3 p-2 listing-card mt-5 shadow new ">
                                          <div class="container border-1 ">
                                         
                                           <img src="${profile.media[0]}" this.onerror="src='/assets/images/profile.jpg'"  class="img-thumbnail listing-image"  />
                                            <div class="text-center div-container">
                                              <h4 class="text-capitalize  my-1">${profile.title}</h4>
                                            
                                              <p fw-bold>End date: <span text-primary f-large>${countDown(profile.endsAt)}</span></p>      
                                            </div> 
                                            <div  class=" bg-secondary my-3  p-2 text-capitalize fs-5"> <strong> bids: ${profile._count.bids}</strong>
                                          
                                              </div>
                                          
                                       
                                          </div>
                                              
                                        </a >`)
    );
  }
}

async function viewBidswins() {
  const profile = load("profile");
  const name = profile.name;
  console.log(name);
  const options = {
    headers: headers("application/json"),
  };
  const api = Auction_API_URL + `/profiles/${name}?_listings=true`;
  const response = await fetch(api, options);

  const result = await response.json();
  console.log(result);
  getWinsTemplet(result)

  return result;
}


function getWinsTemplet(profile) {
  const profileInfo = document.querySelector("#profile-info-listing");


  profileInfo.innerHTML += `       
      
    
        <tr class="text-capitalize  p-2 fs-4">
          <th scope="col" >${profile.name}'s Listings</th>
          <th scope="col">Listing Number: ${profile._count.listings}</th>
          <th scope="col">Win: ${profile.wins.length}</th>
        </tr>
    
   `
    ;
}


viewBidswins()
viewAllProfiles();
viewBidsProfiles();
