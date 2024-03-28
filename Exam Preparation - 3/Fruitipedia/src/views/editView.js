import { getFruitById, updateFruit } from "../data/data.js";
import { html, render, page } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemp = (item, handler) => html`
<section id="edit">
    <div class="form">
      <h2>Edit Fruit</h2>
      <form @submit=${handler} class="edit-form" data-id=${item._id}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Fruit Name"
          .value=${item.name}
        />
        <input
          type="text"
          name="imageUrl"
          id="Fruit-image"
          placeholder="Fruit Image URL"
          .value=${item.imageUrl}
        />
        <textarea
          id="fruit-description"
          name="description"
          placeholder="Description"
          rows="10"
          cols="50"
          .value=${item.description}
        ></textarea>
        <textarea
          id="fruit-nutrition"
          name="nutrition"
          placeholder="Nutrition"
          rows="10"
          cols="50"
          .value=${item.nutrition}
        ></textarea>
        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export async function showEditView(ctx){
    const id = ctx.params.id;
    const handler = createSubmitHandler(onSubmit);
    const data = await getFruitById(id);
    render(editTemp(data, handler));
}

async function onSubmit(data, form){
    const id = form.dataset.id;
    
    const {name, imageUrl, description, nutrition} = data;
    if(!name || !imageUrl || !description || !nutrition){
        return alert('All fields needs to be filled!')
    }

    await updateFruit(id, data);
    page.redirect(`/details/${id}`);
}