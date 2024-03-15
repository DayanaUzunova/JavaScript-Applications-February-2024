import { dataService } from "../api/dataService.js";

const view = document.querySelector("div[data-view-name='create']");
const form = view.querySelector("form");
form.addEventListener("submit", onSubmit);

let context = null;
export function showCreateView(ctx){
    context = ctx;
    context.render(view);
}

async function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);

    const {title, description, imageURL} = Object.fromEntries(formData);

    if(title.length < 6 || description.length < 10 || imageURL.length < 5){
        return alert("Error in Create");
    }
    await dataService.createIdea({title, description, imageURL});
    context.goTo("/dashboard");
    form.reset();
}