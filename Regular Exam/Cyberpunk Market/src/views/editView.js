import { getItemById, updateItem } from "../data/data.js";
import { html, render, page } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemp = (item, handler) => html`
<section id="edit">
    <div class="form form-item">
      <h2>Edit Your Item</h2>
      <form @submit=${handler} class="edit-form" data-id=${item._id}>
        <input type="text" name="item" id="item" placeholder="Item" value=${item.item} 
        />
        <input
          type="text"
          name="imageUrl"
          id="item-image"
          placeholder="Your item Image URL"
          .value=${item.imageUrl}
        />
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Price in Euro"
          .value=${item.price}
        />
        <input
          type="text"
          name="availability"
          id="availability"
          placeholder="Availability Information"
          .value=${item.availability}
        />
        <input
          type="text"
          name="type"
          id="type"
          placeholder="Item Type"
          .value=${item.type}
        />
        <textarea
          id="description"
          name="description"
          placeholder="More About The Item"
          rows="10"
          cols="50"
          .value=${item.description}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`;

export async function showEditView(ctx){
    const id = ctx.params.id;
    const handler = createSubmitHandler(onSubmit);
    const data = await getItemById(id);
    render(editTemp(data, handler));
}

async function onSubmit(data, form){
    const id = form.dataset.id;
    
    const {item, imageUrl, price, availability, type, description} = data;
    if(!item || !imageUrl || !price || !availability || !type || !description){
        return alert('All fields needs to be filled!')
    }

    await updateItem(id, data);
    page.redirect(`/details/${id}`);
}