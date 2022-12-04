export const showSensitiveDetails = function () {
    const sensitiveDetails = document.querySelectorAll(
        "[data-isUsersProfile=true]"
    );
    console.log(sensitiveDetails);
    sensitiveDetails.forEach((item) => item.classList.remove("hidden"));
};

async function getUserProfileListings(username) {
    const url = `${baseURL}profiles/${username}/listings?_seller=true&_bids=true`;

    const myHeaders = createAuthHeader();

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    const response = await fetch(url, requestOptions);
    if (response.ok) {
        return await response.json();
    }

    throw new Error(response);
}

async function updateAvatar(media) {
    const profile = storage.get("profile");
    const username = profile.name;

    const url = `${baseURL}profiles/${username}/media`;
    const myHeaders = createAuthHeader();

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(media),
    };

    const response = await fetch(url, requestOptions);
    if (response.ok) {
        return await response.json();
    }

    throw new Error(response);
}


export const profileSetup = async function () {
    const updateForm = document.querySelector("#update-avatar-form");
    updateForm.addEventListener("submit", updateAvatarListener);

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    let user = params.get("user");
    if (user === null || user === storage.get("profile").name) {
        user = storage.get("profile").name;
        showSensitiveDetails();
    }

    const profile = await getUserProfile(user);
    const profileListings = await getUserProfileListings(user);

    updateProfileDetails(profile);
    const yourListingsContainer = document.querySelector(
        "#your-listings-container"
    );
    await profileListings.map((listing) => {
        yourListingsContainer.append(createListingCard(listing));
    });
};
