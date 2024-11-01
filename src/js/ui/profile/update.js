import { updateProfile } from "../../api/profile/update";
import { displayMessage } from "../../components/shared/displayMessage";
import { closeEditModal } from "../../router/views/profile";

export async function onUpdateProfile(event) {
    event.preventDefault();

    const avatarUrl = document.getElementById('avatar-url').value;
    const bannerUrl = document.getElementById('banner-url').value;
    const bio = document.getElementById('bio').value;

    const profileData = {
        avatar: avatarUrl ? { url: avatarUrl } : undefined, 
        banner: bannerUrl ? { url: bannerUrl } : undefined, 
        bio: bio || undefined
    };

    try {
        await updateProfile(profileData);
        displayMessage("#message", "success", "Profile updated succesdfully.");
        closeEditModal();
    } catch (error) {
        displayMessage("#message", "error", error.message);
    }
}
