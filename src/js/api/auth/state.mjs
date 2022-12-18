import { load } from "../../storage/localStorage.mjs";
import { logout } from "../auth/logout.mjs";

export const isUserLoggedIn = function () {
  document.querySelector("#logout").addEventListener("click", logout);

  const loggedIn = document.querySelectorAll("[data-isLogged=true]");
  const loggedOut = document.querySelectorAll("[data-isLogged=false]");

  const isLoggedIn = load("token");

  if (isLoggedIn) {
    loggedOut.forEach((item) => item.classList.add("d-none"));
  } else {
    const url = window.location.href.toString();
    if (
      url.includes("auction-house/Profile/") ||
      url.includes("auction-house/sell/")
    ) {
      windows.location.replace("../index.html");
    }
    loggedIn.forEach((item) => item.classList.add("d-none"));
  }
};
