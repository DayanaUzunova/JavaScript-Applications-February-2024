import { page } from "./lib.js";
import { updateNav } from "./util.js";
import { showCreateView } from "./views/createView.js";
import { showDashboardView } from "./views/dashboardView.js";
import { showDetailsView } from "./views/detailsView.js";
import { showEditView } from "./views/editView.js";
import { showHomeView } from "./views/homeView.js";
import { showLoginView } from "./views/loginView.js";
import { logoutView } from "./views/logoutView.js";
import { showRegisterView } from "./views/registerView.js";
import { showSearchView } from "./views/searchView.js";

page('/', showHomeView);
page('/register', showRegisterView);
page('/login', showLoginView);
page('/logout', logoutView);
page('/dashboard', showDashboardView);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/search', showSearchView);
page.start();

updateNav();