import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { load, save } from "../storage/localStorage.mjs";


const form = document.querySelector("#avatarForm");
async function setUpdateProfile(event) {


    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const request = Object.fromEntries(formData.entries());
    console.log(request)
    try {
        const profile = await update(request);
        const avatar = document.querySelector("#updateAvatarImage");
        avatar.src = await profile.avatar;


    } catch {
        console.log("error");
    }
}
form.addEventListener("submit", setUpdateProfile)

async function update(media) {

    const { name } = load("profile")

    const updateProfileApi1 = Auction_API_URL + "/profiles/" + `${name}` + "/media";
    console.log(updateProfileApi1);

    const options = {
        method: "PUT",
        body: JSON.stringify(media),
        headers: headers("application/json"),
    }

    const response = await fetch(updateProfileApi1, options);
    const result = await response.json();


    return result

} 