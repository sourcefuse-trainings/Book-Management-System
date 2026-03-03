export class BookManager {
    constructor(factory, validator, repository) {
        this.factory = factory;
        this.validator = validator;
        this.repository = repository;
        this.filtered = [];
    }
    getAllFiltered() {
        return this.filtered;
    }
    loadFromJSON(data) {
        data.forEach(book => {
            this.validator.validate(book);
            this.repository.add(this.factory.create(book));
        });
        this.filtered = [...this.repository.getAll()];
    }
    addBook(book, extra) {
        this.validator.validate(book);
        const newBook = this.factory.create(book, extra);
        this.repository.add(newBook);
        this.filtered = [...this.repository.getAll()];
    }
    update(index, book, extra) {
        const oldBook = this.filtered[index];
        if (!oldBook)
            return;
        const items = this.repository.getAll();
        const realIndex = items.indexOf(oldBook);
        if (realIndex === -1)
            return;
        this.validator.validate(book);
        const newBook = this.factory.create(book, extra);
        items[realIndex] = newBook;
        this.filtered = [...items];
    }
    deleteByIndex(index) {
        const book = this.filtered[index];
        if (!book)
            return;
        this.repository.remove(book);
        this.filtered = [...this.repository.getAll()];
    }
    search(query) {
        const q = query.trim().toLowerCase();
        this.filtered = q
            ? this.repository.getAll().filter(b => b.title.toLowerCase().includes(q) ||
                b.author.name.toLowerCase().includes(q) ||
                b.isbn.includes(q))
            : [...this.repository.getAll()];
    }
    sortByTitle() {
        this.filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    sortByAuthor() {
        this.filtered.sort((a, b) => a.author.name.localeCompare(b.author.name));
    }
    sortByDate() {
        this.filtered.sort((a, b) => new Date(a.publication_date).getTime() -
            new Date(b.publication_date).getTime());
    }
}
