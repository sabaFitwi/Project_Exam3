import { Auction_API_URL } from "../constant.mjs";
import { headers } from "../headers.mjs";
import { load, save } from "../../storage/localStorage.mjs";

//import { errorMessage } from "../../component/displayError.mjs";

const form = document.querySelector("#loginForm");

/**
 * submit login form data.
 * @param {Event} submit form submission
 
 */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //const errorContainer = event.target.querySelector(".error-container");
  const form = event.target;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());

  /**
   * login a user
   * @param {Object} profile {email, password}
   * @returns {Promise<Object>} response object
   */
  async function login(profile) {
    const options = {
      method: "post",
      body: JSON.stringify(profile),
      headers: headers("application/json"),
    };

    const response = await fetch(Auction_API_URL + "/auth/login", options);

    if (response.ok) {
      const profile = await response.json();
      save("token", profile.accessToken);

      save("profile", profile);
      load("profile", profile.name);
      window.location.replace("/auction-house/profile/");
      return profile;
    }

    throw new Error(response.statusText);
  }

  login(user);
});
