import { deletePostById } from '../../api/post/delete.js';
import { readPost } from '../../api/post/read.js';
import { getPostIdFromURL } from '../../utilities/getPostId.js';
import { checkAllStatuses } from '../../ui/global/successPopup.js';
import { redirectToProfile } from '../../api/profile/myProfileRedirect.js';

window.onload = function() {
    displaySinglePost(); // Display post data on page load
    checkAllStatuses();
};

// Function to display a single post
async function displaySinglePost() {
    const postId = getPostIdFromURL(); // Fetch the post ID from the URL

    if (!postId) {
        console.error('Post ID not found');
        return;
    }

    try {
        // Fetch the post data by post ID
        const postData = await readPost(postId);

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
                postMedia.style.display = 'none'; // Hide the media element if no image is present
            }

            // Attach event listener for the edit button
            const editButton = document.getElementById('edit-post-btn');
            if (editButton) {
                editButton.addEventListener('click', () => {
                    // Redirect to edit post page
                    window.location.href = `/post/edit/?id=${postId}`;
                });
            }
        } else {
            console.error('Post data is empty or undefined');
        }
    } catch (error) {
        console.error('Error fetching post:', error);
    }
}

// Add event listener for the delete button
const deleteButton = document.getElementById('delete-post-btn');
if (deleteButton) {
    deleteButton.addEventListener('click', async () => {
        const postId = getPostIdFromURL(); // Retrieve the post ID
        if (postId) {
            try {
            const deletionSuccessful = await deletePostById(postId);

            // Check if the deletion was successful
            if (deletionSuccessful) {
                // Show success popup
                localStorage.setItem('deletePostSuccess', 'true'); 
                checkAllStatuses();
    
                // Delay the redirection to allow the popup to be seen
                setTimeout(() => {
                    redirectToProfile(); // Redirect to profile page
                }, 3000);
            } else {
                // Handle the case where deletion was not successful
                console.error('Post deletion failed.');
                // Optionally show a failure message or notification
            }
                
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    });
}

