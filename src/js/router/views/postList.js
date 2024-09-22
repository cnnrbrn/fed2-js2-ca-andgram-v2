import { getAuthorizationHeaders } from "../../api/headers";
// Get the profile name from the URL
const urlParams = new URLSearchParams(window.location.search);
const profileName = urlParams.get('name'); // Extract the 'name' from the URL

// Function to fetch and display profile posts based on the name
async function fetchProfilePosts(profileName) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/social/profiles/${encodeURIComponent(profileName)}/posts`, {
            method: 'GET',
            headers: getAuthorizationHeaders()
        });

        if (!response.ok) {
            console.error('Failed to fetch profile posts:', await response.text());
            return;
        }

        const postsData = await response.json();
        console.log('Profile posts:', postsData);

        // Display posts
        displayPosts(postsData);

    } catch (error) {
        console.error('Error fetching profile posts:', error);
    }
}


let displayedPostsCount = 12; // number of posts to display
let allPosts = []; // To store all posts for potential loading later

export function displayPosts(postsData) {
    // Log postsData to ensure correct structure
    console.log('Posts data:', postsData);

    // Extract posts array from postsData object
    const posts = Array.isArray(postsData.data) ? postsData.data : [];

    // Check if posts array is empty
    if (posts.length === 0) {
        console.log('No posts available for this profile.');
        return;
    }

    // Store the posts globally for pagination/load-more functionality
    allPosts = posts;

    // Clear the container where posts are displayed
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // Clear any existing posts

    // Display up to the initial displayedPostsCount number of posts (12 latest posts)
    const postsToShow = allPosts.slice(0, displayedPostsCount);
    postsToShow.forEach(post => {
        const imageUrl = post.media?.url; // Safely access media URL
        const altText = post.media?.alt || 'Post image'; // Default alt text

        if (imageUrl) {
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = altText;
            imgElement.className = 'post-image'; // Add CSS class for styling

            postsContainer.appendChild(imgElement);
        }
    });

    if (allPosts.length > displayedPostsCount) {
        showLoadMoreButton();
    }
}

function showLoadMoreButton() {
    const loadMoreButton = document.getElementById('load-more-button');
    loadMoreButton.style.display = 'block'; // Make the button visible

    loadMoreButton.onclick = loadMorePosts; // Assign the click handler
}

function loadMorePosts() {
    displayedPostsCount = allPosts.length; // Load all remaining posts
    const postsContainer = document.getElementById('posts-container');

    // Clear existing posts and display all
    postsContainer.innerHTML = ''; 
    allPosts.forEach(post => {
        const imageUrl = post.media?.url;
        const altText = post.media?.alt || 'Post image';

        if (imageUrl) {
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = altText;
            imgElement.className = 'post-image';

            postsContainer.appendChild(imgElement);
        }
    });

    // Hide the load more button after all posts are loaded
    const loadMoreButton = document.getElementById('load-more-button');
    loadMoreButton.style.display = 'none';
}

// Call the function to fetch posts for the given profile name
if (profileName) {
    fetchProfilePosts(profileName);
}
