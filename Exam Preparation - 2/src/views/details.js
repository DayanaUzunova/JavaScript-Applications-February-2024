import { deleteModel, detailsModel } from "../data/data.js";
import { html,render } from "../lib.js"
import { isOwner } from "../utils.js";
import { page } from "../lib.js";


const detailsTemplate = (item, hasOwner) => html`
 <section id="details">
      <div id="details-wrapper">
        <img id="details-img" src="../../${item.imageUrl}" alt="example1" />
        <p id="details-title">${item.model}</p>
        <div id="info-wrapper">
          <div id="details-description">
            <p class="year">Year: ${item.year}</p>
            <p class="mileage">Mileage: ${item.mileage} km.</p>
            <p class="contact">Contact Number: ${item.contact}</p>
               <p id = "motorcycle-description">
                ${item.about}
                    </p>
          </div>
           <!--Edit and Delete are only for creator-->
              ${hasOwner ? html `
              <div id="action-buttons">
        <a href="/edit/${item._id}" id="edit-btn">Edit</a>
        <a @click= ${onDelete} data-id=${item._id} href="/delete" id="delete-btn">Delete</a>
      </div>` :
      ""}
        </div>
    </div>
  </section>
`

export async function showDetails(ctx){
    const id = ctx.params.id;
    const data = await detailsModel(id);
    const hasOwner = isOwner(data._ownerId)
    render(detailsTemplate(data,hasOwner))
}

async function onDelete(e){
    e.preventDefault()
    const isDel = confirm('Delete model?')
    if(!isDel){
        return
    }
    const id = e.target.dataset.id;
    await deleteModel(id);
    page.redirect('/dashboard')
}