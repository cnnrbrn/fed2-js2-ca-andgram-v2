import { API_SOCIAL_POSTS } from '../../api/constants.js';
import { getAuthorizationHeaders } from '../../api/headers.js';

// Fetch post data for single post
export async function readPost(id) {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
            method: 'GET',
            headers: getAuthorizationHeaders()
        });

        if (!response.ok) {
            console.error('Failed to fetch post:', await response.text());
            return null; // Return null if fetching fails
        }

        // Define responseData and convert to JSON
        const responseData = await response.json();
        console.log('Response data received:', responseData);

        // Access the actual post data
        const postData = responseData.data;
        console.log('Post data:', postData);

        return postData; // Return the post data

    } catch (error) {
        console.error('Error fetching post:', error);
        return null; // Return null in case of error
    }
}




export async function readPosts(limit = 12, page = 1, tag) { }

export async function readPostsByUser(username, limit = 12, page = 1, tag) { }
