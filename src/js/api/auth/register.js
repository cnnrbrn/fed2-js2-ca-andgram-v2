import { API_AUTH_REGISTER } from '../constants.js';

export async function register({
  name,
  email,
  password
}) {

  const response = await fetch('https://v2.api.noroff.dev/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  const data = await response.json();
  return data;
}
