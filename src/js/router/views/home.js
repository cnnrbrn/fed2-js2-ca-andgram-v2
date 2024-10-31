import { readPosts } from "../../api/post/read";
import { renderPosts } from "../../components/posts/renderPosts";
import { displayMessage } from "../../components/shared/displayMessage";
import { authGuard } from "../../utilities/authGuard";

authGuard();


async function displayPosts() {
    const container = document.querySelector("#posts");

    try {
        const response = await readPosts();
        renderPosts(container, response.data);
        
    }
    catch (error) {
        console.error(error);
        displayMessage(container, "error", error.message);
    }
    
}

displayPosts();