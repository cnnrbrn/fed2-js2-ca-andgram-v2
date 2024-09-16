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
    await createPost({ title, body, tags, media, alt }); // Pass both media and alt
    console.log('Post created successfully');
    window.location.href = '/profile/';

  } catch (error) {
    console.error('Error creating post:', error.message);
    alert('Failed to create post. Please try again.');
  }
}
