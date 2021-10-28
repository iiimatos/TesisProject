import { ICarrera } from './carrera.interface';
export interface IUser {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  role: IRole;
  blocked: boolean;
  carrera_id: ICarrera;
  asigando: boolean;
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

export interface IUser2 {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  role: number;
  blocked: boolean;
  carrera_id: number;
}
