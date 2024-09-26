import { API_SOCIAL_POSTS } from '../constants.js';
import { getAuthorizationHeaders } from '../headers.js';
import { showError } from '../../ui/global/errorMessage.js';

export async function createPost({ title, body, tags = '', media = '', alt = '' }) {
  const headers = getAuthorizationHeaders();

  // Convert tags to an array of strings
  const tagsArray = tags.split(',').map(tag => tag.trim());

  const mediaObject = { 
    url: media, 
    alt: alt || 'Image'
  };

  try {
    // Send post request with post data
    const response = await fetch(API_SOCIAL_POSTS, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title,
        body,
        tags: tagsArray,
        media: mediaObject
      })
    });

    // Check if the response is okay
    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(errorData.message || 'Failed to create post');
    }

    // Parse and log the successful response
    const data = await response.json();
    console.log('Response from post creation:', data);

    // Check if the response contains the post ID
    const newPostId = data.id || (data.data && data.data.id); 
    if (newPostId) {
      console.log('Redirecting to post with ID:', newPostId);
      window.location.href = `/post/index.html?id=${newPostId}`;
    } else {
      console.error('Post ID not found in the response:', data);
    }

    return data;

  } catch (error) {
    // Display error message to the user
    showError(`Error creating post: ${error.message}`);
  }
}
