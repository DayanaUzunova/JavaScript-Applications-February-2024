import { post } from "./request.js";
import { createSubmitHandler, saveUserData } from "./util.js";

const section = document.getElementById('login-view');
section.remove();

start();

export function showLoginView(){
    return section;
}

function start() {
    const form = section.querySelector('#login-form');
    form.addEventListener('submit', createSubmitHandler(onLogin));
}

async function onLogin({ email, password }) {
    const url = 'http://localhost:3030/users/login';

    const userData = await post(url, { email, password });
    saveUserData(userData);

    window.location = 'index.html';
}