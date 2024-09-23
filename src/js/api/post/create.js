import { API_SOCIAL_POSTS } from '../constants.js';
import { getAuthorizationHeaders } from '../headers.js';

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
      console.error('Failed to create post:', errorData);
      throw new Error(`Failed to create post: ${errorData.message}`);
    }

    // Parse and log the successful response
    const data = await response.json();
    console.log('Response from post creation:', data); // Log the whole response

    // Check if the response contains the ID
    const newPostId = data.id || (data.data && data.data.id); // Adjust this based on your API response
    if (newPostId) {
      console.log('Redirecting to post with ID:', newPostId);
      window.location.href = `/post/index.html?id=${newPostId}`;
    } else {
      console.error('Post ID not found in the response:', data);
    }

    return data;
  } catch (error) {
    console.error('Error creating post:', error.message);
    throw error;
  }
}
