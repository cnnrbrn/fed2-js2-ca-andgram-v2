import { isAuthenticated } from "../../utilities/storage";
import { onLogout } from "../../ui/auth/logout"

export function displayMenu() {

const nav = document.querySelector('#top-nav');

if(nav) {

    const loggedin = isAuthenticated();

    console.log(loggedin);

    if(loggedin) {
        nav.innerHTML = `<a href="/">Home</a>
                         <a href="/profile/">My profile</a>
                         <a href="/post/create/">Create Post</a>
                         <button id="logout-button">Logout</button>`;

        if (window.location.pathname.includes("/profile")) {
            const editProfileButton = document.createElement('a');
            editProfileButton.href = "#";
            editProfileButton.textContent = "Edit Profile";
            editProfileButton.id = "edit-profile-button";
            nav.appendChild(editProfileButton);
        }

    }
    else {
        nav.innerHTML = `<a href="/">Home</a>
                         <a href="/auth/login/">Login</a>
                         <a href="/auth/register/">Register</a>`;
    }
}

}