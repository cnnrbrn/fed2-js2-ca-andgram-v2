// delete.js
import { API_SOCIAL_POSTS } from '../../api/constants.js';
import { getAuthorizationHeaders } from '../../api/headers.js';
import { showConfirm } from '../../utilities/confirmationModal.js';

// Function to delete a post by ID
export async function deletePostById(postId) {
  if (!postId) {
    console.error('Post ID is required');
    return;
  }

  // let user confrim before deleting
  const confirmation = await showConfirm('Are you sure you want to delete this post?');
  
  if (!confirmation) {
    return; // If the user cancels the action
  }

  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
      method: 'DELETE',
      headers: getAuthorizationHeaders(),
    });

    if (response.ok) {
    } else {
      const errorData = await response.json();
      console.error('Failed to delete post:', errorData);
      throw new Error(errorData.message); // Throw error to be handled in UI
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Error deleting post. Please try again later.'); // Throw error to be handled in UI
  }
}
