// Function to update the form with post data
export function updateFormWithPostData(postData) {
  const { title, body, tags, media } = postData.data; // Destructure the necessary fields

  // Set the form values
  document.getElementById('title').value = title || '';
  document.getElementById('body').value = body || '';
  document.getElementById('tags').value = tags ? tags.join(', ') : '';

  // Handle media fields
  document.getElementById('media-url').value = media?.url || '';  // Optional chaining
  document.getElementById('media-alt').value = media?.alt || '';
}

  
  // Function to collect data from the form
  export function getUpdatedPostData() {
    return {
      title: document.getElementById('title').value,
      body: document.getElementById('body').value,
      tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()),
      media: {
        url: document.getElementById('media-url').value,
        alt: document.getElementById('media-alt').value
      }
    };
  }
  
  // Function to add event listener to the save button
  export function setupSaveButton(callback) {
    document.getElementById('save-button').addEventListener('click', callback);
  }
  