import { BookManager } from "./services/BookManager.js";
import { BookFactory } from "./factory/BookFactory.js";
import { BookValidator } from "./utils/BookValidator.js";
import { BookRepository } from "./repositorie/BookRepository.js";
import { ApiService } from "./services/ApiService.js";
const factory = new BookFactory();
const validator = new BookValidator();
const repository = new BookRepository();
const apiService = new ApiService();
const manager = new BookManager(factory, validator, repository, apiService);
const tableBody = document.getElementById("tableBody");
const mobileBody = document.getElementById("mobileTableBody");
const bookForm = document.getElementById("bookForm");
const searchInput = document.getElementById("searchInput");
const sortTitleBtn = document.getElementById("sortTitle");
const sortAuthorBtn = document.getElementById("sortAuthor");
const sortDateBtn = document.getElementById("sortDate");
const loadBtn = document.getElementById("loadJsonBtn");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const isbnInput = document.getElementById("isbn");
const dateInput = document.getElementById("publicationDate");
const genreInput = document.getElementById("genre");
const priceInput = document.getElementById("price");
const typeInput = document.getElementById("type");
let editIndex = null;
loadBtn.onclick = async () => {
    const res = await fetch("./books.json");
    const data = await res.json();
    manager.loadFromJSON(data);
    render();
};
bookForm.onsubmit = (e) => {
    e.preventDefault();
    const bookData = {
        title: titleInput.value,
        author: {
            id: Date.now().toString(),
            name: authorInput.value,
        },
        isbn: isbnInput.value,
        publication_date: dateInput.value,
        genre: {
            id: Date.now().toString(),
            name: genreInput.value,
        },
        price: Number(priceInput.value),
        type: typeInput.value,
    };
    if (editIndex !== null) {
        manager.update(editIndex, bookData);
        editIndex = null;
    }
    else {
        manager.add(bookData);
    }
    bookForm.reset();
    render();
};
searchInput.oninput = () => {
    manager.search(searchInput.value);
    render();
};
sortTitleBtn.onclick = () => {
    manager.sortByTitle();
    render();
};
sortAuthorBtn.onclick = () => {
    manager.sortByAuthor();
    render();
};
sortDateBtn.onclick = () => {
    manager.sortByDate();
    render();
};
function render() {
    tableBody.innerHTML = "";
    mobileBody.innerHTML = "";
    const books = manager.getAll();
    books.forEach((b, i) => {
        tableBody.innerHTML += `
      <tr>
        <td>${b.title}</td>
        <td>${b.author.name}</td>
        <td>${b.isbn}</td>
        <td>${b.publication_date}</td>
        <td>${b.calculateAge()}</td>
        <td>${b.genre.name}</td>
        <td>₹${b.applyDiscount(10)}</td>
        <td>${b.type}</td>
        <td>${b.getExtraInfo()}</td>
        <td>
          <button onclick="editBook(${i})">Edit</button>
          <button onclick="deleteBook(${i})">Delete</button>
        </td>
      </tr>
    `;
        mobileBody.innerHTML += `
      <div class="border p-3 rounded mb-2">
        <h3>${b.title}</h3>
        <p><b>Author:</b> ${b.author.name}</p>
        <p><b>Genre:</b> ${b.genre.name}</p>
        <p><b>Type:</b> ${b.type}</p>
        <p><b>Price:</b> ₹${b.applyDiscount(10)}</p>
        <p>${b.getExtraInfo()}</p>

        <button onclick="editBook(${i})">Edit</button>
        <button onclick="deleteBook(${i})">Delete</button>
      </div>
    `;
    });
}
window.editBook = (index) => {
    const b = manager.getAll()[index];
    titleInput.value = b.title;
    authorInput.value = b.author.name;
    isbnInput.value = b.isbn;
    dateInput.value = b.publication_date;
    genreInput.value = b.genre.name;
    priceInput.value = b.price.toString();
    typeInput.value = b.type;
    editIndex = index;
};
window.deleteBook = (index) => {
    manager.delete(index);
    render();
};
