import { ICarrera } from './carrera.interface';
export interface IUser {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  role: Array<IRole>;
  blocked: boolean;
  carrera_id: ICarrera;
}

export interface IMeData {
  status: boolean;
  message?: string;
  user?: IUser;
}

interface IRole {
  description: string;
  id: number;
  name: string;
  type: string;
}

export interface ILoginUser {
  identifier: string;
  password: string;
}

export interface IMeData {}
