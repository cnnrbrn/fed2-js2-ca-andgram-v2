import { clearLocalStorage } from '../../utilities/clearLocalStorage';

export function handleAuthLogout() {
    clearLocalStorage();
    localStorage.setItem('logoutSuccess', 'true'); 

    // Redirect to the login page
    window.location.href = '/auth/';
}
