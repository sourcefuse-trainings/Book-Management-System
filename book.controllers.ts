import {
    Count,
    CountSchema,
    Filter,
    FilterExcludingWhere,
    repository,
    Where,
  } from '@loopback/repository';
  import {post, param, get, getModelSchemaRef, patch, put, del, requestBody} from '@loopback/rest';
  import {Book} from '../models';
  import {BookRepository} from '../repositories';
  
  export class BookController {
    constructor(
      @repository(BookRepository)
      public bookRepository : BookRepository,
    ) {}
  
    @post('/books', {
      responses: {
        '200': {
          description: 'Book model instance',
          content: {'application/json': {schema: getModelSchemaRef(Book)}},
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
      return this.bookRepository.create(book);
    }
  
    // Other CRUD methods (GET, PATCH, DELETE) are generated.
  }
  