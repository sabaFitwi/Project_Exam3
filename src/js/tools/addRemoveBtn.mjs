function hiddenDiv(el) {
  if (!el?.cloneNode) {
    return null;
  }
  const clone = el.cloneNode(true);

  Object.assign(clone.style, {
    overflow: "visible",
    height: "auto",
    maxHeight: "none",
    opacity: "0",
    visibility: "hidden",
    display: "block",
  });

  el.after(clone);
  const height = clone.offsetHeight;
  clone.remove();
  return height;
}
function viewInputDiv(input) {
  if (input.classList.contains("d-none")) {
    input.removeAttribute("disabled");
    input.classList.toggle("d-none");
    setTimeout(() => {
      input.classList.toggle("open");
      input.style.height = `${hiddenDiv(input)}px`;
    }, 10);
  } else {
    input.setAttribute("disabled", "");
    input.classList.toggle("open");
    input.style.height = `0px`;
    setTimeout(() => {
      input.classList.toggle("d-none");
    }, 50);
  }
}

function deleteImg(e) {
  const mediaInputDiv = document.getElementById("media-inputs-wapper");
  const viewImgInput = mediaInputDiv.querySelectorAll(
    "input[type=url]:enabled"
  );
  const addImgbtn = document.getElementById("add-img-btn");

  if (viewImgInput.length === 2) {
    e.target.classList.add("d-none");
  }
  addImgbtn.classList.remove("d-none");
  viewInputDiv(viewImgInput[viewImgInput.length - 1]);
}

function addImage(e) {
  const mediaInputDiv = document.getElementById("media-inputs-wapper");
  //const hiddenImgInputs = mediaInputDiv.querySelectorAll("input[type=url]:disabled");
  const hiddenImgInputs = mediaInputDiv.querySelectorAll(
    "input[type=url].d-none"
  );

  const deleteImg = document.getElementById("delete-img-btn");
  if (hiddenImgInputs.length === 1) {
    e.target.classList.add("d-none");
  }
  deleteImg.classList.remove("d-none");

  viewInputDiv(hiddenImgInputs[0]);

  //updatePreview();
}
const addImgbtn = document.getElementById("add-img-btn");

addImgbtn.addEventListener("click", addImage);

const deleteImgBtn = document.getElementById("delete-img-btn");
deleteImgBtn.addEventListener("click", deleteImg);
