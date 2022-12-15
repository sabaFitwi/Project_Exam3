import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { getListing } from "../listing/read.mjs";

async function setUpdateListner() {
  const formUpdate = document.querySelector("#edit-form");

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let id = params.get("id");
  console.log(id);
  if (formUpdate) {
    const listings = await getListing(id);
    formUpdate.title.value = listings.title;
    formUpdate.description.value = listings.description;
    formUpdate.tags.value = listings.tags;
    formUpdate.media[0].value = listings.media;

    formUpdate.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;

      const mediaInputs = Array.from(
        form.querySelectorAll("input[type=url]:enabled")
      );
      const listingData = {
        title: form.title.value,
        description: form.description.value,
        tags: form.tags.value
          .split(",")
          .map((tag) => tag.trim())
          .slice(0, 3),
        media: mediaInputs.map((image) => image.value),
        endsAt: new Date(form.endsAt.value),
      };

      listingData.id = id;

      sellListing(listingData);
    });

    formUpdate.addEventListener("change", (e) => {
      e.preventDefault();

      const title = document.querySelector(".sell-title");
      const description = document.querySelector(".sell-description");
      const tags = document.querySelector(".sell-tags");
      const media = document.querySelector(".sell-media")

      title.innerHTML = formUpdate.title.value;
      description.innerText = formUpdate.description.value;
      tags.innerText = formUpdate.tags.value;
      media.src = formUpdate.media.value
    });
  }

  async function sellListing(bodyData) {
    const options = {
      method: "put",
      body: JSON.stringify(bodyData),
      headers: headers("application/json"),
    };

    const response = await fetch(
      Auction_API_URL + "/listings/" + bodyData.id,
      options
    );
    console.log(response);
    if (response.ok) {
      return await response.json();
    }

    throw new Error(response.statusText);
  }
}

setUpdateListner();
