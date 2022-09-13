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
  synchronize: false,
  logging: true,
  url: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false} : false,
  entities: process.env.NODE_ENV === "production" ? ["dist/src/models/*.js"] : ["src/models/*.ts"],
  migrations: process.env.NODE_ENV === "production" ? ["dist/src/migrations/*.js"] : ["src/migrations/*.ts"],
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
