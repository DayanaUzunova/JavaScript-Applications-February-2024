import { getAllEvents } from '../data/events.js';
import { html, render } from '../lib.js';

const catalogTemplate = (events) => html`
<h2>Current Events</h2>
<section id="dashboard">
    ${events.length ? events.map(eventTemplate) : html`<h4>No Events yet.</h4>`}
</section>`;

const eventTemplate = (event) => html`
<div class="event">
    <img src=${event.imageUrl} alt="example1" />
    <p class="title">${event.name}</p>
    <p class="date">${event.date}</p>
    <a class="details-btn" href="/catalog/${event._id}">Details</a>
</div>`;

export async function showCatalog(ctx) {
    const events = await getAllEvents();
    render(catalogTemplate(events));
}