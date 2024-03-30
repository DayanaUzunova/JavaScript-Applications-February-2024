import { delItem, getItemById } from "../data/data.js";
import { html, render, page } from "../lib.js";
import { isOwner } from "../util.js";

const detailsTemp = (item, hasOwner) => html`
<section id="details">
    <div id="details-wrapper">
      <div>
        <img id="details-img" src="../../${item.imageUrl}" alt="example1" />
        <p id="details-title">${item.item}</p>
      </div>
      <div id="info-wrapper">
        <div id="details-description">
          <p class="details-price">Price: ${item.price}</p>
          <p class="details-availability">${item.availability}</p>
          <p class="type">Type: ${item.type}</p>
          <p id="item-description">${item.description}</p>
        </div>
        <!--Edit and Delete are only for creator-->
        ${hasOwner ? html`
            <div id="action-buttons">
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} data-id=${item._id} href="" id="delete-btn">Delete</a>
           </div>` : ""
      }
        </div>
    </div>
  </section>
`;
             
export async function showDetailsView(ctx){
    const id = ctx.params.id;
    const data = await getItemById(id);
    const hasOwner = isOwner(data._ownerId);
    render(detailsTemp(data, hasOwner));
}

async function onDelete(event){
  event.preventDefault();
  const isDel = confirm("Delete item?");
  const id = event.target.dataset.id;
  if(!isDel){
    return;
  }
  await delItem(id);
  page.redirect("/dashboard");
}