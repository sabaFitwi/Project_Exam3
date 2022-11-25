import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { load } from "../storage/localStorage.mjs"

export async function viewAllProfiles(limit = 20, offset = 0) {
    const { name } = load("profile")
    console.log(name)
    const options = {
        headers: headers("application/json"),
    };
    const response = await fetch(Auction_API_URL + `/profiles/${name}?limit=${limit}&offset=${offset}`, options);
    const result = await response.json();
    console.log(result);
}
