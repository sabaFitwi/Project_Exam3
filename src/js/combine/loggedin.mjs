

import { load } from "../storage/localStorage.mjs";
import { logout } from "../api/auth/logout.mjs";

function isUserLoggedIn() {
    document.querySelector("#logout").addEventListener("click", logout);

    const loggedIn = document.querySelectorAll("[data-loggedVisibility=true]");
    const loggedOut = document.querySelectorAll(
        "[data-loggedVisibility=false]"
    );
    const isLoggedIn = load("token");

    // Hide links and buttons depending on if the user is logged or not.
    if (isLoggedIn) {
        loggedOut.forEach((item) => item.classList.add("hidden"));
    } else {
        // redirect on profile and create when not logged in.
        const url = window.location.href.toString();
        if (url.includes("/sell") || url.includes("/profile")) {
            console.log("hhhhhhhhhhi");
            location.href = "../index.html";
        }

        loggedIn.forEach((item) => item.classList.add("hidden"));
    }
};
isUserLoggedIn()