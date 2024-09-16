import { deletePostById } from '../../api/post/delete.js';
import { readPost } from '../../api/post/read.js';
import { getIdFromUrl } from '../../utilities/getId.js';

const postId = getIdFromUrl();

readPost(postId);

// Add event listener for the delete button
document.getElementById('delete-post-btn').addEventListener('click', () => {
  deletePostById(postId);
});