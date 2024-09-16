import { API_SOCIAL_PROFILES, API_SOCIAL_POSTS } from '../../api/constants.js';
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

// Not used for now
export async function readPosts(limit = 12, page = 1, tag) {}



export async function readPostsByUser(username, limit = 12, page = 1, tag) {
    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${username}/posts?limit=${limit}&page=${page}&tag=${tag || ''}`, {
            method: 'GET',
            headers: getAuthorizationHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const responseData = await response.json();
        return responseData;  // Return the posts data to be used elsewhere
    } catch (error) {
        console.error('Error fetching posts by user:', error);
        return { data: [] };  // Return an empty array on error
    }
}


