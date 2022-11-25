

//import * as auth from "../../api/auth/index.js";
import { load } from "../localStorage.mjs";




const logout = document.querySelectorAll("[data-auth=logout]")


logout.addEventListener("click", updateLoginVisibility());


// function logoutListener() {

//     // updateLoginVisibility()
//     console.log("hihi")
// }



function updateLoginVisibility() {
    const token = load("token");
    document.body.classList[token ? "add" : "remove"]("logged-in");
    console.log("dddd")
}
