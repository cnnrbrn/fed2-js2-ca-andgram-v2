import { API_SOCIAL_POSTS } from '../constants.js';
import { getAuthorizationHeaders } from '../headers.js';

export async function createPost({ title, body, tags = '', media = '', alt = '' }) {
  const headers = getAuthorizationHeaders();

  // Convert tags to an array of strings
  const tagsArray = tags.split(',').map(tag => tag.trim());

   // Create mediaObject only if media is a valid URL
   const mediaObject = media ? { 
    url: media, 
    alt: alt || 'Image'
  } : undefined;

  // Prepare the body for the request
  const postData = {
    title,
    body,
    tags: tagsArray,
  };

  // Include mediaObject only if it's defined
  if (mediaObject) {
    postData.media = mediaObject;
  }

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
    console.log('Post created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error creating post:', error.message);
    throw error;
  }
}