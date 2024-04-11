import { getCarsByName } from "../data/data.js";
import { createSubmitHandler } from "../util.js";

const root = document.getElementById('root');

const section = document.getElementById('search');
section.remove();

let context = {};

export function showSearchView(ctx) {
    context = ctx;
    start();
    context.render(root, section);
}

const searchTemplate = () => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="form">
          <h4>Search</h4>
          <form class="search-form">
            <input type="text" name="search" id="search-input" />
            <button class="button-list">Search</button>
          </form>
        </div>
        <div class="search-result">
          <h2 class="no-avaliable">No result.</h2>
          <!--If there are matches display a div with information about every motorcycle-->
          </div>
        </div>
    `;
    return div;
}

const carResultTemplate = (car) => {

    const div = document.createElement('div');
    div.className = 'car';
    div.innerHTML = `
    <img src="${car.imageUrl}" alt="example1" />
            <h3 class="model">${car.model}</h3>
            <a class="details-btn" href="details-link">More Info</a>
    `;
    return div;
}

const searchNoResultTemplate = () => {
    const h2 = document.createElement('h2');
    h2.className = 'no-available';
    h2.textContent = 'No result.';

    return h2;
}


function start() {
    context.render(section, searchTemplate());
    section.querySelector('form').addEventListener('submit', createSubmitHandler(onSearch))
}


async function onSearch({ search }, form) {
    const cars = await getCarsByName(search);

    const searchResultEl = section.querySelector('.search-result');
    if (cars.length == 0) {
        searchResultEl.replaceChildren(searchNoResultTemplate())
    } else {
        searchResultEl.replaceChildren(...cars.map(carResultTemplate));
    }

}