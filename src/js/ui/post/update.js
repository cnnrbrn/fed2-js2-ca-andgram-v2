// Function to update the form with post data
export function updateFormWithPostData(postData) {
  const { title, body, tags, media } = postData.data;

  // Set the form values
  document.getElementById('title').value = title || '';
  document.getElementById('body').value = body || '';
  document.getElementById('tags').value = tags ? tags.join(', ') : '';

  // Handle media fields
  document.getElementById('media-url').value = media?.url || '';
  document.getElementById('media-alt').value = media?.alt || '';
}

// Function to collect data from the form
export function getUpdatedPostData() {
  const title = document.getElementById('title').value.trim();
  const body = document.getElementById('body').value.trim();
  const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
  const media = {
    url: document.getElementById('media-url').value.trim(),
    alt: document.getElementById('media-alt').value.trim()
  };

  // Basic validation to ensure required fields are filled
  if (!title) {
    showError('Title is required.'); // Display error if title is empty
    return null;
  }

  if (!body) {
    showError('Body is required.'); // Display error if body is empty
    return null;
  }

  return {
    title,
    body,
    tags,
    media: media.url ? media : null // Only include media if the URL is provided
  };
}

// Function to add event listener to the save button
export function setupSaveButton(callback) {
  document.getElementById('save-button').addEventListener('click', async (event) => {
    event.preventDefault();
    const updatedPostData = getUpdatedPostData(); // Get updated post data

    if (updatedPostData) { // Proceed only if data is valid
      try {
        await callback(updatedPostData);
        if (updatedPostData) {
          localStorage.setItem('updateSuccess', 'true');
        }
      } catch (error) {
        console.error('Error updating post:', error.message);
        showError(error.message || 'An error occurred while updating the post. Please try again.'); // Show user-friendly error message
      }
    }
  });
}
