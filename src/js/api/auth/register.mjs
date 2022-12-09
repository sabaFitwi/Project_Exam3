import { Auction_API_URL } from "../constant.mjs";
import { headers } from "../headers.mjs";

const form = document.querySelector("#registerForm");

/**
 * submit register form data.
 * @param {Event} submit form submission
 
 */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  async function register(user) {
    const options = {
      method: "post",
      body: JSON.stringify(user),
      headers: headers("application/json"),
    };

    const response = await fetch(Auction_API_URL + "/auth/register", options);

    if (response.ok) {
      return await response.json();
    }

    throw new Error(response.statusText);
  }
  register(profile);
});
//export const name = profile.name;
