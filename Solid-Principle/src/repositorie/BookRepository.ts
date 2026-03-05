import { GenericRepository } from "./GenericRepository.js";
import type { BaseBook } from "../models/BaseBook.js";
import type { IBookRepository } from "../interfaces/IBookRepository.js";

export class BookRepository
  extends GenericRepository<BaseBook>
  implements IBookRepository {

}