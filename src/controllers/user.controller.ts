import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import User from "../models/User";
import CreateUserService from "../services/users/createUser.service";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export default class UserController {
    static async store(request: Request, response: Response) {
        const {
            name,
            email,
            cpf,
            phone,
            birth_date,
            description,
            password,
            account_type
        } = request.body

        const createUser = new CreateUserService()

        const user = await createUser.execute({
            name,
            email,
            cpf,
            phone,
            birth_date,
            description,
            password,
            account_type
        })

        return response.status(201).json(user)
    }   

    static async index(request: Request, response: Response) {
        const { id } = request.params

        const userRepository = AppDataSource.getRepository(User)

        const user = await userRepository.find({ where: { id: id }})

        return response.json(user)
    }

    static async show(request: Request, response: Response) {
        const userRepository = AppDataSource.getRepository(User)

        const user = await userRepository.find()

        return response.json(user)
    }

    static async delete(request: Request, response: Response) {
        const { id } = request.params

        const userRepository = AppDataSource.getRepository(User)

        const user = await userRepository.delete({ id: id })

        return response.status(204)
    }

    static async update(request: Request, response: Response) {
        const { id } = request.params
        const { name, password, cpf, phone, birth_date, description, account_type } = request.body

        const userRepository = AppDataSource.getRepository(User)

        const date = String(new Date)

        const hashedPassword = await bcrypt.hash(password, 10)

        const update = await userRepository.update(id, {
            name: name, 
            password: hashedPassword, 
            cpf: cpf, 
            phone: phone, 
            birth_date: birth_date, 
            description: description,
            account_type: account_type,
            updated_at: date
        })

        const user = await userRepository.find( { where: { id: id } } );

        return response.json(user)
    }

    static async login(request: Request, response: Response) {
        const { email, password } = request.body

        const userRepository = AppDataSource.getMongoRepository(User)

        const token = jwt.sign({ email: email}, "SECRET_KEY", { expiresIn: "24h" })

        return response.json({ token: token })
    }
}