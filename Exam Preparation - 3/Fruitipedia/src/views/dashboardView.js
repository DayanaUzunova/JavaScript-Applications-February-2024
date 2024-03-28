import { getAllFruits } from "../data/data.js";
import { html, render } from "../lib.js";

const dashboardTemplate = (data) => html`
  <h2>Fruits</h2>
${data.length ? dashboardDataTemp(data) : html`<h2>No fruit info yet.</h2>`}
`
const dashboardDataTemp = (data) => html`
    <section id="dashboard">
     ${data.map(item => fruitTemp(item))}
</section>
`
const fruitTemp = (item) => html`
<div class="fruit">
      <img src="${item.imageUrl}" alt="example1" />
      <h3 class="title">${item.name}</h3>
      <p class="description">${item.description}</p>
      <a class="details-btn" href="/details/${item._id}">More Info</a>
    </div>
`

export async function showDashboardView(){
const data = await getAllFruits();
    render(dashboardTemplate(data));
}

