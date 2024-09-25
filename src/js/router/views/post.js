import { deletePostById } from '../../api/post/delete.js';
import { readPost } from '../../api/post/read.js';
import { getPostIdFromURL } from '../../utilities/getPostId.js';
import { checkAllStatuses } from '../../ui/global/successPopup.js';

// Ensure checkAllStatuses is called on window load
window.onload = function() {
    checkAllStatuses(); 
    displaySinglePost(); // Load and display the post once the page loads
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
                await deletePostById(postId); // Ensure deletePostById is async
                console.log('Post deleted successfully');

                // Set success message and show popup
                localStorage.setItem('deletePostSuccess', 'true'); 
                checkAllStatuses(); // Show the success popup

                // Delay the redirection to allow the popup to be seen
                const userName = localStorage.getItem('username');
                setTimeout(() => {
                    console.log('Redirecting to profile page');
                    window.location.href = `/profile/index.html?name=${userName}`; // Redirect to profile page
                }, 3000); // Wait for 3 seconds before redirecting

            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    });
}

