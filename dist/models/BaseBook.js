export class BaseBook {
    constructor(book) {
        this.title = book.title;
        this.isbn = book.isbn;
        this.publication_date = book.publication_date;
        this.genre = book.genre;
        this.price = book.price;
        this.author = book.author;
        this.type = book.type;
    }
    applyDiscount(percent) {
        return +(this.price * (1 - percent / 100)).toFixed(2);
    }
    calculateAge() {
        return new Date().getFullYear() - new Date(this.publication_date).getFullYear();
    }
}
