import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { load } from "../storage/localStorage.mjs"
const profileByBids = document.getElementById("profile-by-bids")


async function viewAllProfiles(limit = 20, offset = 0) {
    const { name } = load("profile")
    console.log(name)
    const options = {
        headers: headers("application/json"),
    };
    const response = await fetch(Auction_API_URL + `/profiles/${name}_?_listings=true`, options);
    const result = await response.json();
    console.log(result);
}
viewAllProfiles()


function getListingsTemplet(profileBids) {
    profileByBids.innerHTML = "";
    if (profileBids) {
        profileBids.map((profile) => {
            profileByBids.innerHTML += `<div class="row g-2">
            <div class="col-md-4">
              <img src="/assets/images/8.jpg" class="img-fluid" alt="avatar" />
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h2 class="card-title fs-5">Description</h2>
                <p class="card-text">
                  This is a wider card with supporting text below as a
                  natural lead-in to additional content. This content is a
                  little bit longer.
                </p>
                <p class="card-text">EndDate: 12/12/22</p>
              </div>
            </div>
            <div class="col-md-2">
              <a href="/bid/index.html"><button class="btn btn-outline-warning btn-long cart">
                  Bid
                </button></a>
            </div>
          </div>`
        })
    }
}


