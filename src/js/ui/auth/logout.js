import { clearLocalStorage } from '../common/logoutUtils.js';

export function handleAuthLogout() {
    clearLocalStorage();

    // Redirect to the login page
    window.location.href = '/login';
}

document.getElementById('logout-button').addEventListener('click', handleAuthLogout);
