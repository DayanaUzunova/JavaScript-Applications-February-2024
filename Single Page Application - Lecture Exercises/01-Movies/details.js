import { request } from './request.js';

export async function showDetailsView(movieId) {
    displayDetails({
        title: '',
        img: '',
        description: ''
    })
    const movie = await getMovieById(movieId);
    displayDetails(movie);
}

async function getMovieById(id) {
    const url = `http://localhost:3030/data/movies/${id}`;
    return request(url);
}

function displayDetails(movie) {
    const section = document.getElementById('details-view');
    section.querySelector('h1').textContent = movie.title;
    section.querySelector('img').src = movie.img;
    section.querySelector('p').textContent = movie.description;
}