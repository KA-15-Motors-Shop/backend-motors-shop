import { DataSource } from "typeorm"
import "dotenv/config"

export const AppDataSource = 
  process.env.NODE_ENV === "test" ?
  new DataSource({
    type: "sqlite",
    database: ":memory:",
    entities: ["src/models/**/*.ts"],
    synchronize: true
  }) : 
  new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: ["src/models/*.ts"],
  migrations: ["src/migrations/*.ts"],
})

/*
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })
  */
