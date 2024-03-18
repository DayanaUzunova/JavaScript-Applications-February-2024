import { html, render } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "./src/service/dataService.js";

const root = document.getElementById("menu");
document.querySelector("form").addEventListener("submit", addItem);

//започваме с тази функция, тя взима data-та и я мапва към всички option-и
onLoad();
async function onLoad(){
    const data = await dataService.getAllOptions();
    const option = Object.values(data).map(option => optionTemp(option))
    update(option);
}

//темплейт за всички option-и
function optionTemp(data){
    return html `<option values=${data._id}>${data.text}</option>`
}

//тази функция рендерира всички option-и в root полето
function update(data){ 
    render(data, root);
}

//тук вземаме референция към текстовото поле, взимаме стойността му и го добавяме към option-ите
async function addItem(e){
    e.preventDefault();
    const inputRef = document.getElementById("itemText");
    const text = inputRef.value;
    inputRef.value = "";
    await dataService.postNewOption({text});
    onLoad();
}