export function handleLogout() {
    try {
      // remove tokens from localstorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('apiKey');
  
      // redirect user to login page
      window.location.href = '/auth/login/';
    } catch (error) {
      console.error('Error during logout:', error.message);
      // Show error to user
      alert('An error occurred while logging out. Please try again.');
    }
  }
  


