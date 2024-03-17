import { html, render as litRender } from '../node_modules/lit-html/lit-html.js';
import { classMap } from '../node_modules/lit-html/directives/class-map.js';

const root = document.querySelector('main');
root.replaceChildren(); 

export function render(view){
litRender(view, root);
}

export {
    html,
    classMap
};