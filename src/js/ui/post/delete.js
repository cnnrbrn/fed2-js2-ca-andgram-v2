import { deletePost } from "../../api/post/delete";

export async function onDeletePost(event) {
    event.preventDefault();

    if (confirm("Are you sure you want to delete this post?")) {
        const button = event.target;
        const { id } = button.dataset;

        try {
          await deletePost(id);
          button.removeEventListener("click", onDeletePost);
          button.closest("a.post").remove();
        } catch(error) {
            displayMessage("#message", "error", error.message);
         }
    }
    
}