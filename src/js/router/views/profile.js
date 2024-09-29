import { authGuard } from "../../utilities/authGuard";
import { loadProfileHeader, displayProfileHeader, loadUserProfile } from "../../api/profile/read";
import { onUpdateProfile } from "../../ui/profile/update";

window.onload = async function () {
    try {
        // Make sure user is logged in
        authGuard();
        // Display additional profile options if the currently viewed profile belongs to the logged-in user
        loadUserProfile()

        // Load profile data
        const profileData = await loadProfileHeader();

        // Upon successfully retrieving profile data, display it in the profile header
        if (profileData) {
            displayProfileHeader(profileData); 
        } else {
            console.error('Failed to load profile data');
        }

        // Get edit profile button from document
        const editProfileButton = document.getElementById('edit-profile-btn');

        // Verify if the button exists
        if (editProfileButton) {
            // Call the onUpdateProfile when button is clicked
            editProfileButton.addEventListener('click', onUpdateProfile);
        }

    } catch (error) {
        console.error('Error during window load:', error);
    }

};

