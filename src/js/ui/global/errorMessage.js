// Function to display error in a popup/modal
export function showError(errorMessage) {
  // Create an error container if it doesn't exist
  let errorContainer = document.getElementById('error-popup');

  if (!errorContainer) {
    // Create a new div for the error popup
    errorContainer = document.createElement('div');
    errorContainer.id = 'error-popup';
  
    // Append the container to the body
    document.body.appendChild(errorContainer);
  }

  // Set the error message
  errorContainer.textContent = `Error: ${errorMessage}`;

  // Hide the error popup after 5 seconds
  setTimeout(() => {
      errorContainer.remove();
  }, 5000);
}
