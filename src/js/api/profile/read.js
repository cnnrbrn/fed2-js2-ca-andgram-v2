import { getAuthorizationHeaders } from "../../api/headers";
import { API_SOCIAL_PROFILES } from "../../api/constants";
import { showError } from '../../ui/global/errorMessage';
import { handleAuthLogout } from "../auth/logout";

// Function for fetching profile data by username 
export async function readProfile(query) {
    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/search?q=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: getAuthorizationHeaders()
        });

        if (!response.ok) {
            const errorText = await response.text();
            showError('Failed to fetch user. Please try again later.');
            return null; 
        }

        const responseData = await response.json();
        // Access user data
        const userData = responseData.data; 
        return userData;

    } catch (error) {
        console.error('Error fetching user profile:', error);
        showError('An unexpected error occurred while fetching the user profile.');
        return null;
    }
}

// Function to display search results profile data in the "results" div
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
        // Create a wrapper for the profile
        const profileElement = document.createElement('div');
        profileElement.classList.add('profile');
    
        // Create elements for profile name and bio
        const nameElement = document.createElement('h3');
        nameElement.textContent = `${profile.name}`;
    
        const bioElement = document.createElement('p');
        if (profile.bio) {
            bioElement.textContent = `${profile.bio}`;
        }
    
        // Create a link to the profile page
        const profileLink = document.createElement('a');
        profileLink.href = `/profile/index.html?name=${profile.name}`;
        profileLink.classList.add('profile-link'); // Optional: Add class for styling
    
        // Append name and bio to the profileElement
        profileElement.appendChild(nameElement);
        profileElement.appendChild(bioElement);
    
        // Wrap the entire profileElement with the profileLink
        profileLink.appendChild(profileElement);
    
        // Append the profileLink to the results div
        resultsDiv.appendChild(profileLink);
    });
}

// Function for loading profile header content
export async function loadProfileHeader() {
    try {
        // Get username from URL
        const params = new URLSearchParams(window.location.search);
        const username = params.get('name');

        if (!username) {
            showError('No username specified in the URL.'); 
            return null;
        }

        // Send GET request to fetch data from user
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
        return profileData.data || null; 

    } catch (error) {
        console.error('Error fetching profile header:', error);
        showError('An unexpected error occurred while fetching the profile header.');
        return null; 
    }
}

// Function to display profile data (banner, avatar and bio) in profile header
export function displayProfileHeader(userData) {
    // Define elements from fetched data
    const bannerUrl = userData.banner.url;
    const profilePicUrl = userData.avatar.url;
    const userName = userData.name;
    const bio = userData.bio;
    // Get placerholders from document
    const bannerElement = document.getElementById('banner-image');
    const profilePicElement = document.getElementById('profile-image');
    const profileName = document.getElementById('profile-name');
    const bioElement = document.getElementById('profile-bio');

    // Set profile name
    profileName.textContent = userName;
  
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

    // Set bio if avalible 
    if (bioElement) {
        bioElement.textContent = bio;
    } else {
        // Fallback if no bio
        bioElement.style.display = 'none';
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
    } 
    
}

// Show additional profile options for the logged-in user
function showExtraUserOptions() {
    // Create the additional options
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

    // Add logout event to the logout button
    document.getElementById('logout-btn').addEventListener('click', () => {
        handleAuthLogout();
    });
}
