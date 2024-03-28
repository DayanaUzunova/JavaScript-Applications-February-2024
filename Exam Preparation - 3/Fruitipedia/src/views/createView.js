import { createFruit } from "../data/data.js";
import { html, render, page } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const createTemp = (handler) => html`
<section id="create">
    <div class="form">
      <h2>Add Fruit</h2>
      <form @submit=${handler} class="create-form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Fruit Name"
        />
        <input
          type="text"
          name="imageUrl"
          id="Fruit-image"
          placeholder="Fruit Image"
        />
        <textarea
        id="fruit-description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
      ></textarea>
      <textarea
        id="fruit-nutrition"
        name="nutrition"
        placeholder="Nutrition"
        rows="10"
        cols="50"
      ></textarea>
        <button type="submit">Add Fruit</button>
      </form>
    </div>
  </section>
`;

export function showCreateView(){
    const handler = createSubmitHandler(onSubmit);
    render(createTemp(handler));
}

async function onSubmit(data, form){
    const {name, imageUrl, description, nutrition} = data;
    if(!name || !imageUrl || !description || !nutrition){
        return alert('All fields needs to be filled!')
    }

    await createFruit(data);
    page.redirect('/dashboard');
}

