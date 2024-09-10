
import { getAuthorizationHeaders } from '../../api/headers.js';

// Funksjon for å vise brukerens innlegg
export async function displayUserPosts() {
    console.log("displayUserPosts function called.");

    try {
        const response = await fetch('https://v2.api.noroff.dev/social/profiles/andgram/posts', {
            method: 'GET',
            headers: getAuthorizationHeaders(),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        console.log('Data received:', data);

        const posts = data.data; // Sørg for at data.data er en array av innlegg
        console.log('Posts:', posts);

        if (!Array.isArray(posts)) {
            throw new Error('Posts data is not an array');
        }

        const postContainer = document.getElementById('posts-container');
        if (postContainer) {
            if (posts.length > 0) {
                // Generate HTML for each post
                postContainer.innerHTML = posts.map(post => `
                    <a href="/post/${post.id}" class="post-link">
                        <div class="post">
                            <img src="${post.media.url}">
                            <h2>${post.title}</h2>
                        </div>
                    </a>
                `).join('');

                // Add click event for each post link
                const postLinks = document.querySelectorAll('.post-link');
                postLinks.forEach(link => {
                    link.addEventListener('click', (event) => {
                        event.preventDefault();  // Prevent default link behavior
                        const postId = link.getAttribute('href').split('/').pop();  // Get the post ID from the URL
                        if (postId) {
                            // Navigate to the page with post details
                            window.location.href = `/post/?id=${postId}`;
                        }
                    });
                });
            } else {
                postContainer.innerHTML = "<p>No posts available.</p>";
            }

        } else {
            console.error('Post container not found');
        }
    } catch (error) {
        console.error('Error displaying posts:', error);
    }
}
