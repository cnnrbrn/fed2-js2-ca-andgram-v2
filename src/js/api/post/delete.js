import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function deletePost(id) {

    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
        method: "DELETE",
        headers: headers(),
      });
    
      if (response.ok === false) {
        throw new Error("Delete failed");
      }

}