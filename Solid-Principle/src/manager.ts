import { BookRepository } from "./repositorie/BookRepository.js";
import { BookValidator } from "./utils/BookValidator.js";
import { ApiService } from "./services/ApiService.js";
import { BookManager } from "./services/BookManager.js";

const repository = new BookRepository();
const validator = new BookValidator();
const apiService = new ApiService();

export const manager = new BookManager(
  {} as any,
  validator,
  repository,
  apiService
);