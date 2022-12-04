function getHiddenHeight(container) {
  const clone = container.cloneNode(true);

  Object.assign(clone.style, {
    overflow: "visible",
    height: "auto",
    maxHeight: "none",
    opacity: "0",
    visibility: "hidden",
    display: "block",
  });

  container.after(clone);
  const height = clone.offsetHeight;
  clone.remove();
  return height;
}
function showInputContainer(input) {
  if (input.classList.contains("hidden")) {
    input.classList.toggle("hidden");
    setTimeout(function () {
      input.classList.toggle("open");
      input.style.height = `${getHiddenHeight(input)}px`;
      input.removeAttribute("disabled");
    }, 20);
  } else {
    input.classList.toggle("open");
    input.style.height = `0px`;
    setTimeout(function () {
      input.classList.toggle("hidden");
      input.setAttribute("disabled", "");
    }, 500);
  }
}

function removeMediaInput(event) {
  const mediaInputContainer = document.querySelector("#media-inputs-container");
  const enabledMediaInputs = mediaInputContainer.querySelectorAll(
    "input[type=url]:enabled"
  );
  const addMoreMediaBtn = document.querySelector("#add-more-media-btn");

  if (enabledMediaInputs.length === 2) {
    event.target.classList.add("hidden");
  }
  addMoreMediaBtn.classList.remove("hidden");
  showInputContainer(enabledMediaInputs[enabledMediaInputs.length - 1]);
}

function addMoreMedia(event) {
  const mediaInputContainer = document.querySelector("#media-inputs");
  //const disabledMediaInputs = mediaInputContainer.querySelectorAll("input[type=url]:disabled");
  const disabledMediaInputs = mediaInputContainer.querySelectorAll(
    "input[type=url].hidden"
  );
  const removeMediaBtn = document.querySelector("#remove-media-btn");

  if (disabledMediaInputs.length === 1) {
    event.target.classList.add("hidden");
  }
  removeMediaBtn.classList.remove("hidden");

  showInputContainer(disabledMediaInputs[0]);
}

const addMoreMediaBtn = document.querySelector("#add-more-media-btn");
addMoreMediaBtn.addEventListener("click", addMoreMedia);

const removeMediaBtn = document.querySelector("#remove-media-btn");
removeMediaBtn.addEventListener("click", removeMediaInput);
