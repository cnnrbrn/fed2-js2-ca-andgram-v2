console.log('Router is running');

export default async function router(pathname = window.location.pathname) {

  // Normalize the pathname by removing any '/index.html' at the end
  pathname = pathname.replace(/\/index\.html$/, '');

  // Get the query string (e.g., ?name=andgram, ?name=johndoe)
  const searchParams = new URLSearchParams(window.location.search);
  const postId = searchParams.get('id'); // Get post ID from query

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

    case "/post/":
    case "/post":
      console.log('Loading post.js');
      await import("./views/post.js");
      break;

    case "/post/edit/":
      console.log('Loading postEdit.js');
      await import("./views/postEdit.js");
      break;

    // Handle both "/post/create" and "/post/create/"
    case "/post/create":
    case "/post/create/":
      console.log('Loading postCreate.js');
      await import("./views/postCreate.js");
      break;

    // Handle profile page, even when using '/profile/index.html?name=someusername'
    case "/profile":
      console.log('Loading profile.js');
      await import("./views/profile.js");

      // Dynamically fetch the profile name from the query string (e.g., ?name=someusername)
      const profileName = searchParams.get('name');
      if (profileName) {
        console.log(`Loading postList.js for profile: ${profileName}`); // Log the dynamic profile name
        await import("./views/postList.js");
      }
      break;

    default:
      console.log(`Page not found for ${pathname}, loading notFound.js`);
      await import("./views/notFound.js");
  }
}