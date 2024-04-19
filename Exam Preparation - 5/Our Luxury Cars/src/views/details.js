import { deleteCar, getCarById } from "../data/data.js";
import { isOwner } from "../util.js";

const root = document.getElementById('root');

const section = document.getElementById('details');
section.remove();

let context = {};

export function showDetailsView(ctx, event) {
  showMore(event);
  context = ctx;
  context.render(root, section);
}

const detailsTemplate = (car) => {
  const div = document.createElement('div');
  div.id = 'details-wrapper';

  //TODO: Edit/Delete buttons are visible only for the author

  div.innerHTML = `
    <img id="details-img" src="${car.imageUrl}" alt="example1" />
    <p id="details-title">${car.model}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p class="price">Price: €${car.price}</p>
        <p class="weight">Weight: ${car.weight} kg</p>
        <p class="top-speed">Top Speed: ${car.speed} kph</p>
        <p id="car-description">${car.about}</p>
      </div>
      <!--Edit and Delete are only for creator-->
      ${isOwner(car._ownerId)
      ? `<div id="action-buttons">
            <a href="edit-link" id="edit-btn" data-id="${car._id}">Edit</a>
            <a href="delete-link" id="delete-btn" data-id="${car._id}">Delete</a>
         </div>`
      : ``
    }
    </div>
    `;

  return div;
}

async function showMore(event) {
  const id = event.target.parentElement.dataset.id;

  const car = await getCarById(id);
  context.render(section, detailsTemplate(car))
}

export async function onDelete(ctx, event) {
  const id = event.target.dataset.id;

  const confirm = window.confirm('Are you sure you want to delete this item?');

  if (confirm) {
    await deleteCar(id);
    ctx.goTo('/dashboard-link');
  }

}