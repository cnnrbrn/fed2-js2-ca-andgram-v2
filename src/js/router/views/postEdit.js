// Import necessary functions
import { authGuard } from "../../utilities/authGuard";
import { getAuthorizationHeaders } from '../../api/headers.js';
import { updatePost } from "../../api/post/update.js";
import { updateFormWithPostData, getUpdatedPostData, setupSaveButton } from '../../ui/post/update.js';
import { API_SOCIAL_POSTS } from "../../api/constants.js";

// Check if user is logged in
authGuard();

// Function for fetching post data (to extract into form)
async function fetchPostData(postId) {
  const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
    method: 'GET',
    headers: getAuthorizationHeaders()
  });

  if (!response.ok) {
    console.error('Failed to fetch post data:', await response.text());
    return null;
  }
  return response.json();
}

console.log('view/postEdit is running')

window.onload = async () => {
  // Get post ID from URL query params
  const postId = new URLSearchParams(window.location.search).get('id');
  console.log('Post ID:', postId);

  // If ID is present, run fetch function to get post data
  if (postId) {
    // Get the post data from the current post
    const postData = await fetchPostData(postId);

    // Update the form with the fetched post data
    if (postData) {
      updateFormWithPostData(postData);
    }

    // Setup save button listener to update the post
    setupSaveButton(async () => {
      const updatedPostData = getUpdatedPostData();
      const result = await updatePost(postId, updatedPostData);

      if (result) {
        console.log('Post updated successfully:', result);
        // Optionally redirect to another page or show a success message
      }
    });
  } else {
    console.error('Post ID not found in URL');
  }
};