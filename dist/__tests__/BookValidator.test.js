import { BookValidator } from "../utils/BookValidator";
const validator = new BookValidator();
const validBook = {
    title: "Test Book",
    isbn: "123456",
    publication_date: "2020-01-01",
    price: 100,
    type: "Printed",
    author: { id: "1", name: "John" },
    genre: { id: "1", name: "Tech" }
};
describe("BookValidator", () => {
    test("should validate correct book", () => {
        expect(() => validator.validate(validBook)).not.toThrow();
    });
});
