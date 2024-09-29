import { handleLogin } from "../../api/auth/login.js";
import { showError } from "../global/errorMessage.js";

// Retrieve form data, validate it, and pass to the handleLogin function
export function onLogin(event) {
  event.preventDefault();
  
  // Get value from input fields
  const email = document.getElementById('email').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Ensure all fields have a value; show error and return if validation fails
  if (!email || !password || !username) {
    showError('Email, username and password are required.');
    return;
  }

  // Call handleLogin to submit login information to the endpoint
  handleLogin(email, password, username)
    .catch(error => {
      console.error('Error during login submission:', error.message);
      showError(error.message || 'An unknown error occurred. Please try again.');
    });
}

