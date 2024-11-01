import { headers } from "../../api/headers";
import { API_SOCIAL_PROFILES } from "../../api/constants";

export async function readProfile(username) {
    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
            method: 'GET',
            headers: headers()
        });

        if (!response.ok) {
            console.error("Failed to fetch profile data", response.statusText);
            return null;
        }

        const responseData = await response.json();
        const userData = responseData.data;
        return userData;
    } catch (error) {
        console.error("Error fetching profile data:", error);
        return null;
    }
}
