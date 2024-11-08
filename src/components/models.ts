
export interface User {
  user: string;
  password: string;
}
export interface Equipo {
  nombre: string;
  descripcion: string;
  chapa: string;
  operarios: string[];
  consumo: string;
  horasTrabajo: number;
  mantenimiento: Date;
  estado: string;

}
export interface Usuario{
  username: string;
  name: string;
  lastName: string;
  roles: string[];
  status: string;
}
