import { authGuard } from "../../utilities/authGuard";
import { checkAllStatuses } from "../../ui/global/successPopup";

// Show popup
window.onload = checkAllStatuses();

authGuard();

export function initProfilePage() {
    console.log('Initializing profile page');

    // Initialiser profilspesifikke detaljer her (hvis aktuelt)
}

// Kall initProfilePage når profil-siden lastes
document.addEventListener('DOMContentLoaded', initProfilePage);
