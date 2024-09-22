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

// Legg til event listener for "My Profile"-knappen
document.getElementById('myProfile').addEventListener('click', redirectToProfile);

// Add event listener to profile search field
document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        // Call the search handler
        await handleSearch(query);  // Call the search handler function
    } else {
        alert('Please enter a search term');
    }
});

// Function to handle search and display search results
async function handleSearch(query) {
    const profileData = await readProfile(query);  // Fetch profile data using the readProfile function
    if (profileData && profileData.length > 0) {
        displaySearchResults(profileData);  // Call displaySearchResults to display profiles on the home page
    } else {
        console.log('No profiles found for this search query.');
        // Optionally, display a message if no results are found
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = 'No profiles found for this search query.';
    }
}




