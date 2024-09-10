import { API_SOCIAL_POSTS } from '../constants.js';
import { getAuthorizationHeaders } from '../headers.js';

// function for updating post with new data
export async function updatePost(postId, postData) {
    // send PUT request to update post
  const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
    method: 'PUT',
    headers: {
      ...getAuthorizationHeaders(),
      'Content-Type': 'application/json'
    },
    // add post data from edit form to body
    body: JSON.stringify(postData)
  });

  // Handle error if request fails
  if (!response.ok) {
    console.error('Failed to update post:', await response.text());
    return null;
  }

  return response.json();
}
