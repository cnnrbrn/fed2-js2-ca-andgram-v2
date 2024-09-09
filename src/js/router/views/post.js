import { API_SOCIAL_POSTS } from '../../api/constants.js';
import { getAuthorizationHeaders } from '../../api/headers.js';

// Get post ID from URL
const postId = new URLSearchParams(window.location.search).get('id');
console.log('Post ID:', postId);

// Fetch and display the post
async function displayPost() {
  if (!postId) {
    console.error('Post ID not found');
    return;
  }

  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
      method: 'GET',
      headers: getAuthorizationHeaders()
    });

    if (!response.ok) {
      console.error('Failed to fetch post:', await response.text());
      return;
    }

    const responseData = await response.json();
    console.log('Response data received:', responseData);

    // Access the actual post data
    const postData = responseData.data; // Ensure postData is accessed correctly
    console.log('Post data:', postData);

    if (postData) {
        // Display post title and body
        document.getElementById('post-title').textContent = postData.title || 'Untitled';
        document.getElementById('post-body').textContent = postData.body || 'No content';
  
        // Display post media if available
        const postMedia = document.getElementById('post-media');
        if (postData.media && postData.media.url) {
          postMedia.src = postData.media.url;
          postMedia.alt = postData.media.alt || 'Post image';
          postMedia.style.display = 'block'; // Make the image visible
        } else {
          postMedia.style.display = 'none'; // Hide if no media
        }
      } else {
        console.error('Post data is empty or undefined');
      }
  
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }
  
 displayPost();