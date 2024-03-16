import { render } from "./renderer.js";

const views = {
    'home': {
        title: "Templating demo!",
        content: "Home page content!"
    },
    'catalog': {
        title: "This is the second demo!",
        content: "Catalog page content!"
    },
    'about': {
        title: "This is the third demo!",
        content: "Third page demo!"
    }
};

document.querySelector('nav').addEventListener("click", (event) => {
    if(event.target.tagName == 'A'){
        event.preventDefault();
        show(event.target.id);
    }
})
const root = document.querySelector('main');

show('home')

async function show(id){
    const context = views[id];
  
    const result = await render('layout', context);
    root.innerHTML = result
}