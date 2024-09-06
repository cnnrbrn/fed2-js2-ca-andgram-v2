import { authGuard } from "../../utilities/authGuard.js";
import { updateNav } from "../../ui/global/nav.js";

// check if user is athenticated
authGuard();

// Update nav links
updateNav();


