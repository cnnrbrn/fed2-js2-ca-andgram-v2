import { API_SOCIAL_POSTS } from '../../api/constants.js';
import { getAuthorizationHeaders } from '../../api/headers.js';
import { showConfirm } from '../../utilities/confirmationModal.js';
import { showError, logError } from '../../ui/global/errorMessage.js';
import { checkAllStatuses } from '../../ui/global/successPopup.js';

// Function to delete a post by ID
export async function deletePostById(postId) {
  if (!postId) {
    showError('Post ID is required'); // Notify user that post ID is needed
    console.error('Post ID is required');
    return;
  }

  // Let user confirm before deleting
  const confirmation = await showConfirm('Are you sure you want to delete this post?');
  
  if (!confirmation) {
    return; // If the user cancels the action
  }

  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
      method: 'DELETE',
      headers: getAuthorizationHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete post');
    }

  } catch (error) {
    // Display error message to the user
    showError(`Error deleting post: ${error.message}`);
    
    // Log error for debugging
    logError(error);
  }
}
