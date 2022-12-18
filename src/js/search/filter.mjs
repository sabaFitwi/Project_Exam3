import { getListingsTemplet, getListings } from "../listing/getListings.mjs";
import { countDown } from "../component/timeCount.mjs"

let data = [];


const filterButtons = document.querySelectorAll(".filter-title");


async function getListingNewData() {
  let result = await getListings();
  data = result?.map(user => {
    return user
  })
  console.log(result);
}
getListingNewData()

// const countTime = (newApiDate) => {
//   const countDate = new Date(newApiDate).getTime()
//   const now = new Date().getTime()
//   const gap = countDate - now
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24
//   const textDay = Math.floor(gap / day)
//   // const textHour = Math.floor(gap % day / hour)
//   // const textMinute = Math.floor(gap % day / minute)
//   // const textSecond = Math.floor(gap % day / second)
//   return textDay
// }

export function filterListings() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].classList.remove("active");
      }
      button.classList.add("active");
      let datafilter = event.target.dataset.filter;
      console.log(datafilter, "clicked")
      const filteredData = data?.filter(user => {
        const newApiDate = countDown(user?.endsAt)
        console.log(newApiDate)

        if (datafilter === "*") {
          return data
        }
        if (datafilter === ".best" && user._count.bids > 1) {

          return user._count.bids

        }
        if (datafilter === ".feat" && newApiDate < 10) {

          return user.endsAt

        }


      })
      getListingsTemplet(filteredData)

      // for (let k = 0; k < newCardBody.length; k++) {
      //   const blockCaterory = newCardBody[k].getAttribute("data-category");

      //   if (blockCaterory == datafilter || datafilter == "all") {
      //     newCardBody[k].style.display = "block";
      //   } else {
      //     newCardBody[k].style.display = "none";
      //   }
      // }
    });
  });
}
filterListings()