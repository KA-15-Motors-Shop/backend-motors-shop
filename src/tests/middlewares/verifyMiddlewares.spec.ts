import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import User from "../../models/User";
import { Request, Response, NextFunction } from "express";
import DuplicateEmailMiddleware from "../../middlewares/duplicateEmail.middleware"
import request from "supertest"
import app from "../../app";

describe("Checks if an email already exists in the database", () => {
    let mockRequest: Partial<Request> = {};
    let mockResponse: Partial<Response> = {  json: jest.fn() };
    let mockNextFunction = jest.fn() as NextFunction;


    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
                console.error("Error during Data Source initialization", err);
            });

            const userRepository = AppDataSource.getRepository(User);

            const user = userRepository.create({
                name: "Taldo Teste",
                email: "taldo_teste@gmail.com",
                cpf: "12345678911",
                phone: "92 99292-9292",
                password: "123456",
                birth_date: "2022-01-21",
                description: "Este user não gosta de se descrever",
                account_type: "seller",
            })

            await userRepository.save(user)
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test("Should return an error for the duplicate email", async () => {
        const expectedResponse = { error: "Email already exists" }
        
        mockRequest = {
            body: {
                name: "Taldo Teste",
                email: "taldo_teste@gmail.com",
                cpf: "12345678911",
                phone: "92 99292-9292",
                password: "123456",
                birth_date: "2022-01-21",
                description: "Este user não gosta de se descrever",
                account_type: "seller",
            }
        };
        
        await DuplicateEmailMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            mockNextFunction
        );

        expect(mockResponse.statusCode).toBe(422);
        expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
        
    })


    test("Should return an ok for uuid", async () => {
        
        const response = await request(app).get("/users")
        const id = response.body[0].id
  
        const responseIdValido = await request(app).get(`/users/${id}`)

        expect(response.statusCode).toBe(200);
        expect(responseIdValido.statusCode).toBe(200);
    });
    

    test("Should return an error user not found", async () => {
        const expectedResponseUserNotFound = { error: "user not found" };

        const idInexistente = '143ff16a-558a-44ca-bfaa-62a30a97ccfe';
        const responseIdUserNotExist = await request(app).get(`/users/${idInexistente}`);
        
        expect(responseIdUserNotExist.statusCode).toBe(400);
        expect(responseIdUserNotExist.body).toEqual(expectedResponseUserNotFound);
    });
    

    test("Should return an error for invalid uuid", async () => {
        const expectedResponse = { error: "invalid id" };
        
        const idMenor = '143ff16a-558a-44ca-bfaa-62a30a97cc';
        const idMaior = '143ff16a-558a-44ca-bfaa-62a30a97ccfe8';

        const responseIdInvalidoMenor = await request(app).get(`/users/${idMenor}`)
        const responseIdInvalidoMaior = await request(app).get(`/users/${idMaior}`)

        expect(responseIdInvalidoMenor.statusCode).toBe(422);
        expect(responseIdInvalidoMenor.body).toEqual(expectedResponse);
        expect(responseIdInvalidoMaior.statusCode).toBe(422);
        expect(responseIdInvalidoMaior.body).toEqual(expectedResponse);
    });
})