import {
  btnCita,
  formCita,
  fechaInput,
  nombreInput,
  apellidosInput,
  dniInput,
  telefonoInput,
  nacimientoInput,
  observaciones,
  submitForm,
  btnCerrar,
  modal,
  modalAlerta,
  confirmarBtn,
  cancelarBtn,
  camposForm,
  validado,
  tbody
} from "../selectores.ts";
import { listarCitas, citas } from "../main.ts";
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



  //Eliminar citas
  eliminarCita(): void {
    // Actualizar array citas
    const nuevasCitas = citas.filter((cita: CitaType) => cita.id !== this.id);

    citas.length = 0;
    citas.push(...nuevasCitas);

    // Actualizar LS
    localStorage.setItem('citas', JSON.stringify(citas));

    listarCitas();
  }
}