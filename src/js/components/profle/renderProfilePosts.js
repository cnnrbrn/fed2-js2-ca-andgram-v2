export function renderProfilePosts(container, posts) {
    // Access the posts data array correctly
    const postData = posts.data; // This should be an array of post objects

    // Ensure postData is an array
    if (!Array.isArray(postData)) {
        console.error("Expected posts.data to be an array, but got:", postData);
        container.innerHTML = `<div class="message">Invalid posts data</div>`;
        return;
    }

    if (postData.length === 0) {
        container.innerHTML = `<div class="message">No posts yet</div>`;
        return;
    }

    container.innerHTML = "";

    // Generate HTML for each post
    const postHtml = postData.map((post) => createPostHtml(post));

    // Append HTML or set innerHTML based on what createPostHtml returns
    if (typeof postHtml[0] === 'string') {
        container.innerHTML = postHtml.join("");
    } else {
        container.append(...postHtml);
    }
}

    function createPostHtml(post) {

        const { id, title } = post;

        const item = document.createElement("a");
        item.classList.add("post");
        item.href = `/post/?id=${id}`;

        const titleElement = document.createElement("h3");
        titleElement.innerText = title;

        item.appendChild(titleElement);

        return item;
    }