import { IUser } from 'src/app/@core/models/user.interface';
export interface ICarrera {
  id: number;
  carrera: string;
  codigoCarrera: string;
  created_at: Date;
  updated_at: Date;
}

export interface ITema {
  id: number;
  carrera_id: ICarrera;
  tema: string;
  created_at: Date;
  updated_at: Date;
}

export interface IAsesor {
  id: number;
  nombre: string;
  institucionLabora: string;
  nivelAcademico: string;
  correo: string;
  telefono: string;
  created_at: Date;
  updated_at: Date;
}

export interface ILineaInvestigacion {
  id: number;
  carrera_id: ICarrera;
  linea: string;
  created_at: Date;
  updated_at: Date;
}

export interface ISolitud {
  id: number;
  asesor_id: IAsesor;
  carrera_id: ICarrera;
  linea_investigacion: ILineaInvestigacion;
  tema_id: ITema;
  datosProyecto: string;
  usuario_id: Array<IUser>;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
}
