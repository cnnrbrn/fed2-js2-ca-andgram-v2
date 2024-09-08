export function getAuthorizationHeaders() {
  const accessToken = localStorage.getItem('accessToken');
  const apiKey = localStorage.getItem('apiKey');

  if (!accessToken || !apiKey) {
    throw new Error('Access token or API key not found');
  }

  // Construct headers with access token and API key
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
    'X-Noroff-API-Key': apiKey
  };
  return headers;
}
