
import { handleLogout } from './logout.js';

export function updateNav() {
    
    const isLoggedIn = !!localStorage.getItem('accessToken');
    
    const profileLink = document.getElementById('myProfile');
    const loginLink = document.getElementById('login');
    const registerLink = document.getElementById('register');
    const logoutButton = document.getElementById('logoutButton');
  
    if (isLoggedIn) {
      profileLink.style.display = 'block';
      loginLink.style.display = 'none';
      registerLink.style.display = 'none';
      logoutButton.style.display = 'block';
    } else {
      profileLink.style.display = 'none';
      loginLink.style.display = 'block';
      registerLink.style.display = 'block';
      logoutButton.style.display = 'none';
    }
      
      if (logoutButton) {
        logoutButton.addEventListener('click', () => {
          handleLogout();
        });
    }
  }

  // Function to display greeting if the user is logged in
 export function displayGreeting (){
    const greetingElement = document.getElementById('greeting');
    const showGreeting = localStorage.getItem('showGreeting');
  
    if (greetingElement && showGreeting === 'true') {
      // Show the greeting message
      greetingElement.classList.add('show');
  
      // Hide the message after 3 seconds
      setTimeout(() => {
        greetingElement.style.opacity = '0'; // Start fade-out
        setTimeout(() => {
          greetingElement.classList.add('hidden'); // Remove from view after fade-out
        }, 1000); // Time to match the fade-out duration
      }, 3000); // Duration to show the message
      // Clear the flag so the message won't show on page refresh
    localStorage.removeItem('showGreeting');
    }
  }

  

