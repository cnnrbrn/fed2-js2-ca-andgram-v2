import { onLogin } from "../../ui/auth/login.js";
import { checkAllStatuses } from "../../ui/global/successPopup.js";

const form = document.forms.login;

if (form) {
  form.addEventListener("submit", onLogin);
}

// Show popup
window.onload = checkAllStatuses();

