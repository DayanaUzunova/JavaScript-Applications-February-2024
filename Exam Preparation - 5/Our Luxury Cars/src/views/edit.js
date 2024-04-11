import { getCarById, updateCar } from "../data/data.js";
import { createSubmitHandler } from "../util.js";

const root = document.getElementById('root');

const section = document.getElementById('edit');
section.remove();

const form = section.querySelector('.edit-form')

let context = {};
let event;

start();

export async function showEditView(ctx, ev) {
    context = ctx;
    event = ev;
    const id = event.target.dataset.id;
    context.render(root, section);
    await populateForm(id, form);
}

function start() {
    form.addEventListener('submit', createSubmitHandler(onEdit));
}

async function onEdit({ model, imageUrl, price, weight, speed, about }, form) {

    const id = event.target.dataset.id;
    debugger

    await updateCar(id, model, imageUrl, price, weight, speed, about);

    form.reset();
    context.goTo('/details-link');
}

async function populateForm(id, form) {
    const carData = await getCarById(id);
    debugger
    form.children[0].value = carData.model;
    form.children[1].value = carData.imageUrl;
    form.children[2].value = carData.price;
    form.children[3].value = carData.weight;
    form.children[4].value = carData.speed;
    form.children[5].value = carData.about;
}