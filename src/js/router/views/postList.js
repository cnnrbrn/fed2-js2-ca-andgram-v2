
import { getAuthorizationHeaders } from '../../api/headers.js'; // Importer funksjon for å hente autorisasjonsoverskrifter

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
                postContainer.innerHTML = posts.map(post => `
                    <div class="post">
                        <h2>${post.title}</h2>
                        <p>${post.body || ''}</p>
                    </div>
                `).join('');
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
