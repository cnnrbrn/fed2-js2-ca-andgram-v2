
export function redirectToProfile() {
    // Hent brukernavn fra localStorage
    const username = localStorage.getItem('username');

    // Hvis brukernavnet finnes, omdiriger til profilsiden med brukernavnet i URL'en
    if (username) {
        window.location.href = `/profile/index.html?name=${username}`;
    } else {
        console.error('Brukernavn ikke funnet i localStorage. Vennligst logg inn.');
        alert('Brukernavn ikke funnet. Du må være innlogget for å se profilen din.');
    }
}
