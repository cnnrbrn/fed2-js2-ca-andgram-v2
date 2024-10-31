export function displayMessage(
    container, 
    messageType = "error", 
    message = "Something went wrong") {
    
    let parent = container;

    if(typeof container === "string") {
        parent = document.querySelector(container);
    }

    parent.innerHTML = `
    <div class="message ${messageType}">
         <p>${message}</p>
    </div>
    `
    
}