import { loadName } from '../../utilities/storage.js';
import { API_SOCIAL_PROFILES } from '../constants.js'; 
import { headers } from '../headers.js';

export async function updateProfile({ avatar, banner, bio }) {
    const authHeaders = headers();
    const body = {};

    if (bio) body.bio = bio;
    if (avatar) {
        body.avatar = { url: avatar.url }; 
    }
    if (banner) {
        body.banner = { url: banner.url };
    }

    if (Object.keys(body).length === 0) {
        throw new Error('At least one property (bio, avatar, banner) must be provided for the update.');
    }

    try {
        const username = loadName();
        const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
            method: 'PUT', 
            headers: authHeaders,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to update profile:', errorData);
            throw new Error(`Failed to update profile: ${errorData.message}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error updating profile:', error.message);
        throw error;
    }
}
