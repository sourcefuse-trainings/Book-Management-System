import { BookManager } from "./services/BookManager.js";
import { BookFactory } from "./factories/BookFactory.js";
import { BookValidator } from "./utils/BookValidator.js";
import { Repository } from "./utils/Repository.js";
import { loadBooksFromAPI } from "./utils/api.js";
import type { Book } from "./types/Book.js";
import type { BaseBook } from "./models/BaseBook.js"

const factory = new BookFactory();
const validator = new BookValidator();
const repository = new Repository();

const manager = new BookManager(factory, validator, repository);

let editIndex: number | null = null

const form = document.getElementById("bookForm") as HTMLFormElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const loadBtn = document.getElementById("loadJsonBtn") as HTMLButtonElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const sortTitleBtn = document.getElementById("sortTitle") as HTMLButtonElement;
const sortAuthorBtn = document.getElementById("sortAuthor") as HTMLButtonElement;
const sortDateBtn = document.getElementById("sortDate") as HTMLButtonElement;


loadBtn.addEventListener("click", async () => {
  try {
    const books = await loadBooksFromAPI("./books.json");
    manager.loadFromJSON(books);
    render();
  } catch (error: any) {
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

  const bookData: Book = {
    title: (document.getElementById("title") as HTMLInputElement).value,
    isbn: (document.getElementById("isbn") as HTMLInputElement).value,
    publication_date: (document.getElementById("publicationDate") as HTMLInputElement).value,
    genre: {
      id: crypto.randomUUID(),
      name: (document.getElementById("genre") as HTMLSelectElement).value
    },
    price: Number((document.getElementById("price") as HTMLInputElement).value),
    author: {
      id: crypto.randomUUID(),
      name: (document.getElementById("author") as HTMLInputElement).value
    },
    type: (document.getElementById("bookType") as HTMLSelectElement).value
  };

  const extra = Number(
    (document.getElementById("extraValue") as HTMLInputElement).value
  );

  try {
    if (editIndex !== null) {
      manager.update(editIndex, bookData, extra);
      editIndex = null;
      submitBtn.innerText = "Add Book";
    } else {
      manager.addBook(bookData, extra);
    }

    form.reset();
    render();
  } catch (err: any) {
    alert(err.message);
  }
});


function render() {
  const tbody = document.getElementById("tableBody")!;
  tbody.innerHTML = "";

  manager.getAllFiltered().forEach((b: BaseBook, i: number) => {
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

    const editBtn = tr.querySelector(".editBtn") as HTMLButtonElement;
    const deleteBtn = tr.querySelector(".deleteBtn") as HTMLButtonElement;

    editBtn.addEventListener("click", () => handleEdit(i));
    deleteBtn.addEventListener("click", () => {
      manager.deleteByIndex(i);
      render();
    });

    tbody.appendChild(tr);
  });
}

function handleEdit(i: number) {
  const book = manager.getAllFiltered()[i];
  if (!book) return;

  editIndex = i;
  submitBtn.innerText = "Update Book";

  (document.getElementById("title") as HTMLInputElement).value = book.title;
  (document.getElementById("isbn") as HTMLInputElement).value = book.isbn;
  (document.getElementById("publicationDate") as HTMLInputElement).value =
    book.publication_date;
  (document.getElementById("author") as HTMLInputElement).value =
    book.author.name;
  (document.getElementById("price") as HTMLInputElement).value =
    book.price.toString();
  (document.getElementById("genre") as HTMLSelectElement).value =
    book.genre.name;
  (document.getElementById("bookType") as HTMLSelectElement).value =
    book.type;
}