import { authGuard } from "../../utilities/authGuard.js";
import { updateNav } from "../../ui/global/nav.js";
import { checkAllStatuses } from "../../ui/global/successPopup.js";
import { readProfile, displaySearchResults } from "../../api/profile/read.js";
import { redirectToProfile } from "../../api/profile/myProfileRedirect.js";

// check if user is athenticated
authGuard();

// Update nav links
updateNav();

// Show popup
window.onload = checkAllStatuses();

// Add event listener for "My Profile" button
document.getElementById('myProfile').addEventListener('click', redirectToProfile);

// Add event listener to profile search field
document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        // Call the search handler
        await handleSearch(query); 
    }
});

// Function to handle search and display search results
async function handleSearch(query) {
    // Fetch profile data using the readProfile function
    const profileData = await readProfile(query); 
    if (profileData && profileData.length > 0) {
        // Call displaySearchResults to display profiles on the home page
        displaySearchResults(profileData);
    } else {
        // Display a message if no results are found
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = 'No profiles found for this search query.';
    }
}




