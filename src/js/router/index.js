export default async function router(pathname = window.location.pathname) {
  // Normalize pathname by removing trailing '/index.html'
  pathname = pathname.replace(/\/index\.html$/, '');

  // Get query parameters
  const searchParams = new URLSearchParams(window.location.search);
  const profileName = searchParams.get('name');

  const routeMap = {
    "/": "./views/home.js",
    "/auth/": "./views/auth.js",
    "/auth/login/": "./views/login.js",
    "/auth/register/": "./views/register.js",
    "/post/": "./views/post.js",
    "/post": "./views/post.js",
    "/post/edit/": "./views/postEdit.js",
    "/post/create": "./views/postCreate.js",
    "/post/create/": "./views/postCreate.js",
    "/profile": "./views/profile.js"
  };

  if (routeMap[pathname]) {
    await import(routeMap[pathname]);

    if (pathname === "/profile" && profileName) {
      await import("./views/postList.js");
    }
  } else {
    await import("./views/notFound.js");
  }
}
