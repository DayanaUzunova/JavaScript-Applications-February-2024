import { html, render } from "../node_modules/lit-html/lit-html.js";
 
const endpoints = {
  catalog: '/jsonstore/collections/books',
  details: (id) => `/jsonstore/collections/books/${id}`,
  delete: (id) => `/data/albums/${id}`,
};
 
const root = document.querySelector("tbody");
const submitBtn = document.getElementById("submit");
const loadBtn = document.getElementById("loadBooks");
 
const mainForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");
editForm.style.display = "none";
 
 
loadBtn.addEventListener("click", loadBooks);
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const formData = new FormData(mainForm);
  const data = Object.fromEntries(formData.entries());
  if (Object.values(data).some((x) => x == "")) {
    return;
  }
 
  await request(endpoints.catalog, "post", data);
  mainForm.reset();
});
 
async function loadBooks() {
  const data = await request(endpoints.catalog, "get");
  const books = Object.entries(data);
  render(books.map(booksTemplate), root);
}
 
function booksTemplate([id, book]) {
  return html` 
  <tr id=${id}>
    <td>${book.author}</td>
    <td>${book.title}</td>
    <td>
      <button @click=${onEdit}>Edit</button>
      <button @click=${onDelete}>Delete</button>
    </td>
  </tr>`;
}
 
async function onEdit(e) {
  const author = document.getElementById("author-input");
  const title = document.getElementById("title-input");
 
  const bookId = e.target.parentElement.parentElement.id;
  const book = await request(endpoints.details(bookId), "get");
 
  author.value = book.author;
  title.value = book.title;
 
  mainForm.style.display = "none";
  editForm.style.display = "block";
 
  document.getElementById("save").addEventListener("click", (e) => {
    e.preventDefault();
 
    if (!author.value || !title.value) {
      return;
    }
    request(endpoints.details(bookId), "put", {
      author: author.value,
      title: title.value,
    });
 
    mainForm.style.display = "block";
    editForm.style.display = "none";
 
    editForm.reset();
  });
}
 
async function onDelete(e) {
  const bookId = e.target.parentElement.parentElement.id;
  request(endpoints.delete(bookId), "delete");
}
 
async function request(url, method, body) {
  const option = {
    method,
    headers: { "Content-Type": "application/json" },
  };
 
  if (body) {
    option.body = JSON.stringify(body);
  }
 
  try {
    const response = await fetch(url, option);
    const data = await response.json();
 
    if (!response.ok) {
      throw new Error(data.message);
    }
 
    return data;
  } catch (error) {
    alert(error);
  }
}