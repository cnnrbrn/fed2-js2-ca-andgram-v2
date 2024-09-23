import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from '../../api/constants.js';
import { getAuthorizationHeaders } from '../../api/headers.js';

// Fetch post data for single post
export async function readPost(id) {
    try {
        console.log('Fetching post with ID:', id);
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
            method: 'GET',
            headers: getAuthorizationHeaders()
        });

        console.log('API response status:', response.status);
        if (!response.ok) {
            console.error('Failed to fetch post:', await response.text());
            return null; // Return null if fetching fails
        }

        const responseData = await response.json();
        const postData = responseData.data;
        console.log('Post data:', postData);

        const loggedInUsername = localStorage.getItem('username');
        console.log('Logged in username from localStorage:', loggedInUsername);

        if (!loggedInUsername) {
            console.warn('No logged in username found in localStorage.');
            return postData;
        }

        // Hent innleggene til brukeren
        console.log('Fetching posts for logged in user:', loggedInUsername);
        const userProfileResponse = await fetch(`${API_SOCIAL_PROFILES}/${loggedInUsername}/posts`, {
            method: 'GET',
            headers: getAuthorizationHeaders(),
        });

        console.log('Profile API response status:', userProfileResponse.status);
        if (!userProfileResponse.ok) {
            console.error('Failed to fetch user profile:', await userProfileResponse.text());
            return null;
        }

        const userPostsData = await userProfileResponse.json();
        console.log('User profile posts data:', userPostsData);

        // Sjekk at vi faktisk har innlegg
        const userPosts = userPostsData.data || [];
        console.log('User posts:', userPosts);

        const userPostIds = userPosts.map(post => post.id);
        console.log('User post IDs:', userPostIds);

        if (userPostIds.includes(postData.id)) {
            console.log('User is the author of this post. Showing edit/delete options.');
            showEditDeleteOptions();
        } else {
            console.log('User is not the author of this post. Edit/Delete options hidden.');
            hideEditDeleteOptions();
        }

        return postData;

    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

function showEditDeleteOptions() {
    document.getElementById('edit-post-btn').style.display = 'block';
    document.getElementById('delete-post-btn').style.display = 'block';
}

function hideEditDeleteOptions() {
    document.getElementById('edit-post-btn').style.display = 'none';
    document.getElementById('delete-post-btn').style.display = 'none';
}
