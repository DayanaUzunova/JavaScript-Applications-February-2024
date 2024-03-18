import { html,render } from "../node_modules/lit-html/lit-html.js";

//изваждаме си формата в отделна променлива
const form = document.querySelector("form").addEventListener("submit", onSubmit);
//тук ще рендерираме данните
const root = document.getElementById('root');

//функция за взимане на данните 
function onSubmit(e){
    //да не се презарежда страницата
    e.preventDefault();
    const formData = new FormData(e.target);
    //взимаме си лист от градовете, сплитнати с празно място и запетая
    const townsList = formData.get('towns').split(", ");
    //викаме функцията createTemplate върху този лист
    renderer(createTemplate(townsList));
}

//тази функция създава темплейт
//мап-ва всеки град към html елемент част от списък
function createTemplate(towns){
    return html`
    <ul>
        ${towns.map(town => html`<li>${town}</li>`)}
    </ul>
    `
}

//приема информацията и я слага в root
function renderer(data){
    render(data, root);
}
