// Import the function from api/login.js
import { handleLogin } from '../../api/auth/login.js';

// Function to handle form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      displayErrorMessage('Email and password are required.');
      return;
    }

    try {
      await handleLogin(email, password);
    } catch (error) {
      console.error('Error during login:', error.message);
      displayErrorMessage(error.message || 'An unknown error occurred. Please try again.');
    }
  });
}


