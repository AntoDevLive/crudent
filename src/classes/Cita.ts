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
import { citas } from "../main.ts";
import type { Cita as CitaType } from "../types/Cita.ts";
import { v4 as uuidv4 } from 'uuid';
import { openModal, closeModal, mostrarToast, ocultarToast } from "../funciones.ts";

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


  // Crear citas (C)
  static crearCita() {
    let id = uuidv4();

    const cita = new Cita(
      id,
      fechaInput?.value ?? "",
      nombreInput?.value ?? "",
      apellidosInput?.value ?? "",
      dniInput?.value ?? "",
      telefonoInput?.value ?? "",
      nacimientoInput?.value ?? "",
      observaciones?.value ?? ""
    );

    citas.push(cita);

    localStorage.setItem('citas', JSON.stringify(citas));

    Cita.listarCitas();
    closeModal();
    mostrarToast('Cita creada correctamente');
    ocultarToast();
  }


  // Listar citas (R)
  static listarCitas() {

    if (!tbody) return;

    tbody.innerHTML = '';

    citas.forEach((cita: CitaType) => {
      const fila = document.createElement('tr');
      const idTd = document.createElement('td');
      const fechaTd = document.createElement('td');
      const dniTd = document.createElement('td');
      const nombreTd = document.createElement('td');
      const apellidosTd = document.createElement('td');
      const telefonoTd = document.createElement('td');
      const nacimientoTd = document.createElement('td');
      const observacionesTd = document.createElement('td');
      const accionesTd = document.createElement('td');
      const btnsAcciones = document.createElement('div');
      const btnEditar = document.createElement('button');
      const btnEliminar = document.createElement('button');

      idTd.textContent = cita.id;
      fechaTd.textContent = cita.fecha;
      dniTd.textContent = cita.dni;
      nombreTd.textContent = cita.nombre;
      apellidosTd.textContent = cita.apellidos;
      telefonoTd.textContent = cita.telefono;
      nacimientoTd.textContent = cita.nacimiento;
      observacionesTd.textContent = cita.observaciones;
      btnEditar.textContent = 'Editar';
      btnEditar.setAttribute('title', 'Editar Cita');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.setAttribute('title', 'Eliminar Cita');

      btnEliminar.onclick = () => cita.eliminarCita();
      btnEditar.onclick = () => cita.editarCita();

      btnsAcciones.append(btnEditar, btnEliminar);
      accionesTd.append(btnsAcciones);
      fila.append(idTd, fechaTd, dniTd, nombreTd, apellidosTd, telefonoTd, nacimientoTd, observacionesTd, accionesTd);
      tbody?.appendChild(fila);
    });

  };


  // Editar citas (U)
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
    Cita.listarCitas();
    closeModal();
    mostrarToast('Cita modificada correctamente');
    ocultarToast();
  }


  //Eliminar citas (D)
  eliminarCita(): void {
    // Actualizar array citas
    const nuevasCitas = citas.filter((cita: CitaType) => cita.id !== this.id);
    citas.length = 0;
    citas.push(...nuevasCitas);

    // Actualizar LS
    localStorage.setItem('citas', JSON.stringify(citas));

    Cita.listarCitas();
    mostrarToast('Cita eliminada correctamente');
    ocultarToast();
  }


}