import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

// Load single post
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

// Load all posts
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

// Load all posts by profile
export async function readPostsbyProfile(username) {

    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}/posts`, {
        headers: headers(),
    });

    const json = await response.json();
    console.log("Profile posts fetched successfully:", json);
    
    if(!response.ok) {
        throw new Error(json.errors[0].message);
    }
    return json;
}


