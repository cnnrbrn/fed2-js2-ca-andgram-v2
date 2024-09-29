import { createPost } from "../../api/post/create";
import { showError } from '../../ui/global/errorMessage.js';
import { checkAllStatuses } from "../global/successPopup.js";

// Retrieve form input and pass the data to the createPost function
export async function onCreatePost(event) {
  event.preventDefault();

  // Get value from form inputs
  const form = event.target;
  const title = form.elements.title.value.trim();
  const body = form.elements.body.value.trim();
  const tags = form.elements.tags.value.trim();
  const media = form.elements.media.value.trim();
  const alt = form.elements.alt.value.trim();

  // Basic validation to ensure required fields are filled
  if (!title || !body) {
    showError('Title and body are required fields.'); // Show error to user
    return;
  }

  try {
    // Process the data through the createPost function
    const newPost = await createPost({ title, body, tags, media, alt });
    if (newPost) {
      // Reset form
      form.reset();
    } else {
      showError('Post creation failed.');
    }

  } catch (error) {
    console.error('Error creating post:', error);

    // Check for and display error messages if available
    if (error.errors && Array.isArray(error.errors)) {
      const errorMessages = error.errors.map(err => err.message).join(', ');
      showError(errorMessages);
    } else {
      // Show a fallback error message if no specific errors are provided
      showError(error.message || 'An error occurred while creating the post. Please try again.');
    }
  }
}

// Add event listener to the create post form
document.querySelector('form[name="createPost"]').addEventListener('submit', onCreatePost);
