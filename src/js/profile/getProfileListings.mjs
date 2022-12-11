import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { load } from "../storage/localStorage.mjs";

async function viewBidsProfiles() {
  const profile = load("profile");
  const name = profile.name;
  console.log(name);
  const options = {
    headers: headers("application/json"),
  };
  const api =
    Auction_API_URL + `/profiles/${name}/bids?_listings=true`;
  const response = await fetch(api, options);
  console.log(api);
  const result = await response.json();
  console.log(result);
  getYourBids(result);
  return result;
}

function getYourBids(bidsListing) {
  const profileBidsContainer = document.querySelector("#profile-bids");


  if (bidsListing) {
    bidsListing.map(
      (profile) =>
      (profileBidsContainer.innerHTML += `<a href="../profile-detail/index.html?id=${profile.listing.id}" class="col-md-4 col-lg-4 col-xl-3 p-2 mt-5 shadow new">
                                          <div class="container border-0 ">
                                              <img  id="img" src="${profile.listing.media[0]}" onerror="src='https://picsum.photos/id/111/4400/2656'"  class="img-thumbnail listing-image"  />
                                            <div class="text-center div-container">
                                              <h4 class="text-capitalize  my-1">${profile.listing.title}</h4>
                                            
                                              <p fw-bold>End date: <span text-primary f-large>${profile.listing.endsAt}</span></p>      
                                            </div> 
                                            <button type="buttom" class="btn btn-primary my-3"> 
                                            Bids(${profile.amount})
                                              </button>
                                          </div >
                                        </a >`

      ),


    );
  }
}




async function viewAllProfiles() {
  const profile = load("profile");
  const name = profile.name;
  console.log(name);
  const options = {
    headers: headers("application/json"),
  };
  const api =
    Auction_API_URL + `/profiles/${name}/listings`;
  const response = await fetch(api, options);
  console.log(api);
  const result = await response.json();
  console.log(result);
  getListingsTemplet(result);

  return result;


}


function getListingsTemplet(profileListing) {
  const profileListingContainer = document.querySelector("#profile-listings");


  if (profileListing) {

    profileListing.map(
      (profile) =>
      (profileListingContainer.innerHTML += `<a href="../profile-detail/index.html?id=${profile.id}" class="col-md-4 col-lg-4 col-xl-3 p-2 mt-5 shadow new">
                                          <div class="container border-0 ">
                                              <img  id="img" src="${profile.media[0]}" this.onerror="src='/assets/images/profile.jpg'"  class="img-thumbnail listing-image"  />
                                            <div class="text-center div-container">
                                              <h4 class="text-capitalize  my-1">${profile.title}</h4>
                                            
                                              <p fw-bold>End date: <span text-primary f-large>${profile.endsAt}</span></p>      
                                            </div> 
                                            <button type="buttom" class="btn btn-primary my-3"> 
                                            Bids(${profile._count.bids})
                                              </button>
                                          </div >
                                        </a >`

      ),


    );
  }
}



viewAllProfiles();
viewBidsProfiles()
