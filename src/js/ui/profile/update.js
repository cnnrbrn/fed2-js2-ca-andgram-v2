import { updateProfile } from "../../api/profile/update";
import { showError } from "../global/errorMessage";
import { checkAllStatuses } from "../global/successPopup";

export async function onUpdateProfile() {
    // Get profile elements from document
    const profileEditModal = document.getElementById('profile-edit-modal');
    const profileEditForm = document.getElementById('profile-edit-form');
    const cancelEditButton = document.getElementById('cancel-edit');

    // Show the modal
    profileEditModal.style.display = 'block';

    // Handle form submission
    profileEditForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent form from refreshing the page

        // Collect form data
        const newAvatarUrl = document.getElementById('avatar-url').value.trim();
        const newAvatarAlt = document.getElementById('avatar-alt').value.trim();
        const newBannerUrl = document.getElementById('banner-url').value.trim();
        const newBannerAlt = document.getElementById('banner-alt').value.trim();
        const newBio = document.getElementById('bio').value.trim();

        // Prepare profile data
        const profileData = {
            avatar: newAvatarUrl ? { url: newAvatarUrl, alt: newAvatarAlt } : undefined,
            banner: newBannerUrl ? { url: newBannerUrl, alt: newBannerAlt } : undefined,
            bio: newBio || undefined,
        };

        // Get username from localstorage
        const username = localStorage.getItem('username');

        try {
            // Call the updateProfile function
            const updatedProfile = await updateProfile(username, profileData);

            // Show success popup if update was successful
            if (updatedProfile) {
                localStorage.setItem('updateSuccess', 'true');
                checkAllStatuses();
                // Close the modal after success
                profileEditModal.style.display = 'none';
            } else {
                throw new Error('Profile update failed, no data returned');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            showError('Failed to update profile. Please try again.');
        }
    });

    // Handle the cancel button to close the modal
    cancelEditButton.addEventListener('click', () => {
        profileEditModal.style.display = 'none';
    });
}
