import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function updatePost(id, { title, body }) {

    const data = JSON.stringify({ title, body });

    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
        method: "PUT",
        body: data,
        headers: headers(),
      });
    
      const json = await response.json();
    
      if (response.ok === false) {
        throw new Error(json.errors[0].message);
      }
    
      return json;
}