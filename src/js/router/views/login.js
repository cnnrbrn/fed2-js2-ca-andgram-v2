import { onLogin } from "../../ui/auth/login.js";
import { checkAllStatuses } from "../../ui/global/successPopup.js";

// Get form
const form = document.forms.login;

// Add event listener if form exist
if (form) {
  // Run onLogin function on submit
  form.addEventListener("submit", onLogin); 
}
// Show popup
window.onload = checkAllStatuses();

