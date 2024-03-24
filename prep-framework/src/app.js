import { page } from "./lib.js";
import { showExample } from "./views/exapmleView.js";

//TODO remove these imports after testing and adding views
import * as api from './data/request.js';
import * as userApi from './data/users.js';

page('/index.html', showExample);
page.start();

window.api = api;
window.userApi = userApi;