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
  tbody
} from "../selectores.ts";
import { listarCitas, citas, openModal, closeModal } from "../main.ts";
import type { Cita as CitaType } from "../types/Cita.ts";

export let instancia: Cita | null = null;

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


  // Editar citas
  editarCita() {
    console.log('editando', this.id);
    openModal('editando');
    instancia = this;

    fechaInput!.value = instancia.fecha;
    nombreInput!.value = instancia.nombre;
    apellidosInput!.value = instancia.apellidos;
    dniInput!.value = instancia.dni;
    telefonoInput!.value = instancia.telefono;
    nacimientoInput!.value = instancia.nacimiento;
    observaciones!.value = instancia.observaciones;
  }

  static actualizar(instancia: Cita | null): void {

    if (!instancia) return;
    
    instancia.fecha = fechaInput!.value;
    instancia.dni = dniInput!.value;
    instancia.nombre = nombreInput!.value;
    instancia.apellidos = apellidosInput!.value;
    instancia.telefono = telefonoInput!.value;
    instancia.nacimiento = nacimientoInput!.value;
    instancia.observaciones = observaciones!.value;

    localStorage.setItem('citas', JSON.stringify(citas));
    listarCitas();
    closeModal();
  }

}