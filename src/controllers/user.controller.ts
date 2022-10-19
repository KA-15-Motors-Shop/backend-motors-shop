import { Request, Response } from 'express';
import CreateUserService from '../services/users/userCreate.service';
import UserListService from '../services/users/userList.service';
import UserFilterService from '../services/users/userFilter.service';
import UserDeleteService from '../services/users/userDelete.service';
import UserUpdateService from '../services/users/userUpdate.service';

export default class UserController {
  static async store(request: Request, response: Response) {
    // console.log(request.body)
    const {
      name,
      email,
      cpf,
      phone,
      birth_date,
      description,
      password,
      account_type,
      zipcode,
      street,
      detail,
      state,
      city,
      additional,
    } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      cpf,
      phone,
      birth_date,
      description,
      password,
      account_type,
      zipcode,
      street,
      detail,
      state,
      city,
      additional,
    });

    return response.status(201).json(user);
  }

  static async index(request: Request, response: Response) {
    const { id } = request.params;

    const userFindService = new UserFilterService();

    const user = await userFindService.execute(id);

    if (user === 'error') {
      return response.status(400).json({ error: 'user not found' });
    }

    return response.status(200).json(user);
  }

  static async show(request: Request, response: Response) {
    const userListService = new UserListService();

    const user = await userListService.execute();

    return response.json(user);
  }

  static async delete(request: Request, response: Response) {
    const { id } = request.params;

    const userDeleteService = new UserDeleteService();

    const user = await userDeleteService.execute(id);

    if (user == 'error') {
      return response.status(400).json({ error: 'user not found' });
    }

    return response.status(204).json();
  }

  static async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      name,
      email,
      password,
      cpf,
      phone,
      birth_date,
      description,
      account_type,
    } = request.body;

    const userUpdateService = new UserUpdateService();

    const user = await userUpdateService.execute({
      id,
      name,
      email,
      password,
      cpf,
      phone,
      birth_date,
      description,
      account_type,
    });

    if (user == 'user not found') {
      return response.status(400).json({ error: 'user not found' });
    }

    return response.json(user);
  }
}
