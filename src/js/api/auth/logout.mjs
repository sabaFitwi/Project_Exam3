
import { remove } from "../../storage/localStorage.mjs";



/**
 * Removes token and profile from local storage
 */
export const logout = function () {
    remove("token");
    remove("profile");
    location.href = "../index.html";
};

document.querySelector("#logout").addEventListener("click", logout)

