import { readPostsByUser } from "../../api/post/read";

export async function loadPosts() {
    const username = 'andgram'; // Replace with dynamic username if needed
    const limit = 12; // Number of posts to display per page
    const page = 1; // Current page number
    const tag = ''; // Optional tag to filter posts

    try {
        const postsData = await readPostsByUser(username, limit, page, tag);
        updateHomePageWithPosts(postsData);
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

function updateHomePageWithPosts(postsData) {
    const postContainer = document.getElementById('posts-container');
    if (postContainer) {
        if (postsData.data.length > 0) {
            postContainer.innerHTML = postsData.data.map(post => {
                const mediaUrl = post.media && post.media.url ? post.media.url : 'default-image-url.jpg'; // Provide a default image if needed
                const mediaAlt = post.media && post.media.alt ? post.media.alt : 'Post image'; // Provide a default alt text if needed
                
                return `
                    <a href="/post/?id=${post.id}" class="post-link">
                        <div class="post">
                            <img src="${mediaUrl}" alt="${mediaAlt}">
                        </div>
                    </a>
                `;
            }).join('');
        } else {
            postContainer.innerHTML = "<p>No posts available.</p>";
        }
    } else {
        console.error('Post container not found');
    }
}

loadPosts();
