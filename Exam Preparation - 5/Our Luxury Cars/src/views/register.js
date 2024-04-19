import { register } from "../data/auth.js";
import { createSubmitHandler, updateNav } from "../util.js";

const root = document.getElementById('root');

const section = document.getElementById('register');
section.remove();

start();

let context = {};

export function showRegisterView(ctx) {
    context = ctx;
    context.render(root, section);
}

function start() {
    section.querySelector('.register-form').addEventListener('submit', createSubmitHandler(onRegister));
}

async function onRegister({ email, password, ['re-password']: rePass }, form) {

    if (password !== rePass) {
        return alert('Passwords must match!');
    }

    await register(email, password);
    form.reset();
    context.goTo('/home-link');
    updateNav();
}