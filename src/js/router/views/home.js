import { authGuard } from "../../utilities/authGuard.js";
import { updateNav } from "../../ui/global/nav.js";
import { checkAllStatuses } from "../../ui/global/successPopup.js";
import { readProfile } from "../../api/profile/read.js";

// check if user is athenticated
authGuard();

// Update nav links
updateNav();

// Show popup
window.onload = checkAllStatuses();

// Add event listener to profile search field
document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        readProfile(query);
    } else {
        alert('Please enter a search term');
    }
});


