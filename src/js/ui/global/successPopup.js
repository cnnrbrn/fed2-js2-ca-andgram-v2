// General function to show a popup with a custom message
function showPopup(message) {
    const popup = document.getElementById('successPopup');
    if (popup) {
      popup.innerText = message;
      popup.style.display = 'block';
      setTimeout(() => {
        popup.style.display = 'none';
      }, 3000);
    }
  }
  // Function to check the update status
  function checkUpdateStatus() {
    if (localStorage.getItem('updateSuccess') === 'true') {
      localStorage.removeItem('updateSuccess');
      showPopup('Post updated successfully!');
    }
  }
  // Function to check login status
  function checkLoginStatus() {
    if (localStorage.getItem('loginSuccess') === 'true') {
      localStorage.removeItem('loginSuccess');
      showPopup('Login successful!');
    }
  }
  // Function to check logout status
  function checkLogoutStatus() {
    if (localStorage.getItem('logoutSuccess') === 'true') {
      localStorage.removeItem('logoutSuccess');
      showPopup('Logout successful!');
    }
  }
  // Function to check new post creation status
  function checkNewPostStatus() {
    if (localStorage.getItem('newPostSuccess') === 'true') {
      localStorage.removeItem('newPostSuccess');
      showPopup('New post created successfully!');
    }
  }
  // Function to check new post creation status
  function checkDeleteStatus() {
    if (localStorage.getItem('deletePostSuccess') === 'true') {
      localStorage.removeItem('deletePostSuccess');
      showPopup('Post was deleted successfully!');
    }
  }
  // Function to check new registration status
  function checkRegisterStatus() {
    if (localStorage.getItem('registerSuccess') === 'true') {
      localStorage.removeItem('registerSuccess');
      showPopup('User successfully registered!');
    }
  }
  
  // Construct function that checks all statuses
  export function checkAllStatuses() {
    checkUpdateStatus();
    checkLoginStatus();
    checkLogoutStatus();
    checkNewPostStatus();
    checkDeleteStatus();
    checkRegisterStatus();
  }