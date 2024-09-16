export function getIdFromUrl() {
    // Get post ID from URL params
    const postId = new URLSearchParams(window.location.search).get('id');
    if (!postId) {
      console.error('Post ID not found');
      return;
    }
  }