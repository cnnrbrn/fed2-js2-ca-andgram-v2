import { authGuard } from "../../utilities/authGuard.js";
import { updateNav } from "../../ui/global/nav.js";
import { checkAllStatuses } from "../../ui/global/successPopup.js";


// check if user is athenticated
authGuard();

// Update nav links
updateNav();

// Show popup
window.onload = checkAllStatuses();