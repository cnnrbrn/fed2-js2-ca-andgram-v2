import { API_SOCIAL_POSTS } from '../../api/constants.js';
import { getAuthorizationHeaders } from '../../api/headers.js';
// Function for fetching and displaying single post
export async function readPost(id) {

    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
            method: 'GET',
            headers: getAuthorizationHeaders()
        });

        if (!response.ok) {
            console.error('Failed to fetch post:', await response.text());
            return;
        }

        // Define responsedata and convert to JSON
        const responseData = await response.json();
        console.log('Response data received:', responseData);

        // Access the actual post data
        const postData = responseData.data;
        console.log('Post data:', postData);

        if (postData) {
            // Display post title and body if postData exist
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



export async function readPosts(limit = 12, page = 1, tag) { }

export async function readPostsByUser(username, limit = 12, page = 1, tag) { }
