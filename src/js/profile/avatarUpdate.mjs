import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { load, save } from "../storage/localStorage.mjs";

const form = document.querySelector("#avatarForm");
form.addEventListener("submit", setUpdateProfile);
async function setUpdateProfile(event) {
  event.preventDefault();
  // const [img] = event.target.elements;

  // let dataImg = {
  //   avatar: `${img.value}`,
  // };
  // update(dataImg);
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  update(data);
  console.log(data);
  try {
    const profileData = await update(data);
    console.log(profileData);
    const avatar = document.querySelector(".avatar-profile-image");

    avatar.src = await profileData.avatar;
  } catch {
    console.log("error");
  }
}

async function update(media) {
  const profile = load("profile");
  const name = profile.name;
  console.log(name);

  const updateProfileApi1 =
    Auction_API_URL + "/profiles/" + `${name}` + "/media";
  console.log(updateProfileApi1);

  const options = {
    method: "PUT",
    body: JSON.stringify(media),
    headers: headers("application/json"),
  };

  const response = await fetch(updateProfileApi1, options);
  if (response.ok) {
    const result = await response.json();
    console.log(result);
    return;
  }

  throw new Error(response);
}
// save("profile", {
//   avatar: result.avatar,
//   credits: result.credits,
//   email: result.email,
//   name: result.name,
// });

const profileInfo = document.querySelector("#editProfile");
const { name, email, avatar, credits } = load("profile");
profileInfo.innerHTML += ` <img src=${avatar}" class="img-thumbnail rounded-circle me-2 avatar-profile-image"
                            id="updateAvatarImage" alt="avatar" />
                               <h4 class="mt-5">${name}</h4>         
                                <p>credits:${credits}</p>
                                <p>email: ${email}</p>`;
