import { IAddressCreate } from '../addresses';

export interface IUserCreate {
  name: string;
  email: string;
  cpf: string;
  cel: string;
  birth_date: string;
  description: string;
  address: IAddressCreate;
  account_type: string;
  password: string;
}

export interface IUserID {
  user_id: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  cel?: string;
  birth_date?: string;
  description?: string;
  password?: string;
}
