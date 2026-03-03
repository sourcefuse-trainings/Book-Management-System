import { BookValidator } from "../utils/BookValidator";
import type { Book } from "../types/Book";

const validator = new BookValidator();

const validBook: Book = {
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