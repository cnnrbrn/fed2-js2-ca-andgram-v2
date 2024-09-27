import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from '../../api/constants.js';
import { getAuthorizationHeaders } from '../../api/headers.js';
import { showError } from '../../ui/global/errorMessage.js';

// Fetch post data for single post
export async function readPost(id) {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
            method: 'GET',
            headers: getAuthorizationHeaders()
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to fetch post:', errorText);
            showError('Failed to fetch post. Please try again later.'); // Notify user about the failure
            return null;
        }

        // Define postData from response
        const responseData = await response.json();
        const postData = responseData.data;

        // Get username from localStorage to fetch user posts
        const loggedInUsername = localStorage.getItem('username');

        if (!loggedInUsername) {
            return postData;
        }

       // Retrieve user posts to verify if any belong to the currently logged-in user and match the current post's ID
        const userProfileResponse = await fetch(`${API_SOCIAL_PROFILES}/${loggedInUsername}/posts`, {
            method: 'GET',
            headers: getAuthorizationHeaders(),
        });

        if (!userProfileResponse.ok) {
            const errorText = await userProfileResponse.text();
            console.error('Failed to fetch user profile:', errorText);
            showError('Failed to fetch user profile. Please try again later.');
            return null;
        }

        const userPostsData = await userProfileResponse.json();

        const userPosts = userPostsData.data || [];
        const userPostIds = userPosts.map(post => post.id);

        // Check if any user post has the same Id as active post
        if (userPostIds.includes(postData.id)) {
            // If user is author of post, show edit and delete options
            showEditDeleteOptions();
        } else {
            // If user is not author of post, hide edit and delete options
            hideEditDeleteOptions();
        }
        return postData;

    } catch (error) {
        console.error('Error fetching post:', error);
        showError('An unexpected error occurred while fetching the post.'); // Notify user about error
        return null;
    }
}
// fucntion for showing delete and edit button
function showEditDeleteOptions() {
    document.getElementById('edit-post-btn').style.display = 'block';
    document.getElementById('delete-post-btn').style.display = 'block';
}
// fucntion for hiding delete and edit button
function hideEditDeleteOptions() {
    document.getElementById('edit-post-btn').style.display = 'none';
    document.getElementById('delete-post-btn').style.display = 'none';
}
