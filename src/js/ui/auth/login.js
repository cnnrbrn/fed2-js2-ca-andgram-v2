// Import the function from api/login.js
import { handleLogin } from "../../api/auth/login.js";

export function onLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    displayErrorMessage('Email and password are required.');
    return;
  }

  handleLogin(email, password)
    .catch(error => {
      console.error('Error during login submission:', error.message);
      displayErrorMessage(error.message || 'An unknown error occurred. Please try again.');
    });
}

function displayErrorMessage(message) {
  // Implement this function to show error messages to the user
  console.error(message);
}


