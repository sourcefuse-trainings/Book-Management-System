import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';

import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';

import {Book} from '../models';
import {BookRepository} from '../repositories';
import {BookEventService} from '../services/book-event.service';
import {BookDetailsService} from '../services/book-details.service';
import {LoggerObserver} from '../observers/logger.observer';
import {AuditObserver} from '../observers/audit.observer';

export class BookController {
  private bookeventservice: BookEventService;

  constructor(
    @repository(BookRepository)
    public bookRepository: BookRepository,
  ) {
    this.bookeventservice = new BookEventService();

    this.bookeventservice.subscribe(new LoggerObserver());
    this.bookeventservice.subscribe(new AuditObserver());
  }

  @post('/books')
  @response(200, {
    description: 'Book model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Book),
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {
            title: 'NewBook',
            exclude: ['id'],
          }),
        },
      },
    })
    book: Omit<Book, 'id'>,
  ): Promise<Book> {
    const createdBook = await this.bookRepository.create(book);

    console.log('POST HIT');

    this.bookeventservice.notify(
      `Book Added Successfully: ${createdBook.title}`,
    );

    return createdBook;
  }

  @get('/books/count')
  @response(200, {
    description: 'Book model count',
    content: {
      'application/json': {
        schema: CountSchema,
      },
    },
  })
  async count(@param.where(Book) where?: Where<Book>): Promise<Count> {
    this.bookeventservice.notify(`All Books Fetched Successfully!`);
    return this.bookRepository.count(where);
  }

  @get('/books')
  @response(200, {
    description: 'Array of Book model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Book),
        },
      },
    },
  })
  async find(@param.filter(Book) filter?: Filter<Book>): Promise<Book[]> {
    const books = await this.bookRepository.find(filter);

    this.bookeventservice.notify(`Fetched ${books.length} books`);

    return books;
  }

  @get('/books/{id}/details')
  async getBookDetails(@param.path.number('id') id: number): Promise<any> {
    const book = await this.bookRepository.findById(id);

    return BookDetailsService.getBookDetails(book);
  }

  @get('/books/{id}')
  @response(200, {
    description: 'Book model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Book),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Book, {exclude: 'where'})
    filter?: FilterExcludingWhere<Book>,
  ): Promise<Book> {
    const book = await this.bookRepository.findById(id, filter);

    this.bookeventservice.notify(`Fetched book ID: ${id}`);

    return book;
  }

  @patch('/books')
  @response(200, {
    description: 'Book PATCH success count',
    content: {
      'application/json': {
        schema: CountSchema,
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {partial: true}),
        },
      },
    })
    book: Book,
    @param.where(Book) where?: Where<Book>,
  ): Promise<Count> {
    const count = await this.bookRepository.updateAll(book, where);

    this.bookeventservice.notify(`Updated ${count.count} book(s)`);

    return count;
  }

  @patch('/books/{id}')
  @response(204, {
    description: 'Book PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {partial: true}),
        },
      },
    })
    book: Book,
  ): Promise<void> {
    await this.bookRepository.updateById(id, book);

    this.bookeventservice.notify(`Book Updated ID: ${id}`);
  }

  @put('/books/{id}')
  @response(204, {
    description: 'Book PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() book: Book,
  ): Promise<void> {
    await this.bookRepository.replaceById(id, book);

    this.bookeventservice.notify(`Book Replaced ID: ${id}`);
  }

  @del('/books/{id}')
  @response(204, {
    description: 'Book DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bookRepository.deleteById(id);

    this.bookeventservice.notify(`Book Deleted ID: ${id}`);
  }
}
