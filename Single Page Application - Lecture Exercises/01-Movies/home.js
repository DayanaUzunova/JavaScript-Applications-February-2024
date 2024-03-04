import { showDetailsView } from './details.js';
import { showView } from './nav.js';
import { request } from './request.js';

export function showHomeView() {
    start();
}

async function start() {
    const list = document.getElementById('list');

    const movies = await getMovies();

    list.replaceChildren(...movies.map(createMoviePreview));
}

async function getMovies() {
    const url = 'http://localhost:3030/data/movies?select=_id%2Ctitle%2Cimg';
    return request(url);
}

function createMoviePreview(movie) {
    const element = document.createElement('li');
    element.innerHTML = `
    <a href="/details/${movie._id}">${movie.title}</a>
    `;

    element.querySelector('a').addEventListener('click', event => showView('details-view', showDetailsView, event, movie._id))

    return element;
}

