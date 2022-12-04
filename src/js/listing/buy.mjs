import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
const form = document.querySelector("#bidForm")

//const buyBid = document.querySelector(".buy-bid")







// /**
//  * submit register form data.
//  * @param {Event} submit form submission

//  */
// form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const form = event.target

//     const bidInput = {
//         amount: form.amount.value,
//     };

//     console.log(bidInput);



//     buyListner(bidInput)
// });
// console.log("bidInput");
async function buyListner(amount) {

  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  console.log(id);

  const options = {
    headers: headers("application/json"),
    method: "post",
    body: JSON.stringify({ amount }),
  };
  const response = await fetch(
    `${Auction_API_URL}/listings/${id}/bids?`,
    options
  );
  const data = await response.json();
  console.log(data)

  bidTemplet(data)
  if (response.ok) {
    return data
  }

  throw new Error(response.statusText);
}
function bidTemplet(buy) {


  buyBid.innerHTML += ` <div class="col-12 bg-danger">
    <h1 class="fs-4">bid</h1>
  </div>
  <div class="card mb-3 col-12">
    <div class="row g-2">
      <div class="col-md-4">
        <img src="${buy.media}" class="img-fluid" alt="image" />
      </div>
      <div class="col-md-6">
        <div class="card-body">
          <h2 class="card-title fs-5">Description</h2>
          <p class="card-text">
          ${buy.description}
          </p>
          <p class="card-text">EndDate:${buy.endsAt}</p>
        </div>
      </div>
      <div class="col-md-2">
        <button class="btn btn-outline-warning btn-long cart" data-bs-toggle="modal" data-bs-target="#bidModal">
          Bid
        </button>
      </div>

    </div>
  </div>`


}



