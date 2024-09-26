import { createPost } from "../../api/post/create";
import { showError, logError } from '../../ui/global/errorMessage.js';

export async function onCreatePost(event) {
  event.preventDefault();

  const form = event.target;
  const title = form.elements.title.value.trim(); 
  const body = form.elements.body.value.trim();   
  const tags = form.elements.tags.value.trim();  
  const media = form.elements.media.value.trim(); 
  const alt = form.elements.alt.value.trim(); 

  // Basic validation to ensure required fields are filled
  if (!title || !body) {
    showError('Title and body are required fields.'); // Display error if required fields are empty
    return;
  }

  try {
    const newPost = await createPost({ title, body, tags, media, alt });

    console.log('New post object:', newPost);

    localStorage.setItem('newPostSuccess', 'true');
    console.log('Post created successfully');
    
    form.reset();

  } catch (error) {
    console.error('Error creating post:', error.message);
    showError(error.message || 'An error occurred while creating the post. Please try again.'); // Show user-friendly error message
  }
}

// Adding event listener to the create post form
document.querySelector('form[name="createPost"]').addEventListener('submit', onCreatePost);
