export interface IUser{
    id:string;
    nombre:string;
    apellido:string;
    username:string;
    email:string;
    password:string;
    matricula:string;
}

export interface ILoginUser {
    identifier:string;
    password:string;
}