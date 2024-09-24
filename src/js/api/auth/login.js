import { API_AUTH_LOGIN, API_AUTH_KEY } from '../constants.js';
import { getAuthorizationHeaders } from '../headers.js';
import { showError, logError } from '../../ui/global/errorMessage.js';

export async function handleLogin(email, password) {
  try {
    // Make a POST request to the login endpoint
    const response = await fetch(API_AUTH_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      showError(errorData.message || 'Failed to login'); // Use showError for login errors
      return; // Exit if login fails
    }

    // Get access token from the response
    const { data } = await response.json();
    const accessToken = data.accessToken;

    // Create API key using access token
    const apiKeyResponse = await fetch(API_AUTH_KEY, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'My API Key' }),
    });

    if (!apiKeyResponse.ok) {
      const errorData = await apiKeyResponse.json();
      showError(errorData.message || 'Failed to create API key'); // Use showError for API key creation errors
      return; // Exit if API key creation fails
    }

    // Get the API key from the response
    const apiKeyData = await apiKeyResponse.json();
    const apiKey = apiKeyData.data.key;

    // Store access token and API key in local storage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('apiKey', apiKey);

    // Prompt user for their username
    const username = prompt('Please confirm your username:');
    if (username) {
      // Validate the username against the email
      const headers = getAuthorizationHeaders(); // Move header declaration outside fetch
      const profileResponse = await fetch(`https://v2.api.noroff.dev/social/profiles/${username}`, {
        method: 'GET',
        headers, // Use headers object here
      });

      if (!profileResponse.ok) {
        showError('Username does not exist or unauthorized access'); // Use showError for profile fetch errors
        return; // Exit if profile fetch fails
      }

      const profileData = await profileResponse.json();
      const userEmail = profileData.data.email; // Assuming email is part of the returned data

      // Check if the email matches
      if (userEmail !== email) {
        showError('Username does not match the email'); // Use showError for email mismatch
        return; // Exit if email doesn't match
      }

      // Store the username in local storage
      localStorage.setItem('username', username);
    }

    // Set a flag indicating successful login
    localStorage.setItem('loginSuccess', 'true');

    // Redirect user to the home page
    window.location.href = '/';

  } catch (error) {
    showError('An unexpected error occurred. Please try again.'); // Use showError for unexpected errors
    logError(error); // Log unexpected errors for debugging purposes
  }
}
