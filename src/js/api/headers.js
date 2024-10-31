import { API_KEY } from "./constants";
import { loadToken } from "../utilities/storage"

export function headers() {
  const headers = new Headers();

  const token = loadToken();

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  headers.append('Content-Type', "application/json");

  return headers;
}