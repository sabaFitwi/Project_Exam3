import { Auction_API_URL } from "../api/constant.mjs";
import { headers } from "../api/headers.mjs";
import { getListing } from "../api/listing/viewDetailPage.mjs";



async function setUpdate() {

  const form = document.getElementById("edit-form")
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let id = params.get("id");

  form.addEventListener("submit", editFormListener);
  form.addEventListener("change", getPreview);


  if (id) {

    try {
      const listingData = await getListing(id);
      hibernate(listingData);
      form.endsAt.setAttribute("disabled", "");
      getPreview(listingData.media);
    } catch (error) {
      console.log(error);
      // const errorContainer = document.querySelector(
      //   "#error-reporting-container"
      // );
      //errorContainer.innerHTML = `<p class="p-3 text-losing bg-secondary"> An error occurred please refresh and try again. If problems persist, check the listing still exists.</p>`;
      // location.hash = "#error-reporting-container";
    }
  }
}

const getPreview = function () {
  const form = document.getElementById("edit-form");
  const title = document.getElementById("sell-title");
  const description = document.getElementById("sell-description");
  const tags = document.getElementById("sell-tags");
  title.innerHTML = form.title.value;
  description.innerText = form.description.value;
  tags.innerText = form.tags.value;
  if (media !== []) {
    const mediaInputs = Array.from(
      document.querySelectorAll("input[type=url]:enabled")
    );
    media = mediaInputs
      .map((input) => input.value)
      .filter((value) => value !== "");
  }

};

//---------------------------
function hibernate({ title, description, tags, media, endsAt, }) {
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


};
//----------------------------------------------------------







async function editFormListener(e) {
  e.preventDefault();

  const mediaInputs = Array.from(
    e.target.querySelectorAll("input[type=url]:enabled")
  );



  const bodyData = {
    title: e.target.title.value,
    description: e.target.description.value,
    tags: e.target.tags.value
      .split(",")
      .map((tag) => tag.trim())
      .slice(0, 3),
    media: mediaInputs
      .map((input) => input.value)
      .filter((value) => value !== ""),
    endsAt: new Date(e.target.endingAt.value),
  };

  try {
    let response = {}

    if (id) {

      response = await editListing(bodyData, id);
    }
    console.log(response);
    //window.location.href = `./specific.html?id=${response.id}`;
  } catch (error) {
    console.log(error);
    // const errorContainer = document.querySelector("#error-reporting-container");
    // errorContainer.innerHTML = `<p class="p-3 text-losing bg-secondary"> An error occurred please refresh and try again </p>`;
    // location.hash = "#error-reporting-container";
  }
};

setUpdate()

async function editListing(bodyData, id) {

  const options = {
    method: "PUT",
    body: JSON.stringify(bodyData),
    headers: headers("application/json"),
  };

  const response = await fetch(Auction_API_URL + "/listings" + id, options);
  console.log(response);
  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}


