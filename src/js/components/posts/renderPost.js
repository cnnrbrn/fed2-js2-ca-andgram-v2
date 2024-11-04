import { renderAdminButtons } from "./renderAdminButtons";

export function renderPost(container, post) {

    container.innerHTML = "";

    const { title, body } = post;

    const adminButtons = renderAdminButtons(post);
        if(adminButtons) {
            container.appendChild(adminButtons);
        }  

    const heading = document.createElement("h1");
    heading.innerText = title
    heading.className = "text-4xl font-bold text-gray-800 mb-4"; // Tailwind styling
    container.appendChild(heading);

    const bodyElement = document.createElement("p");
    bodyElement.innerText = body;   
    bodyElement.className = "text-gray-700 mb-6"; // Tailwind styling
    container.appendChild(bodyElement);

}