export function displayMessage(
    container, 
    messageType = "error", 
    message = "Something went wrong") {
    
    let parent = container;

    if (typeof container === "string") {
        parent = document.querySelector(container);
    }

    const messageDiv = `
    <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                ${messageType === "success" ? 'bg-green-500' : 'bg-red-500'} 
                text-white p-4 rounded-md shadow-md text-center transition-opacity duration-500 opacity-100" 
                role="alert">
        <p>${message}</p>
    </div>
    `;

    parent.innerHTML = '';

    parent.innerHTML = messageDiv;

    const msgElement = parent.querySelector('div');

    setTimeout(() => {
        msgElement.style.opacity = '0';
        setTimeout(() => {
            parent.innerHTML = '';
        }, 500); 
    }, 3000); 
}
