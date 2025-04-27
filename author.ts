import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Book from "./Book";

@Table
class Author extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @HasMany(() => Book)
  books!: Book[];
}

export default Author;
