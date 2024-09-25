import { updateProfile } from "../../api/profile/update";
import { checkAllStatuses } from "../global/successPopup";
    
export async function onUpdateProfile() {
    const profileEditModal = document.getElementById('profile-edit-modal');
    const profileEditForm = document.getElementById('profile-edit-form');
    const cancelEditButton = document.getElementById('cancel-edit');
  
    // Show the modal
    profileEditModal.style.display = 'block';
  
    // Handle form submission
    profileEditForm.addEventListener('submit', async function(event) {
      event.preventDefault(); // Prevent form from refreshing the page
  
      // Collect form data
      const newAvatarUrl = document.getElementById('avatar-url').value;
      const newAvatarAlt = document.getElementById('avatar-alt').value;
      const newBannerUrl = document.getElementById('banner-url').value;
      const newBannerAlt = document.getElementById('banner-alt').value;
      const newBio = document.getElementById('bio').value;
  
      // Prepare profile data
      const profileData = {
        avatar: newAvatarUrl ? { url: newAvatarUrl, alt: newAvatarAlt } : undefined,
        banner: newBannerUrl ? { url: newBannerUrl, alt: newBannerAlt } : undefined,
        bio: newBio || undefined
      };
  
      const username = localStorage.getItem('username');
  
      try {
        // Call the updateProfile function
        const updatedProfile = await updateProfile(username, profileData);
        console.log('Profile updated:', updatedProfile);
        localStorage.setItem('updateSuccess', 'true');
        checkAllStatuses();
  
        // Optionally, close the modal after success
        profileEditModal.style.display = 'none';
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    });
  
    // Handle the cancel button to close the modal
    cancelEditButton.addEventListener('click', () => {
      profileEditModal.style.display = 'none';
    });
  }
  