import { createPost } from "../../api/post/create";

export async function onCreatePost(event) {
  event.preventDefault();

  const form = event.target;
  const title = form.elements.title.value;
  const body = form.elements.body.value;
  const tags = form.elements.tags.value;
  const media = form.elements.media.value;
  const alt = form.elements.alt.value; // Capture alt text

  try {
    const newPost = await createPost({ title, body, tags, media, alt });
    
    // Log the entire newPost object to see its structure
    console.log('New post object:', newPost);

    localStorage.setItem('newPostSuccess', 'true');
    console.log('Post created successfully');

  } catch (error) {
    console.error('Error creating post:', error.message);
    alert('Failed to create post. Please try again.');
  }
}
