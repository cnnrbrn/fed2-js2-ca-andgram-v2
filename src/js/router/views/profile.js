import { authGuard } from "../../utilities/authGuard";
import { checkAllStatuses } from "../../ui/global/successPopup";
import { loadProfileHeader, displayProfileHeader, loadUserProfile } from "../../api/profile/read";



// Call functions with proper handling for async functions
window.onload = async function() {
    try {
        checkAllStatuses();
        loadUserProfile()
        
        const profileData = await loadProfileHeader();
        console.log(profileData);
        
        if (profileData) {
            displayProfileHeader(profileData); // Pass the profileData directly
        } else {
            console.error('Failed to load profile data');
        }

        authGuard();
    } catch (error) {
        console.error('Error during window load:', error);
    }
    
};

