import { getAuthorizationHeaders } from "../../api/headers";
import { API_SOCIAL_PROFILES } from "../../api/constants";
import { showError, logError } from '../../ui/global/errorMessage'; // Import error handling functions

// Function for getting and reading a profile by username 
export async function readProfile(query) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/social/profiles/search?q=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: getAuthorizationHeaders()
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to fetch user:', errorText);
            showError('Failed to fetch user. Please try again later.');
            return null; 
        }

        const responseData = await response.json();
        console.log('Response data received:', responseData);

        // Access user data
        const userData = responseData.data; 
        console.log('User data:', userData);

        return userData;

    } catch (error) {
        console.error('Error fetching user profile:', error);
        showError('An unexpected error occurred while fetching the user profile.');
        return null;
    }
}

// Function to display search results in the "results" div
export function displaySearchResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    // Ensure that 'data' is an array
    const profiles = Array.isArray(data) ? data : data.data;

    // Check if profiles exist
    if (!profiles || profiles.length === 0) {
        resultsDiv.innerHTML = 'No profiles found.';
        return;
    }

    // Loop through profiles and display each one
    profiles.forEach(profile => {
        const profileElement = document.createElement('div');
        profileElement.classList.add('profile'); // Add a class for styling

        // Create elements for profile name, bio, and link to full post
        const nameElement = document.createElement('h3');
        nameElement.textContent = `${profile.name}`;

        const bioElement = document.createElement('p');
        bioElement.textContent = `${profile.bio}`;

        // Create a link to the profile page (you'll pass the profile name to build the URL)
        const profileLink = document.createElement('a');
        profileLink.href = `/profile/index.html?name=${profile.name}`;
        profileLink.textContent = 'View Profile';

        // Append the elements to the profileElement
        profileElement.appendChild(nameElement);
        profileElement.appendChild(bioElement);
        profileElement.appendChild(profileLink);

        // Append the profileElement to the results div
        resultsDiv.appendChild(profileElement);
    });
}

// Functions for profile page
export async function loadProfileHeader() {
    try {
        const params = new URLSearchParams(window.location.search);
        const username = params.get('name');

        if (!username) {
            console.log('No username specified in the URL.');
            showError('No username specified in the URL.'); 
            return null;
        }

        const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
            method: 'GET',
            headers: getAuthorizationHeaders(),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to load profile header:', errorText);
            showError('Failed to load profile header. Please try again later.');
            return null; 
        }

        const profileData = await response.json();
        console.log('Profile data fetched successfully:', profileData);

        return profileData.data || null; 

    } catch (error) {
        console.error('Error fetching profile header:', error);
        showError('An unexpected error occurred while fetching the profile header.');
        return null; //
    }
}

// Function to display profile banner and avatar
export function displayProfileHeader(userData) {
    const bannerUrl = userData.banner.url;  // Access the banner URL
    const profilePicUrl = userData.avatar.url;  // Access the avatar (profile picture) URL
    const userName = userData.name;
    const bio = userData.bio;
    const bannerElement = document.getElementById('banner-image');
    const profilePicElement = document.getElementById('profile-image');
    const profileName = document.getElementById('profile-name');
    const bioElement = document.getElementById('profile-bio');

    // Set profile name
    profileName.textContent = userName;

    // Set bio
    bioElement.textContent = bio;

    // Set banner image if available
    if (bannerUrl) {
        bannerElement.src = bannerUrl;
        bannerElement.alt = userData.banner.alt || `${userData.name}'s banner`;  // Use alt text if available
    } else {
        // Fallback if no banner
        bannerElement.style.display = 'none';
    }

    // Set profile picture if available
    if (profilePicUrl) {
        profilePicElement.src = profilePicUrl;
        profilePicElement.alt = userData.avatar.alt || `${userData.name}'s profile picture`;  // Use alt text if available
    } else {
        // Fallback if no profile picture
        profilePicElement.style.display = 'none';
    }
}

export async function loadUserProfile() {
    // Get username from URL
    const params = new URLSearchParams(window.location.search);
    const profileUsername = params.get('name');

    // Get username from localStorage
    const loggedInUsername = localStorage.getItem('username');

    // If on logged-in user's profile, show additional options
    if (profileUsername === loggedInUsername) {
        showExtraUserOptions();
    } else {
        console.error('Username not in URL');
        showError('Something went wrong, please try again.');
    }
}

// Function for showing extra user options
function showExtraUserOptions() {
    // Create extra content that is only displayed for the logged-in user
    const extraOptionsDiv = document.createElement('div');
    extraOptionsDiv.id = 'extra-user-options';
    extraOptionsDiv.innerHTML = `
        <a id="createPostLink" class="button" href="/post/create/index.html">Create post</a>
        <button id="edit-profile-btn">Edit Profile</button>
        <button id="logout-btn" class="logout-button">Log Out</button>
    `;

    // Append extra options to the profile section
    const profileContainer = document.getElementById('profile-container');
    profileContainer.appendChild(extraOptionsDiv);

    // Add functionality for buttons
    document.getElementById('edit-profile-btn').addEventListener('click', () => {
        window.location.href = `/profile/edit/?name=${loggedInUsername}`;
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.clear();
        window.location.href = '/auth/';
    });
}
