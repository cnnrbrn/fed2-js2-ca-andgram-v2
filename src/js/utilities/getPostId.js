export function getPostIdFromURL() {
  // Get post ID from URL params
  const postId = new URLSearchParams(window.location.search).get('id');
  
  if (!postId) {
      console.error('Post ID not found');
      return null; // Return null to indicate that no ID was found
  }

  console.log(postId);
  return postId; // Return the post ID if found

}


