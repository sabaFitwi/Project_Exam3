import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { dateOptions as dateFormat } from "../component/dateConverter.mjs";
const viewDetails = document.querySelector(".view-detail");
const bidder = document.querySelector(".bidder");


const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id);

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
  <div class="container-fluid rounded mt-5 mb-5">
  <div class="row ">
      <div class="col-md-12 col-lg-3 d-flex flex-column bg-info border-0 shadow justify-content-start align-items-center p-5 ">
      <img
      src="${list.seller.avatar}"
      class="img-thumbnail rounded-circle me-2 avatar-profile-image"
      alt="avatar"
    />
    <h4 class="mt-3 text-capitalize text-primary  fw-bolder fs-3">${list.seller.name
    }</h4>
    <p class="mt-1 fs-5">${list.seller.email}</p>
    </div>

    
    <div class="col-12 col-md-12 col-lg-9 mt-1">
    <div class="d-flex flex-column justify-content-center w-100 mx-auto">
    <div class="col-12">
      <table class="table bg-primary text-light">
        <thead>
          <tr class=" fs-5">
            <th class"fs-3 fw-bolder" scope="col">Title: ${list.title}</th>

            <th scope="col">End Date:${date
      .toLocaleDateString("en-US", dateFormat)
      .replace(/[/]/g, "-")} </th>
            <th scope="col">Action</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="card ms-2 mb-3 col-12">
      <div class="row g-2">
        <div id="carouselExampleFade" class="carousel slide carousel-fade col-md-6" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
               <img src="${list.media[0]}" class="img-fluid d-block w-100" alt="${list.title}" />
          </div>
         
          <div class="carousel-item">
              <img src="${list.media[1]
    }" onerror="src='/assets/images/image-default.jpg'" class="col-3 m-1 d-block w-100 " alt="${list.title
    }" /></div>
    <div class="carousel-item">
              <img src="${list.media[2]
    }"onerror="src='/assets/images/image-default.jpg'" class="col-3 m-1 d-block w-100 " alt="${list.title
    }" /></div>
    <div class="carousel-item">
              <img src="${list.media[3]
    }"onerror="src='/assets/images/image-default.jpg'" class="col-3 m-1 d-block w-100 l" alt="${list.title
    }" /></div>
    <div class="carousel-item">
              <img src="${list.media[4]
    }"onerror="src='/assets/images/image-default.jpg'" class="col-3 m-1 d-block w-100  " alt="${list.title
    }" />
    </div>
       </div>  
       <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>  
        </div>
        <div class="col-md-4">
          <div class="card-body">
            <h2 class="card-title fw-bold tex-dark fs-4">Description</h2>
            
            <p class="card-tex  ">
            ${list.description}
            </p>
            <p class="card-text">EndDate: ${date
      .toLocaleDateString("en-US", dateFormat)
      .replace(/[/]/g, "-")}</p>
          </div>
        </div>
        <div class="col-md-2 d-flex flex-column gap-2">
        <a href="../profile-singlepage/index.html?id=${list.id}">
        <button class="btn btn-outline-warning btn-long cart"id="update-btn">Update </button>
        </a>
        <a href="#" ><button class="btn btn-outline-warning inverted-button btn-long cart"data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button></a>
        
        
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

      bidder.innerHTML += `
    <tr class=" tex-dark fs-5">       
        <td>${bid.bidderName}</td>
        <td>${bid.created}</td>
        <td> $ ${bid.amount}</td>
      </tr > `;
    });
  }
}

getListing();
