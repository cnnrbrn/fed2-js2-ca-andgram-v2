export function renderProfileHeader(userData) {
   
    if (!userData) {
        console.error("User data is missing");
        return;
    }
    const bannerUrl = userData.banner?.url;
    const profilePicUrl = userData.avatar?.url;
    const userName = userData.name;
    const bio = userData.bio || "No bio available";

    const bannerElement = document.getElementById('banner-image');
    const profilePicElement = document.getElementById('profile-image');
    const profileName = document.getElementById('profile-name');
    const bioElement = document.getElementById('profile-bio');

    if (profileName) {
        profileName.textContent = userName;
    }

    if (bannerElement) {
        if (bannerUrl) {
            bannerElement.src = bannerUrl;
            bannerElement.alt = userData.banner?.alt;
        } else {
            bannerElement.style.display = 'none';
        }
    }

    if (profilePicElement) {
        if (profilePicUrl) {
            profilePicElement.src = profilePicUrl;
            profilePicElement.alt = userData.avatar?.alt;
        } else {
            profilePicElement.style.display = 'none';
        }
    }

    if (bioElement) {
        bioElement.textContent = bio;
    } else {
        bioElement.style.display = 'none';
    }
}
