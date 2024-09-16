import { API_SOCIAL_POSTS } from '../constants.js';
import { getAuthorizationHeaders } from '../headers.js';

export async function createPost({ title, body, tags, media, alt }) {
  const headers = getAuthorizationHeaders();

  // Convert tags to an array of strings
  const tagsArray = tags.split(',').map(tag => tag.trim());

  const mediaObject = { 
    url: media, 
    alt: alt || 'Image' // Default alt text if none is provided
  };

  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title,
        body,
        tags: tagsArray,   // Tags as array of strings
        media: mediaObject // Media as an object
      })
    });

    // Check if the response is okay
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      console.error('Failed to create post:', errorData);
      throw new Error(`Failed to create post: ${errorData.message}`);
    }

    // Parse and log the successful response
    const data = await response.json();
    console.log('Post created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error creating post:', error.message);
    throw error;
  }
}