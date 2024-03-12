import { post } from './request.js';
import { showView } from './nav.js';
import { createSubmitHandler, getUserData } from './util.js';

const section = document.getElementById('create-view');
section.remove();

start();

export function showCreateView(){
    return section
}

function start() {
    section.querySelector('#create-form').addEventListener('submit', createSubmitHandler(onPublish));
}

async function onPublish({title, img, description}) {
    const url = 'http://localhost:3030/data/movies';
    const userData = getUserData();

    if (!userData) {
        alert('You must be logged in to publish movies!');
        return;
    }

    const movie = await post(url, { title, img, description });

    showView('details-link', movie._id);
} 