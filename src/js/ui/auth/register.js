import { register } from '../../api/auth/register.js';

export async function onRegister(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userData = await register({
      name,
      email,
      password
    });
    localStorage.setItem('registerSuccess', 'true'); 
    console.log('Registration successful', userData);
    // Redirect to login page or another page
    window.location.href = "/auth/login/";
  } catch (error) {
    console.error('Registration failed', error);
    // Show error message to the user
    alert('Registration failed. Please try again.');
  }
}

// Adding event listener to the register form
document.querySelector('form[name="register"]').addEventListener('submit', onRegister);
