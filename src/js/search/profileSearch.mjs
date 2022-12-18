

import { viewAllProfiles, getProfilesTemplet } from "../profile/getProfileListings.mjs"


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
            user.title.toLowerCase().startsWith(inputValue)

        ) {
            return true
        }
    })

    getProfilesTemplet(filteredData)
})

async function getListingNewData() {
    let result = await viewAllProfiles();
    data = result.map(user => {
        return user
    })
    console.log(data)
}
getListingNewData()



