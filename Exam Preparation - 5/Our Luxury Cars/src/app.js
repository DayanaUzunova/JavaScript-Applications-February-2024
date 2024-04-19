import { logout } from "./data/auth.js";
import { init, showView } from "./router.js";
import { updateNav } from "./util.js";
import { showCreateView } from "./views/create.js";
import { showDashboardView } from "./views/dashboard.js";
import { onDelete, showDetailsView } from "./views/details.js";
import { showEditView } from "./views/edit.js";
import { showHomeView } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegisterView } from "./views/register.js";
import { showSearchView } from "./views/search.js";


const views = {
    '/': showHomeView,
    '/home-link': showHomeView,
    '/login-link': showLogin,
    '/register-link': showRegisterView,
    '/dashboard-link': showDashboardView,
    '/add-link': showCreateView,
    '/delete-link': onDelete,
    '/details-link': showDetailsView,
    '/edit-link': showEditView,
    '/search-link': showSearchView,
    '/logout-link': onLogout
};


document.getElementById('main-element').remove();

const ctx = {
    render: renderer,
    goTo: showView,
    updateNav
};


init(views, ctx);


ctx.goTo('/home-link');
ctx.updateNav();


function renderer(rootElement, ...views) {
    rootElement.replaceChildren(...views);
}


async function onLogout() {

    //we need to await the logout so it clears the localStorage,
    //otherwise it takes time and it clears it after the 
    //updateNav is called and it thinks that the user is still logged
    await logout();

    showView('/home-link');
    updateNav();
}