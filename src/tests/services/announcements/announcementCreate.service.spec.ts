/*import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import Announcement from "../../../models/Announcement";
import CreateAnnouncementService from "../../../services/announcements/announcementCreate.service";

describe("Create an announcement", () => {
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

    test("it must be possible to insert the advertisement in the database", () => {
        const announcement_type = "Taldo Teste";
        const title = "taldo_teste@gmail";
        const year = "123.456.789-11";
        const km = "92 99292-9292";
        const price = "123456";
        const vehicle_type = "2022-01-21";
        const description = "Este user não gosta de se descrever";
        const is_active = "hello world";

        
        const userCreateService = new CreateAnnouncementService();
        const userData = { type };

        const newUser = await userCreateService.execute(userData);

        expect(newUser).toHaveProperty("name", "Taldo Teste");
        expect(newUser).toHaveProperty("created_at");
        expect(newUser).toHaveProperty("updated_at");
        expect(newUser).toHaveProperty("account_type", "buyer");
        expect(newUser).not.toHaveProperty("password", password);
    })

});*/