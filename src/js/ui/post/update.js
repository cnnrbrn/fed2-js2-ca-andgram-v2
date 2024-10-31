import { updatePost } from "../../api/post/update";
import { displayMessage } from "../../components/shared/displayMessage";

export async function onUpdatePost(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const id = formData.get("id");
    const title = formData.get("title");
    const body = formData.get("body");

    try {
        await updatePost(id, { title, body });
        displayMessage("#message", "success", "Post updated succesdfully.");
        form.reset();
    } catch (error) {
        console.log(error);
        displayMessage("#message", "error", error.message);
    }
} 