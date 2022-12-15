import { load } from "../storage/localStorage.mjs";

const navAvatarDiv = document.querySelector(".nav-avatar");

export async function navAvatar() {
  const profile = load("profile");
  const avatar = profile.avatar;
  const name = profile.name;

  navAvatarDiv.innerHTML += `<img src="${avatar}" data-isLogged="true"
                              class="  rounded-circle me-2" alt="avatar" style="width: 45px; height: 45px; object-fit:cover">
                            <p class="m-0 text-capitalize" data-isLogged="true">${name}</p>`;
}

//navAvatar();
