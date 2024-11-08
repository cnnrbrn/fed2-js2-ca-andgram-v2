const BASE_PATH = "/fed2-js2-ca-andgram"; 

import { displayMenu } from "../components/shared/displayMenu.js";

export default async function router(pathname = window.location.pathname) {
  // Remove base path from `pathname` to get the relative route
  pathname = pathname.includes(BASE_PATH)
    ? pathname.replace(BASE_PATH, "")
    : pathname;

  displayMenu();

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
      await import("./views/post.js");
      break;
    case "/post/edit/":
      await import("./views/postEdit.js");
      break;
    case "/post/create/":
      await import("./views/postCreate.js");
      break;
    case "/profile/":
      await import("./views/profile.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}
