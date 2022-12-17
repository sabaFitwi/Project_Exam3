export const imageCarousel = function (media) {
  const bigImage = document.querySelector(".big-image");
  bigImage.innerHTML = "";
  const smallImage = document.querySelector(".small-image");
  smallImage.innerHTML = "";
  media.forEach((image, index) => {
    bigImage.innerHTML += `<div class="carousel-item${index === 0 ? " active" : ""
      }">
                                        <div >
                                          <div>
                                            <img id="listing-image" src="${image}" onerror="src='/assets/images/image-defualt.jpg'" alt="Item image ${index + 1
      }" />
                                          </div>
                                        </div>
                                      </div>`;
    smallImage.innerHTML += `<a type="button" data-bs-target="#specific" data-bs-slide-to="${index}" class="thumbs ${index === 0 ? " active" : ""
      }" aria-current="true" aria-label="Slide ${index + 1}">
                                        <img id="listing-image" class="thumb-image" src="${image}" onerror="src='/assets/images/image-defualt.jpg'" alt="Item image" />
                                      </a>`;
  });
};
