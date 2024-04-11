import { createCar } from "../data/data.js";
import { createSubmitHandler } from "../util.js";

const root = document.getElementById('root');

const section = document.getElementById('create');
section.remove();

let context = {};

start();

export function showCreateView(ctx) {
    context = ctx;
    context.render(root, section);
}

function start() {
    section.querySelector('.create-form').addEventListener('submit', createSubmitHandler(onCreate));
}

async function onCreate({ model, imageUrl, price, weight, speed, about }, form) {
    await createCar(model, imageUrl, price, weight, speed, about);

    form.reset();
    context.goTo('/dashboard-link');
}