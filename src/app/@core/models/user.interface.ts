export interface IUser {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  role: Array<IRole>;
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
