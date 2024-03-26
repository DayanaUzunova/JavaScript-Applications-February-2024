import { getAllCatalog } from '../data/data.js';
import { html , render } from '../lib.js';


const dashBoardTemp = (data) => html `
 <h2>Available Motorcycles</h2>
 ${data.length ? dashBoardDataTemp(data) : html `
 <!-- Display an h2 if there are no posts -->
 <h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
`

const dashBoardDataTemp = (data) => html `
    <section id="dashboard">
      <!-- Display a div with information about every post (if any)-->
     ${data.map(item => cardTemp(item))}
      </section>
`


const cardTemp = item => html`
 <div class="motorcycle">
        <img src="../../${item.imageUrl}" alt="example1" />
        <h3 class="model">${item.model}</h3>
        <p class="year">Year: ${item.year}</p>
        <p class="mileage">Mileage: ${item.mileage} km.</p>
        <p class="contact">Contact Number: ${item.contact}</p>
        <a class="details-btn" href="/details/${item._id}">More Info</a>
      </div>
`

export async function showDashboard(){
    const data = await getAllCatalog()
    render(dashBoardTemp(data))
}