import { html, render } from "../node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

//взимаме референция към полетата и бутона
document.querySelector("button").addEventListener("click", search);
const townsRoot = document.getElementById("towns");
const resultRoot = document.getElementById("result");
const inputRef = document.getElementById("searchText");

//първоначално викаме тази функция
update();
//подаваме на тази функция съвпадение
function update(match){
   //тя съдържа render, който получава темплейт с градовете и съвпаденията(които сме подали на функцията) и ги отпечатва в townsRoot
   render(ulTemplate(towns, match), townsRoot);
}

//в тази функция създаваме темплейт на градовете
function ulTemplate(towns, match){
   //тук връщаме html елемент, който минава през всички градове и проверяваме, дали match-a се съдържа в тях
   //използваме ? защото, ако няма match няма изобщо да изпълни кода след него
   return html`<ul>${towns.map(town => createLiTemplate(town, match?.includes(town)))}</ul>`
}

//тук проверяваме дали полето на съвпадението е актив
function createLiTemplate(town, isActive) {
return html`<li class=${isActive ? "active" : ""}>${town}</li>`;
}

//когато кликнем на бутона search
function search() {
   //взима търсеният стринг и неговата стойност
   const searchText = inputRef.value;
   //филтрира всички градове, които съдържат търсеният текст
   const match = towns.filter(town => town.includes(searchText));
   //и викаме първата функция, за да ги отпечата
   update(match);
   //след това ще се извика renderMatchCount функцията
   renderMatchCount(match.length);
}

//тази функция изписва броят на съвпаденията от градовете
function renderMatchCount(count){
   render(html `${count} matches found`, resultRoot);
}
