import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import CreateAnnouncementService from "../../../services/announcements/announcementCreate.service";

describe("Testing the announcement roues", () => {
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
  let id: string;

  test("Should be able to create a new announcement", async () => {
    const announcement_type = "Venda";
    const title = "Opala";
    const year = "2020";
    const km = 50000;
    const price = 50000;
    const vehicle_type = "Carro";
    const description = "carro classico e muito bonito";
    const is_active = true;

    const announcementData = {
      announcement_type,
      title,
      year,
      km,
      price,
      vehicle_type,
      description,
      is_active,
    };

    const response = await request(app)
      .post("/announcements")
      .send(announcementData);
    id = response.body.id;
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "announcement_type",
      announcement_type
    );
    expect(response.body).toHaveProperty("title", title);
    expect(response.body).toHaveProperty("year", year);
    expect(response.body).toHaveProperty("km", km);
    expect(response.body).toHaveProperty("price", price);
    expect(response.body).toHaveProperty("vehicle_type", vehicle_type);
    expect(response.body).toHaveProperty("description", description);
    expect(response.body).toHaveProperty("is_active", is_active);
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
  });

  test("must list all announcements", async () => {
    const response = await request(app).get("/announcements");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("should be able to updated the announcements", async () => {
    const title = "Opala";
    const year = "2020";
    const km = 60000;
    const price = 40000;

    const announcementData = { title, year, km, price };

    const response = await request(app)
      .patch(`/announcements/${id}`)
      .send(announcementData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", id);
    expect(response.body).toHaveProperty("announcement_type");
    expect(response.body).toHaveProperty("title", title);
    expect(response.body).toHaveProperty("year", year);
    expect(response.body).toHaveProperty("km", km);
    expect(response.body).toHaveProperty("price", price);
    expect(response.body).toHaveProperty("vehicle_type");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("is_active", true);
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
  });

  test("should be able to deactivate the announcement", async () => {
    const is_active = false;

    const response = await request(app)
      .patch(`/announcements/${id}`)
      .send({ is_active });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", id);
    expect(response.body).toHaveProperty("announcement_type");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("year");
    expect(response.body).toHaveProperty("km");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("vehicle_type");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("is_active", false);
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
  });

  /*
  test("should be able to delete the user", async () => {
    const response = await request(app).delete(`/users/${id}`);
    const verifyUser = await request(app).get(`/users/${id}`)

    expect(response.status).toBe(204);
    expect(verifyUser.status).toBe(400);
  });*/
});
