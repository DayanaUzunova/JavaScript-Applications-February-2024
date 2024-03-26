import { page } from './lib.js'; // Corrected import path
import { showHome } from './views/home.js';
import { showRegister } from './views/register.js';
import { showLogin } from './views/login.js';
import { logoutView } from './views/logoutView.js';
import { showDashboard } from './views/dashboard.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEditView } from './views/edit.js';
import { updateNavigation } from './utils.js';
import { showSearchView } from './views/search.js';


updateNavigation()

page('/',showHome);
page('/register', showRegister);
page('/login', showLogin);
page('/logout', logoutView);
page('/dashboard', showDashboard);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id',showEditView);
page('/search',showSearchView)
page.start()







