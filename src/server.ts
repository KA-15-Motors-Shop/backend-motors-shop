import { AppDataSource } from "./data-source";
import app from "./app";

const port = 3333;

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  app.listen(port, () => console.log(`Server running port: ${port}`));
})();
