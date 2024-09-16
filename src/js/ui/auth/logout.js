import { clearLocalStorage } from '../../utilities/clearLocalStorage';

export function handleAuthLogout() {
    clearLocalStorage();

    // Redirect to the login page
    window.location.href = '/auth/';
}
