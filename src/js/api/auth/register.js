import { API_AUTH_REGISTER } from '../constants.js';
import { showError } from '../../ui/global/errorMessage.js';

export async function register({ name, email, password }) {
  try {
    // Make POST request to register endpoint
    const response = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    // Display error to the user
    showError(error.message);
  }
}
