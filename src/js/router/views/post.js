import { deletePostById } from '../../api/post/delete.js';
import { readPost } from '../../api/post/read.js';
import { getPostIdFromURL } from '../../utilities/getPostId.js';



async function displaySinglePost() {
    const postId = getPostIdFromURL();

    if (!postId) {
        console.error('Post ID not found');
        return;
    }

    try {
        const postData = await readPost(postId);

        if (postData) {
            // Display post title and body
            document.getElementById('post-title').textContent = postData.title || 'Untitled';
            document.getElementById('post-body').textContent = postData.body || 'No content';

            const editButton = document.getElementById('edit-post-btn');
            editButton.addEventListener('click', () => {
            window.location.href = `/post/edit/?id=${postId}`;
        });

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

displaySinglePost();

// Add event listener for the delete button
document.getElementById('delete-post-btn').addEventListener('click', () => {
    const postId = getPostIdFromURL(); // Ensure the post ID is retrieved correctly
    if (postId) {
        deletePostById(postId);
    }
});
