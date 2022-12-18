import { isUserLoggedIn } from "../js/api/auth/state.mjs";
import { navAvatar } from "../js/profile/navAvatar.mjs";
import { displayButton } from "../js/tools/scrollup.mjs";
//import { loadMore } from "./tools/loadMoreBtn.mjs";
//import { countDown } from "../js/component/timeCount.mjs"
// /**
//  * --------------------------------------------------------------------------
//  * Bootstrap (v5.2.2): carousel.js
//  * --------------------------------------------------------------------------
//  */
// import bootstrap from "/node_modules/bootstrap/js/src/carousel.js";
// var myCarousel = document.querySelector("#header");
// var carousel = new bootstrap.Carousel(myCarousel);

isUserLoggedIn();
navAvatar();
//countDown()
displayButton();

//const path = location.pathname;

// if (path === "/" || path === "/auction-house/listing/") {
//     loadMore()
// }
// console.log(path)
