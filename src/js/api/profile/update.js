import { API_SOCIAL_PROFILES } from '../constants.js'; // Adjust based on your project structure
import { getAuthorizationHeaders } from '../headers.js';
import { showError} from '../../ui/global/errorMessage.js';

export async function updateProfile(username, { avatar, banner, bio }) {
    const headers = getAuthorizationHeaders();
    
    // Prepare the body for the request
    const body = {};
    
    if (bio) {
        body.bio = bio;
    }
    
    if (avatar) {
        body.avatar = {
            url: avatar.url,
            alt: avatar.alt || 'Profile picture'
        };
    }
    
    if (banner) {
        body.banner = {
            url: banner.url,
            alt: banner.alt || 'Profile banner'
        };
    }
    
    // Check that at least one property is provided
    if (!bio && !avatar && !banner) {
        showError('At least one property (bio, avatar, banner) must be provided for the update.'); // Notify user
        throw new Error('At least one property (bio, avatar, banner) must be provided for the update.');
    }

    try {
        // Send PUT request with updated post data
        const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
            method: 'PUT', 
            headers,
            body: JSON.stringify(body)
        });

        // Check if the response is okay
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to update profile:', errorData);
            showError(`Failed to update profile: ${errorData.message}`);
            throw new Error(`Failed to update profile: ${errorData.message}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error updating profile:', error.message);
        showError('An unexpected error occurred while updating the profile.');
    }
}
