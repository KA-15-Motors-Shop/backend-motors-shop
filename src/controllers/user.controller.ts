import { Request, Response } from 'express';
import CreateUserService from '../services/users/userCreate.service';
import UserListService from '../services/users/userList.service';
import UserFilterService from '../services/users/userFilter.service';
import UserDeleteService from '../services/users/userDelete.service';
import UserUpdateService from '../services/users/userUpdate.service';
import updateUserService from '../services/users/userUpdate.service';
import { instanceToPlain } from 'class-transformer';
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
      number,
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
      number,
    });

    return response.status(201).json(user);
  }

  static async index(request: Request, response: Response) {
    const { user_id } = request.params;

    const userFindService = new UserFilterService();

    const user = await userFindService.execute(user_id);

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

  static async update(req: Request, res: Response) {
    const { user_id } = req.params;
    const { name, email, cel, birth_date, description, password, street } =
      req.body;

    const userUpdated = await updateUserService(user_id, {
      name,
      email,
      cel,
      birth_date,
      description,
      password,
    });

    return res.status(200).json(instanceToPlain(userUpdated));
  }
}
