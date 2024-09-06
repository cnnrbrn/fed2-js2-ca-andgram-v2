
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
  
  // Kjør oppdateringsfunksjonen når skriptet lastes inn
  updateNav();
  