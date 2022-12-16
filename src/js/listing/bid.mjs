import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";

const placeBidFormListener = async function (event) {
  try {
    event.preventDefault();
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    let id = params.get("id");
    await sellListing(id, Number(event.target.amount.value));
    location.reload();
  } catch (error) {
    console.log(error);
  }
};
// async function placeABid(id, amount) {
//   const url = `${baseURL}listings/${id}/bids`;

//   const requestOptions = {
//     method: "POST",
//     headers: createAuthHeader(),
//     body: JSON.stringify({ amount: amount }),
//   };

//   const response = await fetch(url, requestOptions);
//   if (response.ok) {
//     return await response.json();
//   }

//   throw new Error(response);
//}
async function sellListing(id, amount) {
  const options = {
    method: "post",
    body: JSON.stringify({ amount: amount }),
    headers: headers("application/json"),
  };

  const response = await fetch(
    `${Auction_API_URL}/listings/${id}/bids`,
    options
  );
  console.log(response);
  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}

// const form = document.querySelector("#bidForm");

// /**
//  * submit register form data.
//  * @param {Event} submit form submission

//  */
// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const form = event.target;

//   const formData = new FormData(form);
//   const sellsInput = Object.fromEntries(formData.entries());
//   console.log(sellsInput);

//   sellListing(sellsInput);
// });

// async function sellListing(amount) {
//   const queryString = window.location.search;
//   const params = new URLSearchParams(queryString);
//   let id = params.get("id");
//   const options = {
//     method: "post",
//     body: JSON.stringify({ amount: amount }),
//     headers: headers("application/json"),
//   };

//   const response = await fetch(
//     `${Auction_API_URL}/listings/${id}/bids`,
//     options
//   );
//   console.log(response);
//   if (response.ok) {
//     return await response.json();
//   }

//   throw new Error(response.statusText);
// }
placeBidFormListener;
