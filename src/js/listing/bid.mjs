import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";

/**
 * submit register form data.
 * @param {Event} submit form submission

 */
const form = document.querySelector("#bidForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const [amount] = event.target.elements;

  const amountNum = Number(amount.value);


  let sellsInput = {
    amount: amountNum,
  };

  console.log(sellsInput);

  sellListing(sellsInput);
});


/**
 * The postData from the inputs will be taken in by the function.
 * 
 * @param {object} sellsInput This is the input information provided in an input
 * @returns returns the post
 * 
 * **/

async function sellListing(sellsInput) {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let id = params.get("id");
  const options = {
    method: "post",
    body: JSON.stringify(sellsInput),
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
