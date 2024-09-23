import { authGuard } from "../../utilities/authGuard";
import { checkAllStatuses } from "../../ui/global/successPopup";
import { loadProfileHeader, displayProfileHeader, loadUserProfile } from "../../api/profile/read";
import { updateProfile } from "../../api/profile/update";



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

        const editProfileButton = document.getElementById('edit-profile-btn');
    
        if (editProfileButton) {
            editProfileButton.addEventListener('click', async () => {
                // Collect new profile data (you might want to use a form for this)
                const newAvatarUrl = prompt("Enter new avatar URL:");
                const newAvatarAlt = prompt("Enter alt text for avatar:");
                const newBannerUrl = prompt("Enter new banner URL:");
                const newBannerAlt = prompt("Enter alt text for banner:");
                const newBio = prompt("Enter new bio:");
    
                // Prepare the data object
                const profileData = {
                    avatar: newAvatarUrl ? { url: newAvatarUrl, alt: newAvatarAlt } : undefined,
                    banner: newBannerUrl ? { url: newBannerUrl, alt: newBannerAlt } : undefined,
                    bio: newBio || undefined
                };
    
                // Call the updateProfile function
                const username = localStorage.getItem('username');
                try {
                    const updatedProfile = await updateProfile(username, profileData);
                    console.log('Profile updated:', updatedProfile);
                    alert('Profile updated successfully!');
                    // Optionally, redirect or refresh the page
                } catch (error) {
                    console.error('Error updating profile:', error);
                    alert('Failed to update profile. Please try again.');
                }
            });
        } else {
            console.error('Edit profile button not found');
        }
};

