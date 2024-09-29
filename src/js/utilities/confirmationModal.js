// function to display confirmation modal
export function showConfirm(message) {
    return new Promise((resolve) => {
      const modal = document.getElementById('confirm-modal');
      const messageElem = document.getElementById('confirm-message');
      const okButton = document.getElementById('confirm-ok');
      const cancelButton = document.getElementById('confirm-cancel');
      
      // Set the message in the modal
      if (messageElem) {
        messageElem.textContent = message;
  
      // Show the modal
      modal.style.display = 'block';
  
      // When the OK button is clicked
      okButton.onclick = () => {
        modal.style.display = 'none';
        resolve(true);
      };
  
      // When the Cancel button is clicked
      cancelButton.onclick = () => {
        modal.style.display = 'none';
        resolve(false); // Resolve the promise with false
      };
      }
      
    });
  }