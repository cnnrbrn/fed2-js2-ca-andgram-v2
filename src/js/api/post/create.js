import { API_SOCIAL_POSTS } from '../constants.js';
import { getAuthorizationHeaders } from '../headers.js';

export async function createPost({ title, body, tags, media }) {

  const response = await fetch(API_SOCIAL_POSTS, {
    method: 'POST',
    headers: getAuthorizationHeaders(),
    body: JSON.stringify({ title, body, tags, media })
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return await response.json();
}
