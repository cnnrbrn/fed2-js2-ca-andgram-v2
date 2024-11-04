import { deletePost } from "../../api/post/delete";
import { displayMessage } from "../../components/shared/displayMessage";

export async function onDeletePost(event) {
  event.preventDefault();

  if (confirm("Are you sure you want to delete this post?")) {
      const button = event.target;
      const { id } = button.dataset;

      try {
          await deletePost(id);
          button.removeEventListener("click", onDeletePost);

          const postElement = button.closest("a.post");
          if (postElement) {
              postElement.remove();
          }

          displayMessage("#message", "success", "Post deleted successfully.");
          setTimeout(() => {
              window.location.href = "/profile/";
          }, 2000);
      } catch (error) {
          console.error("Error deleting post: ", error.message);
          displayMessage("#message", "error", error.message);
      }
  }
}
