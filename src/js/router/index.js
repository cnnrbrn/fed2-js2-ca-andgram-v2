console.log('Router is running');

export default async function router(pathname = window.location.pathname) {
  // Normalize the pathname by removing any trailing '/index.html'
  pathname = pathname.replace(/\/index\.html$/, '');

  // Get the query parameters (e.g., ?id=335)
  const searchParams = new URLSearchParams(window.location.search);
  const postId = searchParams.get('id'); // Get post ID from query

  // Log the current pathname and query parameters for debugging
  console.log('Current pathname:', pathname);
  console.log('Query parameters:', Object.fromEntries(searchParams.entries()));

  try {
    switch (pathname) {
      case "/":
        console.log('Loading home.js');
        await import("./views/home.js");
        break;

      case "/auth/":
        console.log('Loading auth.js');
        await import("./views/auth.js");
        break;

      case "/auth/login/":
        console.log('Loading login.js');
        await import("./views/login.js");
        break;

      case "/auth/register/":
        console.log('Loading register.js');
        await import("./views/register.js");
        break;

      // Handle URLs like /post/index.html?id=335
      case "/post":
      case "/post/":
        if (postId) {
          console.log(`Loading post.js for post with ID: ${postId}`);
          await import("./views/post.js");
        } else {
          console.error('Post ID not found in query parameters');
          await import("./views/notFound.js");
        }
        break;

      case "/post/edit/":
        console.log('Loading postEdit.js');
        await import("./views/postEdit.js");
        break;

      case "/post/create/":
        console.log('Loading postCreate.js');
        await import("./views/postCreate.js");
        break;

      case "/profile/":
        console.log('Loading profile.js');
        await import("./views/profile.js");

        const profileName = searchParams.get('name');
        if (profileName) {
          console.log(`Loading postList.js for profile: ${profileName}`);
          await import("./views/postList.js");
        } else {
          console.error('Profile name not found in query parameters');
        }
        break;

      default:
        console.log(`Page not found for ${pathname}, loading notFound.js`);
        await import("./views/notFound.js");
    }
  } catch (error) {
    console.error('Error in router:', error);
    await import("./views/notFound.js");
  }
}
