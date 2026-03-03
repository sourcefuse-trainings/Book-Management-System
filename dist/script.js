import { BookManager } from "./services/BookManager.js";
import { BookFactory } from "./factories/BookFactory.js";
import { BookValidator } from "./utils/BookValidator.js";
import { Repository } from "./utils/Repository.js";
import { loadBooksFromAPI } from "./utils/api.js";
const factory = new BookFactory();
const validator = new BookValidator();
const repository = new Repository();
const manager = new BookManager(factory, validator, repository);
let editIndex = null;
const form = document.getElementById("bookForm");
const submitBtn = document.getElementById("submitBtn");
const loadBtn = document.getElementById("loadJsonBtn");
const searchInput = document.getElementById("searchInput");
const sortTitleBtn = document.getElementById("sortTitle");
const sortAuthorBtn = document.getElementById("sortAuthor");
const sortDateBtn = document.getElementById("sortDate");
loadBtn.addEventListener("click", async () => {
    try {
        const books = await loadBooksFromAPI("./books.json");
        manager.loadFromJSON(books);
        render();
    }
    catch (error) {
        alert(error.message);
    }
});
searchInput.addEventListener("input", () => {
    manager.search(searchInput.value);
    render();
});
sortTitleBtn.addEventListener("click", () => {
    manager.sortByTitle();
    render();
});
sortAuthorBtn.addEventListener("click", () => {
    manager.sortByAuthor();
    render();
});
sortDateBtn.addEventListener("click", () => {
    manager.sortByDate();
    render();
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const bookData = {
        title: document.getElementById("title").value,
        isbn: document.getElementById("isbn").value,
        publication_date: document.getElementById("publicationDate").value,
        genre: {
            id: crypto.randomUUID(),
            name: document.getElementById("genre").value
        },
        price: Number(document.getElementById("price").value),
        author: {
            id: crypto.randomUUID(),
            name: document.getElementById("author").value
        },
        type: document.getElementById("bookType").value
    };
    const extra = Number(document.getElementById("extraValue").value);
    try {
        if (editIndex !== null) {
            manager.update(editIndex, bookData, extra);
            editIndex = null;
            submitBtn.innerText = "Add Book";
        }
        else {
            manager.addBook(bookData, extra);
        }
        form.reset();
        render();
    }
    catch (err) {
        alert(err.message);
    }
});
function render() {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";
    manager.getAllFiltered().forEach((b, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td class="p-2">${b.title}</td>
      <td class="p-2">${b.author.name}</td>
      <td class="p-2">${b.isbn}</td>
      <td class="p-2">${b.publication_date}</td>
      <td class="p-2">${b.calculateAge()}</td>
      <td class="p-2">${b.genre.name}</td>
      <td class="p-2">₹${b.applyDiscount(10)}</td>
      <td class="p-2">${b.type}</td>
      <td class="p-2">${b.getExtraInfo()}</td>
      <td class="p-2 space-x-2">
        <button class="editBtn bg-yellow-500 text-white px-2 py-1 rounded">
          Edit
        </button>
        <button class="deleteBtn bg-red-600 text-white px-2 py-1 rounded">
          Delete
        </button>
      </td>
    `;
        const editBtn = tr.querySelector(".editBtn");
        const deleteBtn = tr.querySelector(".deleteBtn");
        editBtn.addEventListener("click", () => handleEdit(i));
        deleteBtn.addEventListener("click", () => {
            manager.deleteByIndex(i);
            render();
        });
        tbody.appendChild(tr);
    });
}
function handleEdit(i) {
    const book = manager.getAllFiltered()[i];
    if (!book)
        return;
    editIndex = i;
    submitBtn.innerText = "Update Book";
    document.getElementById("title").value = book.title;
    document.getElementById("isbn").value = book.isbn;
    document.getElementById("publicationDate").value =
        book.publication_date;
    document.getElementById("author").value =
        book.author.name;
    document.getElementById("price").value =
        book.price.toString();
    document.getElementById("genre").value =
        book.genre.name;
    document.getElementById("bookType").value =
        book.type;
}
