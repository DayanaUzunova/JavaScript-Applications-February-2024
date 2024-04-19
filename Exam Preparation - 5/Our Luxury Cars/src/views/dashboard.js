import { getAllCars } from '../data/data.js';

const root = document.getElementById('root');

const section = document.getElementById('dashboard');
section.remove();

const welcomeMsgElement = document.getElementById('cars-message');
const nothingH3 = document.querySelector('.nothing');

let context = {};

export function showDashboardView(ctx) {
    context = ctx;
    start();
    context.render(root, section);
}

const carTemplate = (car) => {
    const div = document.createElement('div');
    div.className = 'car';
    div.dataset.id = car._id;

    div.innerHTML = `
          <img src="${car.imageUrl}" alt="example1" />
          <h3 class="model">${car.model}</h3>
          <div class="specs">
            <p class="price">Price: €${car.price}</p>
            <p class="weight">Weight: ${car.weight} kg</p>
            <p class="top-speed">Top Speed: ${car.speed} kph</p>
          </div>
          <a class="details-btn" href="details-link">More Info</a>
    `;

    return div;
};

async function start() {
    debugger;
    const cars = await getAllCars();

    context.render(root, welcomeMsgElement, section);

    if (cars.length == 0) {
        context.render(section, nothingH3);
    } else {
        context.render(section, ...cars.map(carTemplate));
    }
}
