import axios from 'axios';

export class CategoryService {
  static async getCategoryById(id: number) {
    const res = await axios.get(`http://localhost:3002/categories/${id}`);
    return res.data;
  }
}
