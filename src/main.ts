import type { Cita as CitaType } from "./types/Cita.ts";
import {v4 as uuidv4} from 'uuid';

//Selectores principales
const btnCita = document.querySelector('#btn-cita') as HTMLButtonElement | null;
const formCita = document.querySelector('#form-cita') as HTMLFormElement | null;
const fechaInput = document.querySelector('#fecha-cita') as HTMLInputElement | null;
const nombreInput = document.querySelector('#nombre') as HTMLInputElement | null;
const apellidosInput = document.querySelector('#apellidos') as HTMLInputElement | null;
const dniInput = document.querySelector('#dni') as HTMLInputElement | undefined;
const telefonoInput = document.querySelector('#telefono') as HTMLInputElement | null;
const nacimientoInput = document.querySelector('#fecha-nacimiento') as HTMLInputElement | null;
const observaciones = document.querySelector('#observaciones') as HTMLInputElement | null;
const submitForm = document.querySelector('#submit-form') as HTMLInputElement | null;
const btnCerrar = document.querySelector('#btn-cerrar') as HTMLButtonElement | null;
const modal = document.querySelector('#modal') as HTMLDivElement | null;
const modalAlerta = document.querySelector('#modal-alerta') as HTMLDivElement | null;
const confirmarBtn = document.querySelector('#confirmar-btn') as HTMLButtonElement | null;
const cancelarBtn = document.querySelector('#cancelar-btn') as HTMLButtonElement | null;
let camposForm = [fechaInput, nombreInput, apellidosInput, dniInput, telefonoInput, nacimientoInput] as (HTMLInputElement | null)[];
let validado: boolean = false;
const tbody = document.querySelector('#tbody') as HTMLTableSectionElement | null;



class Cita implements CitaType {

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

//Declarar que citas es un array de objetos - ternario para declarar que localstorage citas puede contener valores o no. En el caso de que los contenga aseguramos que esos valores existen, en el caso de que no, devolverá un arreglo vacío
let citas: object[] = localStorage.getItem('citas') ? JSON.parse(localStorage.getItem('citas')!) : [];



submitForm?.addEventListener('click', e => {
  e.preventDefault();

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

});

console.log(citas);