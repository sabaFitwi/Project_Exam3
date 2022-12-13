console.log("hhhhhhh");
import { getListing } from "../api/listing/viewDetailPage.mjs";

function renderImageSlider(media) {
  const listingMainSlider = document.querySelector(".image-show");
  const listingThumbSlider = document.querySelector(".thumbs-show");
  listingMainSlider.innerHTML = "";
  listingThumbSlider.innerHTML = "";
  media.forEach((image, index) => {
    listingMainSlider.innerHTML += `<div class="carousel-item${index === 0 ? " active" : ""
      }">
                                      <div class="specific-outer-slider">
                                        <div class="specific-inner-slider">
                                          <img id="listing-image" src="${image}" onerror="src='https://cdn.discordapp.com/attachments/931268688412299274/1026475078847823972/Hero-Banner-Placeholder-Dark-1024x480-1.png'" alt="Item image ${index + 1
      }" />
                                        </div>
                                      </div>
                                    </div>`;
    listingThumbSlider.innerHTML += `<a type="button" data-bs-target="#specific" data-bs-slide-to="${index}" class="thumbs ${index === 0 ? " active" : ""
      }" aria-current="true" aria-label="Slide ${index + 1}">
                                      <img id="listing-image" class="thumb-image" src="${image}" onerror="src='../images/empty_image.jpg'" alt="Item image" />
                                    </a>`;
  });
}

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
// //----------------------------------------------------------
function updatePreview(media = false) {
  const form = document.querySelector("#edit-form");
  const title = document.getElementById("sell-title");
  const description = document.getElementById("sell-description");
  const tags = document.getElementById("sell-tags");
  title.innerHTML = form.title.value;
  description.innerHTML = form.description.value;
  tags.innerHTML = form.tags.value;
  //media on listener will event change{..} so false doesn't come through
  if (media !== []) {
    const mediaInputs = Array.from(
      document.querySelectorAll("input[type=url]:enabled")
    );
    media = mediaInputs
      .map((input) => input.value)
      .filter((value) => value !== "");
  }
  renderImageSlider(media);
}
const form = document.querySelector("#edit-form");
form.addEventListener("change", updatePreview);

async function updatePage() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let id = params.get("id");
  console.log(id)


  const listingData = await getListing(id);
  hibernate(listingData);
  form.endingAt.setAttribute("disabled", "");
  updatePreview(listingData.media);

}

updatePage();
