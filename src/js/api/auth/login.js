import { API_AUTH_LOGIN, API_AUTH_KEY } from '../constants.js';
import { getAuthorizationHeaders } from '../headers.js';

export async function handleLogin(email, password) {
  try {
    // Gjør en POST-forespørsel til innloggingsendepunktet
    const response = await fetch(API_AUTH_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to login');
    }

    // Hent access token fra svaret
    const { data } = await response.json();
    const accessToken = data.accessToken;

    // Lag API-nøkkel ved hjelp av access token
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
      throw new Error(errorData.message || 'Failed to create API key');
    }

    // Hent API-nøkkelen fra svaret
    const apiKeyData = await apiKeyResponse.json();
    const apiKey = apiKeyData.data.key;

    // Lagre access token og API-nøkkel i local storage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('apiKey', apiKey);

    // Be om brukernavn fra brukeren
    const username = prompt('Vennligst bekreft brukernavnet ditt:');
    if (username) {
      // Valider brukernavnet mot e-posten
      const headers = getAuthorizationHeaders(); // Flytter headerdeklasjonen utenfor fetch
      const profileResponse = await fetch(`https://v2.api.noroff.dev/social/profiles/${username}`, {
        method: 'GET',
        headers, // Bruker headers objektet her
      });

      if (!profileResponse.ok) {
        throw new Error('Brukernavn eksisterer ikke eller uautorisert tilgang');
      }

      const profileData = await profileResponse.json();
      const userEmail = profileData.data.email; // Assuming email is part of the returned data
      console.log(userEmail)
      // Sjekk om e-posten matcher
      if (userEmail !== email) {
        throw new Error('Brukernavnet stemmer ikke overens med e-posten');
      }

      // Lagre brukernavnet i local storage
      localStorage.setItem('username', username);
    }

    // Sett en flagg som indikerer vellykket innlogging
    localStorage.setItem('loginSuccess', 'true');

    // Omdiriger brukeren til hjemme-siden
    window.location.href = '/';

  } catch (error) {
    console.error('Error:', error.message);
  }
}
