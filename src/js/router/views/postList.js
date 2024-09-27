import { getAuthorizationHeaders } from "../../api/headers";
import { showError } from "../../ui/global/errorMessage";

// Get the profile name from the URL
const urlParams = new URLSearchParams(window.location.search);
const profileName = urlParams.get('name'); // Extract the 'name' from the URL

let displayedPostsCount = 12; // number of posts to display
let allPosts = []; // To store all posts for potential loading later

// Function to fetch and display profile posts based on the name
async function fetchProfilePosts(profileName) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/social/profiles/${encodeURIComponent(profileName)}/posts`, {
            method: 'GET',
            headers: getAuthorizationHeaders()
        });

        if (!response.ok) {
            console.error('Failed to fetch profile posts:', await response.text());
            showError('Failed to load profile posts. Please try again later.');
            return;
        }

        const postsData = await response.json();
        console.log('Profile posts:', postsData);

        // Display posts
        displayPosts(postsData);

    } catch (error) {
        console.error('Error fetching profile posts:', error);
        showError('An error occurred while fetching posts.');
    }
}

export function displayPosts(postsData) {
    console.log('Posts data:', postsData);
    const posts = Array.isArray(postsData.data) ? postsData.data : [];

    const postsContainer = document.getElementById('posts-container');

    if (posts.length === 0) {
        console.log('No posts available for this profile.');
        const noPostMessage = document.createElement('p');
        noPostMessage.classList.add('no-post-message');
        noPostMessage.textContent = 'This user has no posts.'
        const messageContainer = document.createElement('div');
        messageContainer.appendChild(noPostMessage);
        messageContainer.classList.add('no-post-msg-container');
        postsContainer.appendChild(messageContainer);
        return;
    }

    allPosts = posts;

    postsContainer.innerHTML = ''; 

    const fragment = document.createDocumentFragment();
    const postsToShow = allPosts.slice(0, displayedPostsCount);

    postsToShow.forEach(post => {
        const postId = post.id;
        const imageUrl = post.media?.url;
        const altText = post.media?.alt || 'Post image';

        if (imageUrl) {
            const linkElement = document.createElement('a');
            linkElement.href = `/post/index.html?id=${postId}`;

            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = altText;

            const imgPostContainer = document.createElement('div');
            imgPostContainer.classList.add('img-post-container');
            imgPostContainer.appendChild(imgElement);

            linkElement.appendChild(imgPostContainer);
            fragment.appendChild(linkElement);
        }
    });

    postsContainer.appendChild(fragment);

    if (allPosts.length > displayedPostsCount) {
        showLoadMoreButton();
    }
}

function showLoadMoreButton() {
    const loadMoreButton = document.getElementById('load-more-button');
    if (loadMoreButton) {
        loadMoreButton.style.display = 'block'; 
        loadMoreButton.onclick = loadMorePosts;
    }
}

function loadMorePosts() {
    const postsContainer = document.getElementById('posts-container');
    const postsToShow = allPosts.slice(displayedPostsCount);
    const fragment = document.createDocumentFragment();

    postsToShow.forEach(post => {
        const postId = post.id;
        const imageUrl = post.media?.url;
        const altText = post.media?.alt || 'Post image';

        if (imageUrl) {
            const linkElement = document.createElement('a');
            linkElement.href = `/post/index.html?id=${postId}`;

            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = altText;

            const imgPostContainer = document.createElement('div');
            imgPostContainer.classList.add('img-post-container');
            imgPostContainer.appendChild(imgElement);

            linkElement.appendChild(imgPostContainer);
            fragment.appendChild(linkElement);
        }
    });

    postsContainer.appendChild(fragment);
    displayedPostsCount = allPosts.length;
    const loadMoreButton = document.getElementById('load-more-button');
    if (loadMoreButton) {
        loadMoreButton.style.display = 'none';
    }
}

// Call the function to fetch posts for the given profile name
if (profileName) {
    fetchProfilePosts(profileName);
}
