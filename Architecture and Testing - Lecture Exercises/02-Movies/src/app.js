//зареждане на модулите
import { showHomeView } from './home.js';
import { init, showView } from './nav.js';
import { showLoginView } from './login.js';
import { showCreateView } from './create.js';
import { showDetailsView } from './details.js';

//инициализация на рутиращата таблица
const views = {
    'home-link': showHomeView,
    'login-link': showLoginView,
    'create-link': showCreateView,
    'details-link': showDetailsView
};

init(views);

//зачиства DOM
document.getElementById('loading').remove();
document.getElementById('hidden').remove();
//показва първата секция
showView('home-link');