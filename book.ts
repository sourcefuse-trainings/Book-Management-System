import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Author from "./Author";

@Table
class Book extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @ForeignKey(() => Author)
  authorId!: number;

  @BelongsTo(() => Author)
  author!: Author;
}

export default Book;
