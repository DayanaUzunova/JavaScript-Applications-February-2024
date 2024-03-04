import { showHomeView } from './home.js';
import { showView } from './nav.js';
import './create.js';
import './login.js';


const views = {
    'home-link': ['home-view', showHomeView],
    'login-link': ['login-view'],
    'create-link': ['create-view']
};

for (const linkId in views) {
    const [sectionId, callback] = views[linkId];
    document.getElementById(linkId).addEventListener('click', event => showView(sectionId, callback, event));
}

document.getElementById('loading').remove();
showView('home-view', showHomeView);
