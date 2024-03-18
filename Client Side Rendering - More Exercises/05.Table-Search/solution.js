import { render, html } from '../node_modules/lit-html/lit-html.js';
solve();

function solve() {
  document.querySelector('#searchBtn').addEventListener('click', onClick);
  const url = 'http://localhost:3030/jsonstore/advanced/table';
  const root = document.querySelector('table tbody');
  const inputRef = document.getElementById('searchField');
  getData();

  async function getData() {
    try {
      let res = await fetch(url);
      if (!res.ok) {
        const err = res.json();
        throw new Error(err.message);
      }
      let data = await res.json();
      let items = Object.values(data);
      let createRows = (items) =>
        html` ${items.map(
          (el) => html` <tr>
            <td>${el.firstName} ${el.lastName}</td>
            <td>${el.email}</td>
            <td>${el.course}</td>
          </tr>`
        )}`;
      render(createRows(items), root);
    } catch (err) {
      alert(err.message);
    }
  }

  function onClick() {
    let text = inputRef.value.toLowerCase();
    if (!text) {
      return;
    }
    let rows = Array.from(root.children);
    for (let row of rows) {
      for (let data of row.children) {
        let dataText = data.textContent.toLowerCase();
        if (dataText.includes(text)) {
          row.classList.add('select');
          break;
        } else {
          row.classList.remove('select');
        }
      }
    }
    inputRef.value = '';
  }
}