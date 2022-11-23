export interface IUserCreate {
  name: string;
  email: string;
  cpf: string;
  tel: string;
  birth_date: string;
  description: string;
  password: string;
  is_seller: boolean;
  address: IAddress;
  created_at: Date;
  update_at: Date;
}

export interface IAddress {
  id: string;
  cep: string;
  state: string;
  street: string;
  city: string;
  number: number;
  complement: string;
}

export interface UserUp {
  id: string;
  name: string;
  email: string;
  cpf: string;
  tel: string;
  birth_date: string;
  description: string;
  password: string;
  is_seller: boolean;
}

export interface AddressUp {
  user_id: string;
  cep: string;
  state: string;
  street: string;
  city: string;
  number: number;
  complement: string;
}

export interface UserSafeDelete {
  id: string;
  is_enabled: boolean;
}

export enum AnnouncementType {
  VENDA = 'Venda',
  LEILAO = 'Leilao',
}

export interface IVehicleCreate {
  // url_image: string;
  // type_of_ad: AnnouncementType;
  // comment: Icomments;
  title: string;
  year: string;
  km: number;
  price: number;
  description: string;
  type_of_vehicle: string;
  type_of_ad: string;
  is_published: boolean;
  // user_id: string;
}

export interface Icomments {
  id: string;
  text: string;
  announcement_id: string;
  owner: string;
}

// export interface IVehicle {
//   id: string;
//   user_id: string;
//   name: string;
//   price: number;
//   description: string;
//   mileage: number;
//   year: number;
//   type: VehicleType;
//   url_image: string;
//   is_published: boolean;
//   created_at: Date;
//   updated_at: Date;
// }

export interface IVehicleUpdate {
  price: number;
  description: string;
  mileage: number;
  year: number;
  is_published: boolean;
  url_image: string;
}
