import { getMotorById, updateMotor } from "../data/data.js";
import { html, render, page } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemp = (item, handler) => html`
<section id="edit">
        <h2>Edit Motorcycle</h2>
        <div class="form">
          <h2>Edit Motorcycle</h2>
          <form @submit=${handler} class="edit-form" data-id=${item._id}>
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
        >
        </textarea>
         <button type="submit">Edit Motorcycle</button>
        </form>
      </div>
    </section>
`;

export async function showEditView(ctx){
    const id = ctx.params.id;
    const handler = createSubmitHandler(onSubmit);
    const data = await getMotorById(id);
    render(editTemp(data, handler));
}

async function onSubmit(data, form){
    const id = form.dataset.id;
    
    const {model, imageUrl, year, mileage, contact, about} = data;
    if(!model || !imageUrl || !year || !mileage || !contact || !about){
        return alert('All fields needs to be filled!')
    }

    await updateMotor(id, data);
    page.redirect(`/details/${id}`);
}