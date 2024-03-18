import { html, render } from "../node_modules/lit-html/lit-html.js";

//взимаме си линка
const url = "http://localhost:3030/jsonstore/advanced/dropdown";
//взимаме референция към бутона
document.querySelector("form").addEventListener("submit", addItem);
//взимаме референция към полето с опциите
const root = document.getElementById("menu");

//започваме с тази функция, тя взима data-та и я мапва към всички option-и
onLoad();
async function onLoad(){
    const response = await fetch (url);
    const data = await response.json();
    const option = Object.values(data).map(option => optionTemp(option))
    update(option);
}

//темплейт за всички option-и
function optionTemp(data){
    return html`
    <option values=${data._id}>${data.text}</option>
    `
}

//тази функция рендерира всички option-и в root полето
function update(data){ 
    render(data, root);
}

//тук вземаме референция към текстовото поле, взимаме стойността му и го добавяме към option-ите
function addItem(e) {
    e.preventDefault();
    const inputRef = document.getElementById("itemText");
    const text = inputRef.value;
    inputRef.value = "";
    addItemDb({text});
}

//тук правим POST заявка към базата, за да добавим нашата опция към полето
async function addItemDb(data){
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",        
        },
        body: JSON.stringify(data)
    });
    onLoad();
}