import { API_AUTH_REGISTER } from '../constants.js';
import { showError, logError } from '../../ui/global/errorMessage.js'; // Import error handling functions

export async function register({ name, email, password }) {
  try {
    // Gjør en POST-forespørsel til registreringsendepunktet
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
    
    // Log error to the console for debugging
    logError(error);
  }
}
