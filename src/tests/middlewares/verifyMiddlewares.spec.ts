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
})