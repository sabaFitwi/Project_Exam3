let loadMoreBtn = document.querySelector(".button-loadmore");
let currentPosts = 10;
function loadMore() {
  loadMoreBtn.onclick = () => {
    let postSection = [...document.querySelectorAll(".loader-div")];

    for (var i = currentPosts; i < currentPosts + 15; i++) {
      if (postSection[i]) {
        postSection[i].style.display = "d-flex";
      }
    }
    currentPosts += 15;

    if (currentPosts >= postSection.length) {
      loadMoreBtn.style.display = "d-none";
    }
  };
}
loadMore();
