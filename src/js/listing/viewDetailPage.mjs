import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { dateOptions as dateFormat } from "../component/dateConverter.mjs";
import { load } from "../storage/localStorage.mjs"
const viewDetails = document.querySelector(".view-detail");
const bidder = document.querySelector(".bidder");
//const form = document.querySelector("#bidForm");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const profile = load("profile")

export async function getListing() {
  const options = {
    headers: headers("application/json"),
  };
  const response = await fetch(
    `${Auction_API_URL}/listings/${id}?_seller=true&_bids=true`,
    options
  );
  const data = await response.json();
  console.log(data);

  detailsTemplet(data);

  bidderTemplate(data.bids);
  if (response.ok) {
    return data;
  }

  throw new Error(response.statusText);
}

function detailsTemplet(list) {
  let date = new Date(`${list.endsAt}`);
  console.log(date);

  viewDetails.innerHTML += `
  <div class="container rounded bg-white mt-5 mb-5">
  <div class="row">
      <div class="col-md-12 col-lg-3 d-flex flex-column border-0 bg-info shadow justify-content-start align-items-center p-5 ">
      <img
      src="${list.seller.avatar}"
      class="img-thumbnail rounded-circle me-2 avatar-profile-image"
      alt="avatar"
    />
    <h4 class="mt-3">${list.seller.name}</h4>
    <p class="mt-1">${list.seller.email}</p>
       </div>

    <div class="col-12 col-md-12 col-lg-9 mt-1">
    <div class="d-flex flex-column justify-content-center w-100 mx-auto">
    <div class="col-12">
      <table class="table bg-primary text-light">
        <thead>
          <tr>
            <th scope="col">Title: ${list.title}</th>

            <th scope="col">Auction End Date:${date
      .toLocaleDateString("en-US", dateFormat)
      .replace(/[/]/g, "-")} </th>
            <th scope="col">Action</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="card mb-3 col-12">
      <div class="row g-2">
        <div class="col-md-4">
          <img src="${list.media[0]
    }" this.onerror="src='/assets/images/image-default.jpg'" class="img-fluid" alt="${list.title
    }" />
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h2 class="card-title fs-5">Description</h2>
          
            <p class="card-text">
            ${list.description}
            </p>  <hr/>
            <p class="card-text">EndDate: ${date
      .toLocaleDateString("en-US", dateFormat)
      .replace(/[/]/g, "-")}</p>
          </div>
        </div>
        <div class="col-md-2"  >
        ${profile ? (` <button class="btn btn-outline-warning btn-long cart" data-bs-toggle="modal" data-bs-target="#bidModal">Bids ${list._count.bids
      } </button>`) : (` <div></div>`)
    }
               
        </div>
      </div>
    </div>
  </div>
  </div> 





`;
}

function bidderTemplate(bids) {
  if (bids) {
    Array.from(bids).forEach((bid) => {
      let date = new Date(`${bid.created}`);
      bidder.innerHTML += `
    <tr>       
        <td>${bid.bidderName}</td>
        <td>${date
          .toLocaleDateString("en-US", dateFormat)
          .replace(/[/]/g, "-")}</td>
        <td>${bid.amount}</td>
      </tr > `;
    });
  }
}

getListing();

// /**
//  * submit register form data.
//  * @param {Event} submit form submission

//  */
// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const form = event.target;

//   const bidInput = {
//     id: event.target.id,
//     amount: form.amount.value,
//   };

//   console.log(bidInput);

//   buyListner(bidInput);
// });

// async function buyListner(amounts) {
//   const options = {
//     headers: headers("application/json"),
//     method: "post",
//     body: JSON.stringify({ amounts }),
//   };
//   const response = await fetch(
//     `${Auction_API_URL} /listings/${id} /bids`,
//     options
//   );
//   const data = await response.json();
//   console.log(data);

//   if (response.ok) {
//     return data;
//   }

//   throw new Error(response.statusText);
// }
