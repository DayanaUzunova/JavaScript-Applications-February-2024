const loadBtnRef = document.getElementById("loadBooks");
const tableRef = document.querySelector("tbody");
const formRef = document.querySelector("form");
loadBtnRef.addEventListener("click", loadBooks);
const url = "http://localhost:3030/jsonstore/collections/books";
formRef.addEventListener("submit", addBook);

async function loadBooks() {
    try {
        let res = await fetch(url);
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }
        let data = await res.json();
        let ids = Object.keys(data);
        tableRef.replaceChildren(...Object.values(data).map((el, i) => createRow(el, i, ids)));
    } catch (err) {
        alert(err.message);
    }
}
async function addBook(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let title = formData.get("title").trim();
    let author = formData.get("author").trim();
    await fetch(url, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, author }),
    });
    await loadBooks();
    formRef.reset();
}

function createRow(data, i, id) {
    let trEl = document.createElement("tr");
    let titleEl = document.createElement("td");
    titleEl.textContent = data.title;
    trEl.appendChild(titleEl);
    let authorEl = document.createElement("td");
    authorEl.textContent = data.author;
    trEl.appendChild(authorEl);
    let tdEl = document.createElement("td");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.dataset.id = id[i];
    editBtn.addEventListener("click", editBook);
    tdEl.appendChild(editBtn);
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.id = id[i];
    deleteBtn.addEventListener("click", deleteBook);
    tdEl.appendChild(deleteBtn);
    trEl.appendChild(tdEl);
    return trEl;
}

function editBook(event) {
    let id = event.target.dataset.id;
    let target = event.target;
    formRef.children[0].textContent = "Edit FORM";
    formRef.children[5].remove();
    formRef.children[2].value = target.parentElement.parentElement.children[0].textContent;
    formRef.children[4].value = target.parentElement.parentElement.children[1].textContent;
    let saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    formRef.appendChild(saveBtn);
    formRef.removeEventListener("submit", addBook);
    formRef.addEventListener("submit", (event) => {
        event.preventDefault();
        makePutRequest(id, target)
    });
}
async function deleteBook(event) {
    const id = event.target.dataset.id;
    await fetch(url + "/" + id, { method: "delete" });
    event.target.parentElement.parentElement.remove();
}
async function makePutRequest(id, target) {
    let formData = new FormData(formRef);
    let title = formData.get("title").trim();
    let author = formData.get("author").trim();
    await fetch(url + "/" + id, {
        method: "put",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, author }),
    });
    formRef.children[0].textContent = "FORM";
    formRef.children[5].remove();
    let submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    formRef.appendChild(submitBtn);
    target.parentElement.parentElement.children[0].textContent = title;
    target.parentElement.parentElement.children[1].textContent = author;
    formRef.addEventListener("submit", addBook);
    formRef.reset();
}