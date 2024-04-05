import { page } from './lib/lib.js';

import { addGoTo } from './middlewares/redirect.js';
import { renderer } from './middlewares/render.js';

import { logout } from './data/users.js';
import { showRegisterView } from './views/register.js';
import { showLoginView } from './views/login.js';
import { showDashboardView } from './views/dashboard.js';
import { showHomeView } from './views/home.js';
import { showCreateView } from './views/create.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';
import { session } from './middlewares/session.js';

page(renderer(document.getElementById('wrapper')));
page(addGoTo());
page('/index.html', '/dashboard');
page('/', showHomeView);
page('/dashboard', showDashboardView);
page('/create', showCreateView);
page('/details/:id', session(), showDetailsView);
page('/details/:id/edit', showEditView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/logout', logoutAction);

page.start();

async function logoutAction(ctx) {
    await logout();
    ctx.goTo('/');
}
