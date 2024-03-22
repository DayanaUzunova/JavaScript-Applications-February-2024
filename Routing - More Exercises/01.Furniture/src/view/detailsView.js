import { html } from '../../node_modules/lit-html/lit-html.js';
import { dataService } from '../service/dataService.js';
import { userHelper } from '../utility/userHelper.js';

//step 12
const detailsTemp = (item, isOwner, isLogged) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Furniture Details</h1>
    </div>
  </div>
  <div class="row space-top">
    <div class="col-md-4">
      <div class="card text-white bg-primary">
        <div class="card-body">
          <img src="../.${item.img}" />
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <p>Make: <span>${item.make}</span></p>
      <p>Model: <span>${item.model}</span></p>
      <p>Year: <span>${item.year}</span></p>
      <p>Description: <span>${item.description}</span></p>
      <p>Price: <span>${item.price}</span></p>
      <p>Material: <span>${item.material}</span></p>
      ${isOwner && isLogged ? getButtons(item._id) : ''}
    </div>
  </div>
`;
//step 13 create the buttons for creator only head to createView
function getButtons(id) {
  return html`
    <div>
      <a href="/edit/${id}" class="btn btn-info">Edit</a>
      <a href="/delete/${id}" class="btn btn-red">Delete</a>
    </div>
  `;
}
// we get the item id to get the right one
export async function showDetails(ctx) {
  const itemId = ctx.params.id;
  const item = await dataService.getFurnitureDetails(itemId);
  const isOwner = userHelper.hasOwner(item._ownerId);
  const isLogged = userHelper.getUserId();
  ctx.render(detailsTemp(item, isOwner, isLogged));
}
