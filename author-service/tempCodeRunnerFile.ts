class BookService{
  private books=[
    {
      id:1,name:"clean code",
    },
    {
      id:2,name:"The Art of living",
    },
    {
      id:3,name:"The complexity of an algorithm",
    }
  ];

  getBooks(){
    return this.books;
  }

  addbook(book:{id:number,name:string}){
    this.books.push(book);
    return book;
  }

  updatebook(id:number,data:{name?:string}){
    const index:number = this.books.findIndex(book=>book.id===id);
    if(index===-1){
      console.log("book not found");
      return;
    }
    this.books[index]={...this.books[index],...data};
    return this.books[index];
  }


  deletebook(id:number){
    const index:number = this.books.findIndex(book=>book.id===id);
    if(index===-1){
      console.log("book not found");
      return;
    }
    const deletedbook = this.books[index];
    this.books.splice(index,1);
    return deletedbook;
  }
}

import {Provider} from "@loopback/core";

class BookServiceProvider implements Provider<BookService>{
  value():BookService{
    return new BookService;
  }
}

class BookController{
  constructor(@inject("services.BookService")
  private bookservice:BookService){}

  getBooks(){
    return this.bookservice.getBooks();
  }

  addbook(){
    return this.bookservice.addbook(
      {
        id:4,name:"Software development and product management",
      }
    );
  }

  updatebook(){
    return this.bookservice.updatebook(3,
      {
        name:"Advanced Data Structure",
      }
    );
  }

  deletebook(id:number){
    return this.bookservice.deletebook(id);
  }
}

const serviceprovider = new BookServiceProvider();
const bookservice = serviceprovider.value();
const controller = new BookController(bookservice as unknown as BookService);

console.log(controller.getBooks());
console.log(controller.addbook());
console.log(controller.getBooks());
console.log(controller.updatebook());
console.log(controller.deletebook(1));
