import { authGuard } from "../../utilities/authGuard";
import { loadProfileHeader, displayProfileHeader, loadUserProfile } from "../../api/profile/read";
import { onUpdateProfile } from "../../ui/profile/update";


// Call functions with proper handling for async functions
window.onload = async function () {
    try {

        loadUserProfile()
        authGuard();

        const profileData = await loadProfileHeader();
        console.log(profileData);

        if (profileData) {
            displayProfileHeader(profileData); // Pass the profileData directly
        } else {
            console.error('Failed to load profile data');
        }

        const editProfileButton = document.getElementById('edit-profile-btn');

        // Call the onUpdateProfile function and pass the event if needed
        if (editProfileButton) {
            editProfileButton.addEventListener('click', onUpdateProfile);
        }

    } catch (error) {
        console.error('Error during window load:', error);
    }

};

