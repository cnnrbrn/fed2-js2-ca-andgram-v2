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
    div.classList.add("admin-buttons");

    const editButton = document.createElement("a");
    editButton.innerText = "Edit";
    editButton.href = `/post/edit/?id=${id}`;

    const deleteButton = document.createElement("button"); 
    deleteButton.innerText = "Delete";
    deleteButton.dataset.id = id;
    deleteButton.addEventListener("click", onDeletePost);
    
    div.appendChild(editButton);
    div.appendChild(deleteButton);

    return div;
}