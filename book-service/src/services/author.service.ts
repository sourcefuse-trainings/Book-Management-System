import axios from 'axios';

export class AuthorService {
  static async getAuthorById(id: number) {
    const res = await axios.get(`http://localhost:3001/authors/${id}`);
    return res.data;
  }
}
