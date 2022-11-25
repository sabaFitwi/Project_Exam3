import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { viewAllProfiles } from "../profile/getProfile.mjs"
import { load } from "../storage/localStorage.mjs";




async function setUpdateProfile() {
    const form = document.querySelector("#avatarForm");

    if (form) {
        const { name, email, avatar } = load("profile");

        form.name.value = name;
        form.email.value = email;

        const button = document.querySelector(".button");
        button.disabled = true;
        await viewAllProfiles(name);


        form.avatar.value = avatar;
        button.disabled = false;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;

            const profileData = {
                name: form.name.value,
                email: form.email.value,
                avatar: form.avatar.value,

            };
            profileData.name = name;
            profileData.email = email;

            update(profileData);
            console.log(profileData);
        });
    }
}
setUpdateProfile();

async function update(avatar) {
    // if (!profileData.name) {
    //     throw new Error("update requires a profileID");
    // }
    const { name } = load("profile")

    const updateProfileApi1 = Auction_API_URL + "/" + `${name}` + "/media";
    console.log(updateProfileApi1);
    const me = load("profile")
    const options = {
        method: "PUT",
        body: JSON.stringify({ ...me, avatar }),
        headers: headers("application/json"),
    }

    const response = await fetch(updateProfileApi1, options);
    const result = await response.json();

    //location.reload();
    console.log(result);
}