import { html } from '../../node_modules/lit-html/lit-html.js';
import { dataService } from '../service/dataService.js';
//step 6 creating views
const dashboardTemplate = (items) => html`
  <div class="container">
    <div class="row space-top">
      <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
      </div>
    </div>
    <div class="row space-top">${items.map((item) => cardTemp(item))}</div>
  </div>
`;
const cardTemp = (item) => html`
  <div class="col-md-4">
    <div class="card text-white bg-primary">
      <div class="card-body">
        <img src=${item.img} />
        <p>${item.description}</p>
        <footer>
          <p>Price: <span>${item.price} $</span></p>
        </footer>
        <div>
          <a href="/details/${item._id}" class="btn btn-info">Details</a>
        </div>
      </div>
    </div>
  </div>
`;

export async function showDashboardView(ctx) {
  const data = await dataService.getAllFurniture();
  ctx.render(dashboardTemplate(data));
}
