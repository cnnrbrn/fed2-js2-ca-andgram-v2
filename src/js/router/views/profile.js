import { readPostsbyProfile } from "../../api/post/read";
import { readProfile } from "../../api/profile/read";
import { renderProfileHeader } from "../../components/profle/renderProfileHeader";
import { renderProfilePosts } from "../../components/profle/renderProfilePosts";
import { onUpdateProfile } from "../../ui/profile/update"; 
import { authGuard } from "../../utilities/authGuard";
import { loadName } from "../../utilities/storage";

authGuard();

async function loadAndDisplayProfile() {
    const username = loadName();
    if (!username) {
        console.error("Username not found");
        return;
    }
    try {
        const userData = await readProfile(username);
        if (!userData) throw new Error("Failed to load user data");

        renderProfileHeader(userData);
        const container = document.getElementById('posts-container');
        const posts = await readPostsbyProfile(username);
        renderProfilePosts(container, posts);
    } catch (error) {
        console.error(error.message);
    }
}

loadAndDisplayProfile();

function openProfileEditModal() {
    document.getElementById('profile-edit-modal').style.display = 'block';
}

export function closeEditModal() {
    document.getElementById('profile-edit-modal').style.display = 'none';
}

const editProfileButton = document.getElementById('edit-profile-button');
editProfileButton?.addEventListener('click', function (event) {
    event.preventDefault();
    openProfileEditModal();
});

const cancelEditButton = document.getElementById('cancel-edit');
cancelEditButton?.addEventListener('click', function () {
    closeEditModal();
});

document.getElementById('profile-edit-form')?.addEventListener('submit', onUpdateProfile);
