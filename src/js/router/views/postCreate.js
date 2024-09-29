import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";
import { checkAllStatuses } from "../../ui/global/successPopup";

checkAllStatuses();
authGuard();

// Get create post form
const form = document.forms.createPost;

// Add event listner if form exist
if (form) {
  // Execute onCreatePost on submit
  form.addEventListener("submit", onCreatePost); 
} else {
  console.error('Form not found');
}

