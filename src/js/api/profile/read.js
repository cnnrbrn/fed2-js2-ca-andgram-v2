import { getAuthorizationHeaders } from "../../api/headers";
import { API_SOCIAL_PROFILES } from "../../api/constants";

// functions for home page

// Function for getting and reading a profile by username 
export async function readProfile(query) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/social/profiles/search?q=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: getAuthorizationHeaders()
        });

        if (!response.ok) {
            console.error('Failed to fetch user:', await response.text());
            return null; // Return null if fetching fails
        }

        const responseData = await response.json();
        console.log('Response data received:', responseData);

        // Access user data
        const userData = responseData.data;  // Assuming profile is returned in a data field
        console.log('User data:', userData);

        return userData; // Return the user data

    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null; // Return null in case of error
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
        profileElement.classList.add('profile'); // Add a class for styling if needed

        // Create elements for profile name, bio, etc.
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


// functions for profile page
export async function loadProfileHeader() {
    try {
        const params = new URLSearchParams(window.location.search);
        const username = params.get('name');

        if (!username) {
            console.log('No username specified in the URL.');
            return null; // Return null if no username
        }

        const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
            method: 'GET',
            headers: getAuthorizationHeaders(),
        });

        if (!response.ok) {
            console.error('Failed to load profile header:', await response.text());
            return null; // Return null on error
        }

        const profileData = await response.json();
        console.log('Profile data fetched successfully:', profileData); // Ensure this logs the correct data

        // Adjust return statement based on your API response structure
        return profileData.data || null; // Return the user object directly if it's not an array

    } catch (error) {
        console.error('Error fetching profile header:', error);
        return null; // Return null on error
    }
}


// Function to display profile banner and avatar
export function displayProfileHeader(userData) {
    const bannerUrl = userData.banner.url;  // Access the banner URL
    const profilePicUrl = userData.avatar.url;  // Access the avatar (profile picture) URL
    const userName = userData.name;
    const bannerElement = document.getElementById('banner-image');
    const profilePicElement = document.getElementById('profile-image');
    const profileName = document.getElementById('profile-name');
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
}

export async function loadUserProfile() {
    // Get username from url
    const params = new URLSearchParams(window.location.search);
    const profileUsername = params.get('name');

    // Get username from localStorage
    const loggedInUsername = localStorage.getItem('username');

    // If on logged in users profile, show additional options
    if (profileUsername === loggedInUsername) {
        showExtraUserOptions();

    } else {
        console.error('Username not in URL');
        alert('Something went wrong, please try agian');
    }
}

// Funksjon for å vise ekstra brukeropplysninger eller handlinger
function showExtraUserOptions() {
    // Opprett ekstra innhold som kun vises for den innloggede brukeren
    const extraOptionsDiv = document.createElement('div');
    extraOptionsDiv.id = 'extra-user-options';
    extraOptionsDiv.innerHTML = `
        <a id="createPostLink" class="button" href="/post/create/index.html">Create post</a>
        <button id="edit-profile-btn">Rediger Profil</button>
        <button id="logout-btn">Logg ut</button>
    `;

    // Legg til ekstra alternativer i profildelen
    const profileContainer = document.getElementById('profile-container');
    profileContainer.appendChild(extraOptionsDiv);

    // Legg til funksjonalitet for knapper
    document.getElementById('edit-profile-btn').addEventListener('click', () => {
        window.location.href = `/profile/edit/?name=${loggedInUsername}`;
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.clear();
        window.location.href = '/auth/';
    });
}





