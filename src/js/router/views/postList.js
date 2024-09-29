import { getAuthorizationHeaders } from "../../api/headers";
import { showError } from "../../ui/global/errorMessage";
import { API_SOCIAL_PROFILES } from "../../api/constants";

// Get the profile name from the URL
const urlParams = new URLSearchParams(window.location.search);
const profileName = urlParams.get('name'); // Extract the 'name' from the URL

let displayedPostsCount = 12; // number of posts to display
let allPosts = []; // To store all posts for loading later

// Function to fetch and display profile posts based on the name
async function fetchProfilePosts(profileName) {
    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${encodeURIComponent(profileName)}/posts`, {
            method: 'GET',
            headers: getAuthorizationHeaders()
        });

        if (!response.ok) {
            console.error('Failed to fetch profile posts:', await response.text());
            showError('Failed to load profile posts. Please try again later.');
            return;
        }

        const postsData = await response.json();
    
        // Display posts with displayPosts function
        displayPosts(postsData);

    } catch (error) {
        console.error('Error fetching profile posts:', error);
        showError('An error occurred while fetching posts.');
    }
}

function displayPosts(postsData) {
    const posts = Array.isArray(postsData.data) ? postsData.data : [];

    const postsContainer = document.getElementById('posts-container');

    // Show message if user has no posts
    if (posts.length === 0) {
        const noPostMessage = document.createElement('p');
        noPostMessage.classList.add('no-post-message');
        noPostMessage.textContent = 'This user has no posts.'
        const messageContainer = document.createElement('div');
        messageContainer.appendChild(noPostMessage);
        messageContainer.classList.add('no-post-msg-container');
        postsContainer.appendChild(messageContainer);
        return;
    }

    // Store all posts in a global variable
    allPosts = posts;
    // Clear the existing content in the posts container
    postsContainer.innerHTML = ''; 

    // Create a document fragment to efficiently append multiple elements
    const fragment = document.createDocumentFragment();

    // Get the posts to display based on the current displayed post count
    const postsToShow = allPosts.slice(0, displayedPostsCount);

    // Loop through each post to create the necessary HTML elements
    postsToShow.forEach(post => {
        const postId = post.id;
        const imageUrl = post.media?.url;
        const altText = post.media?.alt || 'Post image';

         // If the post has an image URL, create and append the HTML elements
        if (imageUrl) {
            // Create a clickable link for the post
            const linkElement = document.createElement('a');
            linkElement.href = `/post/index.html?id=${postId}`;

              // Create an img element for the post's image
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = altText;

             // Create a container for the image and append the image element
            const imgPostContainer = document.createElement('div');
            imgPostContainer.classList.add('img-post-container');
            imgPostContainer.appendChild(imgElement);

            // Append the image container to the link element
            linkElement.appendChild(imgPostContainer);

            // Append the link element to the fragment
            fragment.appendChild(linkElement);
        }
    });

    // Append the document fragment to the posts container
    postsContainer.appendChild(fragment);

    // Check if there are more posts to display, if so, show the 'Load More' button
    if (allPosts.length > displayedPostsCount) {
        showLoadMoreButton();
    }
}
// Display the 'Load More' button and attach click event listener
function showLoadMoreButton() {
    const loadMoreButton = document.getElementById('load-more-button');
    if (loadMoreButton) {
        loadMoreButton.style.display = 'block'; 
        loadMoreButton.onclick = loadMorePosts;
    }
}

// Load posts when 'Load More' button is clicked
function loadMorePosts() {
    const postsContainer = document.getElementById('posts-container');

    // Get the remaining posts that haven't been displayed yet
    const postsToShow = allPosts.slice(displayedPostsCount);
    const fragment = document.createDocumentFragment();

     // Loop through and create the necessary HTML elements for each additional post
    postsToShow.forEach(post => {
        const postId = post.id;
        const imageUrl = post.media?.url;
        const altText = post.media?.alt || 'Post image';

        // If the post has an image URL, create and append the HTML elements
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

    // Append the additional posts to the posts container
    postsContainer.appendChild(fragment);

    // Update the displayed posts count to reflect that all posts are shown
    displayedPostsCount = allPosts.length;

    // Hide 'Load More' button when all posts are loaded
    const loadMoreButton = document.getElementById('load-more-button');
    if (loadMoreButton) {
        loadMoreButton.style.display = 'none';
    }
}

// Call the function to fetch posts for the given profile name
if (profileName) {
    fetchProfilePosts(profileName);
}
