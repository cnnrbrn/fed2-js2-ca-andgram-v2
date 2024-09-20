import { onRegister } from "../../ui/auth/register";
import { checkAllStatuses } from "../../ui/global/successPopup";

// Show popup
window.onload = checkAllStatuses();

const form = document.forms.register;

form.addEventListener("submit", onRegister);
