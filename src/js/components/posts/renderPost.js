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
    container.appendChild(heading);

    const bodyElement = document.createElement("p");
    bodyElement.innerText = body;
    container.appendChild(bodyElement);

}