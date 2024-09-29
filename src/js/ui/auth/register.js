import { register } from '../../api/auth/register.js';
import { showError } from '../global/errorMessage.js';

export async function onRegister(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

    // Basic client-side validation
    if (!name || !email || !password) {
      showError('Please fill out all required fields.');
      return;
    }

  try {
    const userData = await register({ name, email, password });

    // Store registration success and redirect
    localStorage.setItem('registerSuccess', 'true'); 
    window.location.href = "/auth/login/";
  } catch (error) {
    console.error('Registration failed:', error);
    showError('Registration failed. Please try again later.');
  }
}
// Adding event listener to the register form
document.querySelector('form[name="register"]').addEventListener('submit', onRegister);
