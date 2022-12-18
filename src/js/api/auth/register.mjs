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

  /**
 * Register a new user
 * @param {Object} user {name, email, password, avatar}
 * @returns {Promise<Object>} response object
 */

  async function register(user) {
    const options = {
      method: "post",
      body: JSON.stringify(user),
      headers: headers("application/json"),
    };

    const response = await fetch(Auction_API_URL + "/auth/register", options);

    const result = await response.json();

    location.href = "/auction-house/login";

    return result;
  }
  register(profile);
});

