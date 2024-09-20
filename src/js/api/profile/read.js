import { getAuthorizationHeaders } from "../../api/headers";

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

        // Parse the response as JSON
        const responseData = await response.json();
        console.log('Response data received:', responseData);

        // Pass the entire responseData to displaySearchResults
        displaySearchResults(responseData);

        // Return the user data if needed
        return responseData.data; // Optional, depending on your needs

    } catch (error) {
        console.error('Error fetching profile:', error);
        return null; // Return null in case of error
    }
}

export function displaySearchResults(responseData) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    // Log the received responseData for debugging
    console.log('Response data for display:', responseData);

    // Access the user data array from the response
    const data = responseData.data;

    // Check if data is defined and is an array with items
    if (!data || !Array.isArray(data) || data.length === 0) {
        resultsDiv.innerHTML = 'No profiles found.';
        return;
    }

    // Loop through the profiles and display them
    data.forEach(profile => {
        const profileElement = document.createElement('div');
        profileElement.classList.add('profile'); // Add a class for styling
        profileElement.textContent = `Name: ${profile.name}, Bio: ${profile.bio}`;
        resultsDiv.appendChild(profileElement);
    });
}

