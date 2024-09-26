import { API_SOCIAL_POSTS } from '../constants.js';
import { getAuthorizationHeaders } from '../headers.js';
import { showError, logError } from '../../ui/global/errorMessage.js'

// Function for updating post with new data
export async function updatePost(postId, postData) {
    if (!postId) {
        showError('Post ID is required'); // Notify user that post ID is needed
        console.error('Post ID is required');
        return null;
    }

    try {
        // Send PUT request to update post
        const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
            method: 'PUT',
            headers: {
                ...getAuthorizationHeaders(),
                'Content-Type': 'application/json'
            },
            // Add post data from edit form to body
            body: JSON.stringify(postData)
        });

        // Handle error if request fails
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to update post:', errorText);
            showError('Failed to update post. Please try again later.'); // Notify user about the failure
            return null;
        }

        // Return the updated post data
        return await response.json();

    } catch (error) {
        // Handle unexpected errors
        console.error('Error updating post:', error);
        showError('An unexpected error occurred while updating the post.'); // Notify user about the unexpected error
        return null;
    }
}
