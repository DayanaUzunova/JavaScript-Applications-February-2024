import { logout } from "./data/users.js";
import { page } from "./lib.js";
import { updateNav } from "./util.js";
import { showDashboard } from "./views/dashboard.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showEdit } from "./views/edit.js";

updateNav(); 

page('/index.html', showHome);
page('/dashboard', showDashboard);
page('/login', showLogin);
page('/register', showRegister);
page('/create', showCreate);
page('/dashboard/:id', showDetails);
page('/edit/:id', showEdit)
page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    logout();
    updateNav();
    page.redirect('/index.html');
});