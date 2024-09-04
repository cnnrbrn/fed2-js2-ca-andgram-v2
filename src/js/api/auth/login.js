import { API_AUTH_LOGIN, API_AUTH_KEY } from '../constants.js';

export async function handleLogin(email, password) {
  try {
    // Make a POST request to login endpoint
    const response = await fetch(API_AUTH_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to login');
    }

    // Extract access token from response
    const { data } = await response.json();
    const accessToken = data.accessToken;

    // Create API key using access token
    const apiKeyResponse = await fetch(API_AUTH_KEY, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'My API Key name' })
    });

    if (!apiKeyResponse.ok) {
      const errorData = await apiKeyResponse.json();
      throw new Error(errorData.message || 'Failed to create API key');
    }

    // Extract API key from response
    const apiKeyData = await apiKeyResponse.json();
    const apiKey = apiKeyData.data.key;

    // Store access token and API key in local storage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('apiKey', apiKey);

  } catch (error) {
    console.error('Error:', error.message);
    displayErrorMessage(error.message || 'An unknown error occurred. Please try again.');
  }
}
