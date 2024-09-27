import { API_AUTH_LOGIN, API_AUTH_KEY } from '../constants.js';
import { getAuthorizationHeaders } from '../headers.js';
import { showError } from '../../ui/global/errorMessage.js';

export async function handleLogin(email, password, username) {
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
      showError(errorData.message || 'Failed to login'); // Show error to user
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
      showError(errorData.message || 'Failed to create API key'); // Show error to user
      return; // Exit if API key creation fails
    }

    // Get the API key from the response
    const apiKeyData = await apiKeyResponse.json();
    const apiKey = apiKeyData.data.key;

    // Store apiKey, accessToken and email in localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('email', email);

    // Verify that the username exists and that the associated email matches the login email
    const headers = getAuthorizationHeaders();
    const profileResponse = await fetch(`https://v2.api.noroff.dev/social/profiles/${username}`, {
      method: 'GET',
      headers,
    });

    if (!profileResponse.ok) {
      showError('Username does not exist or unauthorized access'); // Show error to user
      return; // Exit if profile fetch fails
    }  
    // Assign profile data to ProfileData variable
    const profileData = await profileResponse.json();
    // Get email from fetched user
    const userEmail = profileData.data.email; 
    // Get email from logged in user
    const loggedInEmail = localStorage.getItem('email');

    // Check if userEmail matches loggedInEmail
    if (userEmail !== loggedInEmail) {
      throw new Error('Brukernavnet stemmer ikke overens med e-posten');
    }

    // Store the username in local storage for future use
    localStorage.setItem('username', username);

    // Set a flag indicating successful login
    localStorage.setItem('loginSuccess', 'true');

    // Redirect user to the home page
    window.location.href = '/';

  } catch (error) {
    showError('An unexpected error occurred. Please try again.'); // Show error to user
  }
}
