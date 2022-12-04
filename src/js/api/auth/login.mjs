import { Auction_API_URL } from "../constant.mjs";
import { headers } from "../headers.mjs";
import { load, save } from "../../storage/localStorage.mjs";

const form = document.querySelector("#loginForm");

/**
 * submit login form data.
 * @param {Event} submit form submission
 
 */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());

  async function login(profile) {
    const options = {
      method: "post",
      body: JSON.stringify(profile),
      headers: headers("application/json"),
    };
    console.log(profile);

    const response = await fetch(Auction_API_URL + "/auth/login", options);

    if (response.ok) {
      const profile = await response.json();
      save("token", profile.accessToken);
      delete profile.accessToken;
      save("profile", profile);
      load("profile", profile.name);
      window.location.href = `/profile/?view=profile&name=${profile.name}`;

      // if (token === "undefined" || token === null) {
      //     console.log("error email or password");
      //     /**
      //      * Displays a message to the user
      //      */
      //     errorMessage.innerHTML = ` <div> <p btn-danger>Invalid email or password</p></div>`;
      // }
      return profile;
    }

    throw new Error(response.statusText);
  }

  login(user);
});
