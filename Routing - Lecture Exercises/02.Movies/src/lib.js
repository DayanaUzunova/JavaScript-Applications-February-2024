import { render as renderBase, html } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

const root = document.querySelector('main');

function render(templateResult){
    renderBase(templateResult, root);
}
export {
    render,
    html,
    page
}
