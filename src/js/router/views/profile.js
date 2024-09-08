import { authGuard } from "../../utilities/authGuard";
import { displayUserPosts } from './postList.js';

authGuard();

export function initProfilePage() {
    console.log('Initializing profile page');

    // Initialiser profilspesifikke detaljer her (hvis aktuelt)

    // Vis brukerens innlegg
    displayUserPosts();
}

// Kall initProfilePage når profil-siden lastes
document.addEventListener('DOMContentLoaded', initProfilePage);
