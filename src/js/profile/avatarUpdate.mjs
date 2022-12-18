import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { load, save } from "../storage/localStorage.mjs";

const form = document.querySelector(".avatarForm");
form.addEventListener("submit", setUpdateAvatar);
async function setUpdateAvatar(event) {
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
    save("profile", { name, credits, email, avatar: avatar.src });

    location.reload();
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
    return await response.json();
  }

  throw new Error(response);
}

const profileInfo = document.querySelector("#editProfile");
const { name, email, avatar, credits } = load("profile");
profileInfo.innerHTML += `<img src="${avatar}" onerror="src='/assets/images/avatar-default.jpg'" class="img-thumbnail rounded-circle me-2 avatar-profile-image"
                            id="updateAvatarImage" alt="avatar" />
                               <h4 class="mt-3 text-capitalize text-primary  fw-bolder fs-3">${name}</h4>         
                                <p class="fs-4 text-capitalize">credits:<strong class="fs-5">$${credits}</strong></p>
                                <p class="fs-5">email: ${email}</p>`;
