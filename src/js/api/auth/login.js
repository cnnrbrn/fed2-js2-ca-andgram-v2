import { API_AUTH_LOGIN } from "../constants.js";
import { headers } from "../headers.js";
export async function login({ email, password }) {

  const body = JSON.stringify({ email, password });

  const response = await fetch(`${API_AUTH_LOGIN}`, {
    method: "POST",
    body: body,
    headers: headers(),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Login failed");
  }

  return await response.json();
}