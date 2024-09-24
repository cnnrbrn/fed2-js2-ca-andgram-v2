// Function to display error in a popup/modal
export function showError(errorMessage) {
  // Create an error container if it doesn't exist
  let errorContainer = document.getElementById('error-popup');

  if (!errorContainer) {
      // Create a new div for the error popup
      errorContainer = document.createElement('div');
      errorContainer.id = 'error-popup';
      errorContainer.style.position = 'fixed';
      errorContainer.style.top = '50%';
      errorContainer.style.left = '50%';
      errorContainer.style.transform = 'translate(-50%, -50%)';
      errorContainer.style.backgroundColor = '#ff4d4f';
      errorContainer.style.color = '#fff';
      errorContainer.style.padding = '20px';
      errorContainer.style.borderRadius = '8px';
      errorContainer.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
      errorContainer.style.zIndex = '1000';
      errorContainer.style.textAlign = 'center';

      document.body.appendChild(errorContainer);
  }

  // Set the error message
  errorContainer.textContent = `Error: ${errorMessage}`;

  // Hide the error popup after 5 seconds
  setTimeout(() => {
      errorContainer.remove();
  }, 5000);
}

// Function to log the error
export function logError(error) {
  console.error('Logged Error:', error);
}
