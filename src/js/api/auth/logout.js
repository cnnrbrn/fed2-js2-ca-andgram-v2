import { clearLocalStorage } from '../../utilities/clearLocalStorage';
import { showError } from '../../ui/global/errorMessage';

export function handleAuthLogout() {
    try {
        // Clear local storage
        clearLocalStorage();
        localStorage.setItem('logoutSuccess', 'true'); 

        // Redirect to the login page
        window.location.href = '/auth/';
    } catch (error) {
        // Handle any unexpected errors during logout
        showError('An error occurred while logging out. Please try again.'); // Show user-friendly error message
    }
}
