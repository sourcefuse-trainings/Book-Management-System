import { BookValidator } from "../utils/BookValidator";

test("should throw error if title missing", () => {

  const validator = new BookValidator();

  expect(() =>
    validator.validate({
      title: "",
      author: { id: "1", name: "Author" },
      isbn: "123",
      publication_date: "2024-01-01",
      genre: { id: "1", name: "Fiction" },
      price: 100,
      type: "Printed"
    })
  ).toThrow();

});