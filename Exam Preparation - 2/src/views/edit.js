import { html, render } from "../lib.js"
import { detailsModel, updataModel } from "../data/data.js";
import { createSubmitHandler } from "../utils.js";
import { page } from "../lib.js";

const editTemplate = (item, handler) => html`
<section id="edit">
        <h2>Edit Motorcycle</h2>
        <div class="form" data-id=${item._id}>
          <h2>Edit Motorcycle</h2>
          <form @submit=${handler} class="edit-form">
            <input
              type="text"
              name="model"
              id="model"
              placeholder="Model"
              .value=${item.model}

            />
            <input
              type="text"
              name="imageUrl"
              id="moto-image"
              placeholder="Moto Image"
              .value=${item.imageUrl}
            />
            <input
            type="number"
            name="year"
            id="year"
            placeholder="Year"
            .value=${item.year}
          />
          <input
          type="number"
          name="mileage"
          id="mileage"
          placeholder="mileage"
          .value=${item.mileage}
        />
        <input
          type="number"
          name="contact"
          id="contact"
          placeholder="contact"
          .value=${item.contact}
        />
          <textarea
            id="about"
            name="about"
            placeholder="about"
            rows="10"
            cols="50"
            .value=${item.about}
          ></textarea>
            <button type="submit">Edit Motorcycle</button>
          </form>
      </div>
    </section>
`

export async function showEditView(ctx) {
    const id = ctx.params.id;
    const handler = createSubmitHandler((data, form) => onsubmit(id, data, form));

    const data = await detailsModel(id);
    render(editTemplate(data, handler))
}

async function onsubmit(id,data, form) {
    // const id = form.dataset.id;
    const { model, imageUrl, year, mileage, contact, about } = data
    if (!model || !imageUrl || !year || !mileage || !contact || !about) {
        return alert('Empty fields')
    }

    await updataModel(id, data)
    page.redirect(`/details/${id}`);
}