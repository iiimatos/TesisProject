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

export interface ILineaInvestigacion {
  id: number;
  carrera_id: ICarrera;
  linea: string;
  created_at: Date;
  updated_at: Date;
}
