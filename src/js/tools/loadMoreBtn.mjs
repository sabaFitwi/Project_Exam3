let loadMoreBtn = document.querySelector(".button-loadmore");
let currentPosts = 10;

loadMoreBtn.onclick = () => {
  let postSection = [...document.querySelectorAll(".blog-wrapper .blogs_card")];

  for (var i = currentPosts; i < currentPosts + 10; i++) {
    if (postSection[i]) {
      postSection[i].style.display = "inline-block";
    }
  }
  currentPosts += 10;

  if (currentPosts >= postSection.length) {
    loadMoreBtn.style.display = "none";
  }
};
