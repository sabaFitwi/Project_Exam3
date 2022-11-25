import { Auction_API_URL } from "../constant.mjs";
import { headers } from "../headers.mjs";
import { save } from "../../storage/localStorage.mjs";


const form = document.querySelector("#loginForm");

/**
 * submit login form data.
 * @param {Event} submit form submission
 
 */
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target
    const formData = new FormData(form)
    const user = Object.fromEntries(formData.entries())
    console.log(user);
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
            return profile;
        }

        throw new Error(response.statusText);
    }

    login(user);
});
