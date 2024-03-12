import { get } from './request.js';

const section = document.getElementById('details-view');
section.remove();

export async function showDetailsView(movieId) {
    displayDetails({
        title: '',
        img: '',
        description: ''
    })
    const movie = await getMovieById(movieId);
    displayDetails(movie);

    return section;
}

async function getMovieById(id) {
    const url = `http://localhost:3030/data/movies/${id}`;
    return get(url);
}

function displayDetails(movie) {
    section.querySelector('h1').textContent = movie.title;
    section.querySelector('img').src = movie.img;
    section.querySelector('p').textContent = movie.description;
}