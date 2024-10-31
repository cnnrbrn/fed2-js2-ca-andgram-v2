import { authGuard } from "../../utilities/authGuard";
import { getParam } from "../../utilities/getParam";
import { readPost } from "../../api/post/read";
import { displayMessage } from "../../components/shared/displayMessage";
import { setTitle } from "../../utilities/setTitle";
import { onUpdatePost } from "../../ui/post/update";

authGuard();

async function populateForm() {

    const id = getParam("id");

    if (!id) {
        window.location.href = "/";
    }

    try {
        const response = await readPost(id);
        setTitle(`Editing ${response.data.title}`);

        const form = document.forms.editPost;
        form.id.value = response.data.id;
        form.title.value = response.data.title;
        form.body.value = response.data.body;
        form.addEventListener("submit", onUpdatePost);
    } catch (error) {
        console.error(error);
        displayMessage("#message", "error", error.message);
    }
}
populateForm()