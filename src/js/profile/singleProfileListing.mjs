import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { load } from "../storage/localStorage.mjs"

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id)
async function singleProfiles(limit = 20, offset = 0) {
    const { name } = load("profile")
    console.log(name)
    const options = {
        headers: headers("application/json"),
    };
    const response = await fetch(Auction_API_URL + `/profiles/${name}/listings?limit=${limit}&offset=${offset}`, options);
    const result = await response.json();
    console.log(result);
}
singleProfiles()