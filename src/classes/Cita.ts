import type { Cita as CitaType } from "../types/Cita.ts";

export default class Cita implements CitaType {

  id: string;
  fecha: string;
  nombre: string;
  apellidos: string;
  dni: string;
  telefono: string;
  nacimiento: string;
  observaciones: string;

  constructor(
    id: string,
    fecha: string,
    nombre: string,
    apellidos: string,
    dni: string,
    telefono: string,
    nacimiento: string,
    observaciones: string
  ) {
    this.id = id;
    this.fecha = fecha;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.dni = dni;
    this.telefono = telefono;
    this.nacimiento = nacimiento;
    this.observaciones = observaciones;
  }
}