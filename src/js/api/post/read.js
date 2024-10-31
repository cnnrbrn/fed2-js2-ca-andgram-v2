import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function readPost(id) {

    if(!id) {
        throw new Error("This call needs an id");
    }

    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
        headers: headers(),
    });

    const json = await response.json();
    
    if(!response.ok) {
        throw new Error(json.errors[0].message);
    }

    return json;


}

export async function readPosts() {

    const response = await fetch(`${API_SOCIAL_POSTS}?_author=true`, {
        headers: headers(),
    });

    const json = await response.json();
    
    if(!response.ok) {
        throw new Error(json.errors[0].message);
    }

    return json;
}