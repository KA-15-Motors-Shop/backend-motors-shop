import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import CreateAnnouncementService from "../../../services/announcements/announcementCreate.service"

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

    test("Should insert the information of new announcement in the database", async () => {
        const announcement_type ="Venda";
        const title = "Opala";
        const year = "2020";
        const km = 50000;
        const price = 50000;
        const vehicle_type = "Carro";
        const description = "carro classico e muito bonito";
        const is_active = true;
    

        
        const announcementCreateService = new CreateAnnouncementService();
        const announcementData = {  announcement_type, title, year, km, price, vehicle_type, description, is_active };

        const newAnnouncement = await announcementCreateService.execute(announcementData);

        expect(newAnnouncement).toHaveProperty("announcement_type", announcement_type);
        expect(newAnnouncement).toHaveProperty("title", title);
        expect(newAnnouncement).toHaveProperty("year", year);
        expect(newAnnouncement).toHaveProperty("km", km);
        expect(newAnnouncement).toHaveProperty("price", price);
        expect(newAnnouncement).toHaveProperty("vehicle_type", vehicle_type);
        expect(newAnnouncement).toHaveProperty("description", description);
        expect(newAnnouncement).toHaveProperty("is_active", is_active);
    });
});