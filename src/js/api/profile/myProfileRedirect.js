export function redirectToProfile() {
    // Get username from localStorage
    const username = localStorage.getItem('username');

    // If username exist, redirect to profile page with username in URL
    if (username) {
        window.location.href = `/profile/index.html?name=${username}`;
    } else {
        console.error('Username not found in localStorage. Please login.');
    }
}
