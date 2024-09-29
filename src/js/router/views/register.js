import { onRegister } from "../../ui/auth/register";
import { checkAllStatuses } from "../../ui/global/successPopup";

// Check for flags in localStorage
checkAllStatuses();

// Get register form
const form = document.forms.register;

// Execute onRegister on submit
form.addEventListener("submit", onRegister);
