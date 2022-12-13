import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { getListing } from "../api/listing/viewDetailPage.mjs";



/**
 * submit register form data.
 * @param {Event} submit form submission

 */


async function sellUpdateListener() {
  const form = document.querySelector("#edit-form");

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let id = params.get("id");

  if (form) {
    const post = await getListing(id);

    hibernate(post)


    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const mediaInputs = Array.from(
        form.querySelectorAll("input[type=url]:enabled")
      );
      const bodyData = {
        title: form.title.value,
        description: form.description.value,
        tags: form.tags.value
          .split(",")
          .map((tag) => tag.trim())
          .slice(0, 3),
        media: mediaInputs.map((image) => image.value),
        endsAt: new Date(form.endsAt.value),
      };

      bodyData.id = id



      sellListing(bodyData);
    });
  }



  async function sellListing(bodyData, id) {
    const options = {
      method: "put",
      body: JSON.stringify(bodyData),
      headers: headers("application/json"),
    };

    const response = await fetch(
      Auction_API_URL + "/listings/" + { id },
      options
    );
    console.log(response);
    if (response.ok) {
      return await response.json();
    }

    throw new Error(response.statusText);
  }
}
sellUpdateListener()

function hibernate({ title, description, tags, media, endsAt }) {
  const titleInp = document.getElementById("hibernate-titel");
  const descrInp = document.getElementById("hibernate-description");
  const tagsInp = document.getElementById("hibernate-tags");
  const endsAtInp = document.getElementById("hibernate-endsAt");
  const mediaInp = document.querySelectorAll("input[type=url]");
  const addBtn = document.getElementById("add-img-btn");

  titleInp.value = title;
  descrInp.value = description;
  tagsInp.value = tags.join(", ");
  endsAtInp.value = endsAt;
  media.forEach((img, i) => {
    mediaInp[i].value = img;
    if (i > 0) {
      addBtn.click();
    }
  });
}