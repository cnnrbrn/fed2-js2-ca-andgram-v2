// Function to update the form with post data
export function updateFormWithPostData(postData) {
    document.getElementById('title').value = postData.title || '';
    document.getElementById('body').value = postData.body || '';
    document.getElementById('tags').value = postData.tags ? postData.tags.join(', ') : '';
    document.getElementById('media-url').value = postData.media ? postData.media.url : '';
    document.getElementById('media-alt').value = postData.media ? postData.media.alt : '';
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
  