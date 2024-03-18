import { html, render } from "../node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

//взимаме си мястото, на което ще се визуализират картите
const root = document.getElementById("allCats");

//викаме функцията render с функцията, която създава картите с cats и й подаваме мястото, на което да се визуализира
render(createCatList(cats), root);

//функцията за създаването на картичка
//мапваме всяко коте към картичка с коте
function createCatList(cats){
    return html `
    <ul>
    ${cats.map(cat => createCatCard(cat))};
</ul>
    `
}

//тук създаваме структурата на картите
function createCatCard(cat){
    return html`
    <li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click=${toggleCatStatus} class="showBtn">Show status code</button>
    <div class="status" style="display: none" id="304">
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
    </div>
    </div>
</li>
    `
}

//функцията за бутонът
function toggleCatStatus(e){
    //e.target е бутона, на него даваме parentElement, за да стигнем до div-a
    const container = e.target.parentElement.querySelector("div");
    //проверяваме дали е видим или не
    const currentState = container.style.display;

    //ако е невидим
    if(currentState == "none"){
        //да стане видим
        container.style.display = "block";
        //textContent-a на бутона да промени съдържанието си
        e.target.textContent = "Hide status code";
    }else {
        //същото, само, че ако и видим, да стане невидим
        container.style.display = "none";
        e.target.textContent = "Show status code";
    }
}