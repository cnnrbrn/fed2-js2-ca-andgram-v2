import { onDeletePost } from "../../ui/post/delete";
import { loadName } from "../../utilities/storage";

export function renderAdminButtons(post) {
    const username = loadName();

    const { author, id } = post;

    const authorName = author.name;

    if (authorName !== username) {
        return null;
    } 

    const div = document.createElement("div");
    div.classList.add("admin-buttons", "flex", "space-x-4", "mt-4");

    const editButton = document.createElement("a");
    editButton.innerText = "Edit";
    editButton.href = `/post/edit/?id=${id}`;
    editButton.className = "text-blue-600 hover:text-blue-800 font-semibold transition duration-200"; // Tailwind styling

    const deleteButton = document.createElement("button"); 
    deleteButton.innerText = "Delete";
    deleteButton.dataset.id = id;
    deleteButton.addEventListener("click", onDeletePost);
    deleteButton.className = "text-red-600 hover:text-red-800 font-semibold transition duration-200"; // Tailwind styling
    
    div.appendChild(editButton);
    div.appendChild(deleteButton);

    return div;
}