import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";


async function setSellListner() {
  const form = document.querySelector("#sellForm");

  form.addEventListener("submit", sellListener);

  async function sellListener(event) {
    event.preventDefault();
    const form = event.target;
    const mediaInp = Array.from(
      form.querySelectorAll("input[type=url]:enabled")
    );

    const bodyData = {
      title: form.title.value,
      description: form.description.value,
      tags: form.tags.value
        .split(",")
        .map((tag) => tag.trim())
        .slice(0, 3),
      media: mediaInp.map((image) => image.value),
      endsAt: new Date(form.endsAt.value),
    };
    console.log(bodyData);

    let response = await sellListing(bodyData);
    window.location.replace("/auction-house/profile/");
    return response;
  }

  form.addEventListener("keyup", (media = false) => {
    //e.preventDefault();

    const title = document.querySelector(".sell-title");
    const description = document.querySelector(".sell-description");
    const tags = document.querySelector(".sell-tags");

    title.innerHTML = form.title.value;
    description.innerText = form.description.value;
    tags.innerText = form.tags.value;

    if (media !== []) {
      const mediaInp = Array.from(
        document.querySelectorAll("input[type=url]:enabled")
      );
      media = mediaInp
        .map((images) => images.value)
        .filter((value) => value !== "");
    }
  });
}

/**
 * new listings are made
 * @param {Object} bodyData title, description, [tags], [media], endsAt)
 * @returns {Promise<Object>} returns and object with the listing details
 */

async function sellListing(bodyData) {
  const options = {
    method: "post",
    body: JSON.stringify(bodyData),
    headers: headers("application/json"),
  };

  const response = await fetch(Auction_API_URL + "/listings", options);
  console.log(response);
  if (response.ok) {
    return await response.json();
  }
  imageCarousel(bodyData.media);
  throw new Error(response.statusText);
}

setSellListner();
