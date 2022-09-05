import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";

describe("Testing the user roues", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a new user", async () => {
    const name: string = "Taldo Teste";
    const email: string = "taldo_teste@gmail";
    const cpf: string = "12345678911";
    const phone: string = "92 99292-9292";
    const password: string = "123456";
    const birth_date: string = "2022-01-21";
    const description: string = "Este user não gosta de se descrever";
    const account_type: string = "seller";

    const userData = {
      name,
      email,
      cpf,
      phone,
      password,
      birth_date,
      description,
      account_type,
    };

    const response = await request(app).post("/users").send(userData)

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "Taldo Teste");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.body).toHaveProperty("account_type", account_type);
    expect(response.body).not.toHaveProperty("password", password);
    });

    test("must list all users", async () => {
        const response = await request(app).get("/users")
        console.log("usuarios:", response.body)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("map");
    })
});
