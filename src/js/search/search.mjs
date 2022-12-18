

import { getListingsTemplet, getListings } from "../listing/getListings.mjs";

let data = [];
/**
 *uses the input value to filter the user by its title and name
 * @param {keyup} event
 */
const searchInput = document.querySelector("[data-search]");

searchInput?.addEventListener("keyup", (event) => {
  const inputValue = event.target.value.toLowerCase();

  const filteredData = data?.filter((user) => {
    if (
      user.title.toLowerCase().startsWith(inputValue) ||
      user.seller.name.toLowerCase().startsWith(inputValue)
    ) {
      return true
    }
  })
  getListingsTemplet(filteredData)

})

async function getListingNewData() {
  let result = await getListings();
  data = result.map(user => {
    return user
  })
}
getListingNewData()



