import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "evidence",
  logging: false,
  entities: [__dirname + "/**/entity/**/*.ts"],
  migrations: [__dirname + "/**/migrations/**/*.ts"],
})