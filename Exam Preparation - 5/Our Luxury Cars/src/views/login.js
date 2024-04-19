import { login } from "../data/auth.js";
import { showView } from "../router.js";
import { createSubmitHandler, updateNav } from "../util.js";

const root = document.getElementById('root');

const section = document.getElementById('login');
section.remove();

let context = {};

export function showLogin(ctx) {
    context = ctx;
    context.render(root, section);
}

start();


function start() {
    section.querySelector('.login-form').addEventListener('submit', createSubmitHandler(onLogin));
}

async function onLogin({ email, password }, form) {

    await login(email, password);
    form.reset();
    context.goTo('/home-link')
    updateNav();
}