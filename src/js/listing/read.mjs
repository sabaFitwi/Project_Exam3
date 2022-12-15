import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
export async function getListing() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let id = params.get("id");
  const options = {
    headers: headers("application/json"),
  };
  const response = await fetch(`${Auction_API_URL}/listings/${id}`, options);
  const data = await response.json();
  console.log(data);

  if (response.ok) {
    return data;
  }

  throw new Error(response.statusText);
}
