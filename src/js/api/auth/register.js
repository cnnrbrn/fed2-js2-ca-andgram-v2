import { API_AUTH_REGISTER } from "../constants";
import { headers } from "../headers";
export async function register({ name, email, password }) {
  

  const body = JSON.stringify({ name, email, password });
  const response = await fetch(`${API_AUTH_REGISTER}`, {
    method: "POST",
    body: body,
    headers: headers(),
  });

  const json = await response.json();

  if (response.ok === false) {
    throw new Error(json.errors[0].message);
  }

  return json;
}