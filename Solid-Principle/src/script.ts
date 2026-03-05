import { BookManager } from "./services/BookManager.js";
import type { IBook } from "./models/IBook.js";
import { BookFactory } from "./factory/BookFactory.js";
import { BookValidator } from "./utils/BookValidator.js";
import { BookRepository } from "./repositorie/BookRepository.js";
import { ApiService } from "./services/ApiService.js";

const factory = new BookFactory();
const validator = new BookValidator();
const repository = new BookRepository();
const apiService = new ApiService();

const manager = new BookManager(factory, validator, repository, apiService);

const tableBody = document.getElementById(
  "tableBody",
) as HTMLTableSectionElement;
const mobileBody = document.getElementById("mobileTableBody") as HTMLDivElement;

const bookForm = document.getElementById("bookForm") as HTMLFormElement;

const searchInput = document.getElementById("searchInput") as HTMLInputElement;

const sortTitleBtn = document.getElementById("sortTitle") as HTMLButtonElement;
const sortAuthorBtn = document.getElementById(
  "sortAuthor",
) as HTMLButtonElement;
const sortDateBtn = document.getElementById("sortDate") as HTMLButtonElement;

const loadBtn = document.getElementById("loadJsonBtn") as HTMLButtonElement;

const titleInput = document.getElementById("title") as HTMLInputElement;
const authorInput = document.getElementById("author") as HTMLInputElement;
const isbnInput = document.getElementById("isbn") as HTMLInputElement;
const dateInput = document.getElementById(
  "publicationDate",
) as HTMLInputElement;
const genreInput = document.getElementById("genre") as HTMLSelectElement;
const priceInput = document.getElementById("price") as HTMLInputElement;
const typeInput = document.getElementById("type") as HTMLSelectElement;

let editIndex: number | null = null;

loadBtn.onclick = async () => {
  const res = await fetch("./books.json");
  const data: IBook[] = await res.json();

  manager.loadFromJSON(data);
  render();
};

bookForm.onsubmit = (e) => {
  e.preventDefault();

  const bookData: IBook = {
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
  } else {
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

(window as any).editBook = (index: number) => {
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

(window as any).deleteBook = (index: number) => {
  manager.delete(index);
  render();
};
