import { page } from "./lib.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/homeView.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";

page('/', showHome);
page('/catalog/:id', showDetails);
page('/register', showRegister);
page('/login', showLogin)
page.start();