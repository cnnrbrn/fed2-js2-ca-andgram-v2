export default async function router(pathname = window.location.pathname) {

  // Normalize the pathname by removing any '/index.html' at the end
  pathname = pathname.replace(/\/index\.html$/, '');

  // Get the query string
  const searchParams = new URLSearchParams(window.location.search);
  const profileName = searchParams.get('name');

  switch (pathname) {
    case "/":
      await import("./views/home.js");
      break;

    case "/auth/":
      await import("./views/auth.js");
      break;

    case "/auth/login/":
      await import("./views/login.js");
      break;

    case "/auth/register/":
      await import("./views/register.js");
      break;

    case "/post/":
    case "/post":
      await import("./views/post.js");
      break;

    case "/post/edit/":
      await import("./views/postEdit.js");
      break;

    // Handle both "/post/create" and "/post/create/"
    case "/post/create":
    case "/post/create/":
      await import("./views/postCreate.js");
      break;

    // Handle profile page, even when using '/profile/index.html?name=someusername'
    case "/profile":
      await import("./views/profile.js");

      // Dynamically fetch the profile name from the query string
      if (profileName) {
        await import("./views/postList.js");
      }
      break;

    default:
      await import("./views/notFound.js");
  }
}