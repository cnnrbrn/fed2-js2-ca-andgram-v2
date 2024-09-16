import { clearLocalStorage } from '../common/logoutUtils.js';

export function handleGlobalLogout() {
    clearLocalStorage();
    
    window.location.href = '/';
}

document.getElementById('logout-button').addEventListener('click', handleGlobalLogout);



