
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import CreateUserService from "../../../services/users/userCreate.service";

describe("Create an user", () => {
    let connection:DataSource;

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

    test("Should insert the information of new user in the database", async () => {
        const name = "Taldo Teste";
        const email = "taldo_teste@gmail";
        const cpf = "123.456.789-11";
        const phone = "92 99292-9292";
        const password = "123456";
        const birth_date = "2022-01-21";
        const description = "Este user não gosta de se descrever";
        const account_type = "hello world";

        
        const userCreateService = new CreateUserService();
        const userData = { name, email, cpf, phone, password, birth_date, description, account_type };

        const newUser = await userCreateService.execute(userData);

        expect(newUser).toHaveProperty("name", "Taldo Teste");
        expect(newUser).toHaveProperty("created_at");
        expect(newUser).toHaveProperty("updated_at");
        expect(newUser).toHaveProperty("account_type", "buyer");
        expect(newUser).not.toHaveProperty("password", password);
    });
});