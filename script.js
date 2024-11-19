// Base class for Book
class BaseBook {
    constructor(title, author, publicationYear, price) {
      this.title = title;
      this.author = author;
      this.publicationYear = publicationYear;
      this.price = price;
    }
  
    // Method to calculate the age of the book
    calculateAge() {
      const currentYear = new Date().getFullYear();
      return currentYear - this.publicationYear;
    }
  
    // Method to calculate the discount price
    calculateDiscountedPrice(discountPercentage) {
      return this.price - (this.price * discountPercentage) / 100;
    }
  }
  
  // Subclass for EBook
  class EBook extends BaseBook {
    constructor(title, author, publicationYear, price, fileSize, format) {
      super(title, author, publicationYear, price);
      this.fileSize = fileSize; // in MB
      this.format = format; // e.g., PDF, EPUB
    }
  
    // Overriding to provide additional details for EBook
    getDetails() {
      return `${this.title} by ${this.author}, Format: ${this.format}, File Size: ${this.fileSize}MB`;
    }
  }
  
  // Subclass for PrintedBook
  class PrintedBook extends BaseBook {
    constructor(title, author, publicationYear, price, weight, dimensions) {
      super(title, author, publicationYear, price);
      this.weight = weight; // in kg
      this.dimensions = dimensions; // e.g., '8.5x11'
    }
  
    // Overriding to provide additional details for PrintedBook
    getDetails() {
      return `${this.title} by ${this.author}, Weight: ${this.weight}kg, Dimensions: ${this.dimensions}`;
    }
  }
  
  // Example usage
  const ebook = new EBook("Digital Transformation", "John Doe", 2020, 15.99, 2, "PDF");
  const printedBook = new PrintedBook("Learn JavaScript", "Jane Smith", 2018, 25.99, 1.2, "8.5x11");
  
  console.log("EBook Details:");
  console.log(ebook.getDetails());
  console.log("Age of EBook:", ebook.calculateAge(), "years");
  console.log("Discounted Price of EBook:", ebook.calculateDiscountedPrice(10));
  
  console.log("\nPrinted Book Details:");
  console.log(printedBook.getDetails());
  console.log("Age of Printed Book:", printedBook.calculateAge(), "years");
  console.log("Discounted Price of Printed Book:", printedBook.calculateDiscountedPrice(15));
  