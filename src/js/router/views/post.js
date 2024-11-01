import { readPost } from "../../api/post/read";
import { renderPost } from "../../components/posts/renderPost";
import { displayMessage } from "../../components/shared/displayMessage";
import { getParam } from "../../utilities/getParam";
import { setTitle } from "../../utilities/setTitle";

async function displayPost() {

    const id = getParam("id");

    if(!id) {
        window.location.href = "/";
    }
    
const container = document.querySelector("#post");

try {
    const response = await readPost(id);
    setTitle(response.data.title);
    renderPost(container, response.data);
} catch (error) {
    console.error(error);
    displayMessage(container, "error", error.message);
}
}

displayPost()