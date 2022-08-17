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

        if (user == "Email Already Exists") {
            return response.status(409).json({
                error: "Email Already Exists"
            })
        }

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

        return response.status(204).json()
    }

    static async update(request: Request, response: Response) {
        const { id } = request.params
        const { name, email, password, cpf, phone, birth_date, description, account_type } = request.body

        const userRepository = AppDataSource.getRepository(User)

        const date = new Date()

        const hashedPassword = await bcrypt.hash(password, 10)
        console.log("hashed password:", hashedPassword)
    

        const oldUser = await userRepository.find( { where: { id: id } } );

        const newUser = {
            name: name || oldUser[0].name,
            email: email || oldUser[0].email,
            cpf: cpf || oldUser[0].cpf,
            phone: phone || oldUser[0].phone,
            birth_date: birth_date || oldUser[0].birth_date,
            description: description || oldUser[0].description,
            account_type: account_type || oldUser[0].account_type,
            password: password? (hashedPassword) : (oldUser[0].password),
            //password: password? hashedPassword || oldUser[0].password
            updated_at: date
        }
        console.log("old user:", oldUser)
        console.log("new user:", newUser)

        const update = await userRepository.update( id, newUser)


        const user = await userRepository.find( { where: { id: id } } );
        console.log("updated user:", user)

        return response.json(user)
    }

    static async login(request: Request, response: Response) {
        const { email, password } = request.body

        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find()

        if ( email == undefined) {
            return response.status(409).json({ error: "missing email"})
        }

        const account = users.find((user) => user.email === email)

        if ( password == undefined) {
            return response.status(409).json({ error: "missing password"})
        }
        if ( !account || !bcrypt.compareSync(password, account.password) ) {
            return response.status(409).json({ error: "Wrong email/password"});
          }

        const token = jwt.sign({ email: email}, "SECRET_KEY", { expiresIn: "24h" })

        return response.json({ token: token })
    }
}