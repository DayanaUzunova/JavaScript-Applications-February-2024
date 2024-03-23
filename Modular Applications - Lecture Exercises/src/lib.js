import { render as renderBase, html } from '../node_modules/lit-html/lit-html.js';
import { classMap } from '../node_modules/lit-html/directives/class-map.js';
import page from '../node_modules/page/page.mjs';

const root = document.querySelector('main');

function render(templateResult) {
    renderBase(templateResult, root);
}

export {
    render,
    html,
    classMap,
    page
};