console.log('Router is running');

export default async function router(pathname = window.location.pathname) {

  // Normalize the pathname by removing any '/index.html' at the end
  pathname = pathname.replace(/\/index\.html$/, '');

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

      case "/profile/":
        console.log('Loading profile.js');
        await import("./views/profile.js");
        
        // Load postList.js to display the user's posts on the profile page
        console.log('Loading postList.js to display posts on the profile page');
        import("./views/postList.js");
        break;

    default:
      console.log(`Page not found for ${pathname}, loading notFound.js`);
      await import("./views/notFound.js");
  }
}
