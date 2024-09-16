import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();

console.log('script is running');

const form = document.forms.createPost;

if (form) {
  form.addEventListener("submit", onCreatePost);
} else {
  console.error('Form not found');
}

