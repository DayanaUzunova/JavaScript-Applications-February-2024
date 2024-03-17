import {html, render} from 'https://unpkg.com/lit-html@3.1.2/lit-html.js';

let disabled = false;
let names = [
    'Dayana',
    'Viktor',
    'Petya'
]
const template = (name, value, names) => html `
<h1>Hello, ${name}</h1>
<p>This part should not update!</p>
${clock}
<button @click=${() => alert('Button has been clicked!')}>Experimental button</button>
<input .value=${value}>
<ul>
    ${names.map(a => html`<li>${a}</li>`)}
</ul>
`;

const root = document.querySelector('main');
document.querySelector('button').addEventListener('click', () => {
        render(template('Dynamic content!', 7, names), root);
    });

    render(template('Lit-html', 5, names), root)

//часовник
// const clock = (time, color) => html`
// <div>
//     <h2 class=${color}>Dynamic clock</h2>
//     <p>The time is: ${time}</p>
// </div>
// `;

// const root = document.querySelector('main');
// let isRed = true;

// document.querySelector('button').addEventListener('click', () => {
//     render(template('Dynamic content!'), root);
// });
// setInterval(update, 1000);

//взимане на стринг и параметри с функция
// function myTag(strings, ...params){
//     console.log(strings, params);

//     return '';

// }
// myTag`Hello, ${'inserted value'}, this is a tagged template`;


//цветове на бутона
// function update(){
//     isRed= !isRed;
//     render(template('Lit-html', clock(new Date(), isRed ? 'red' : 'green')), root)
// }