import type { Cita as CitaType } from "./types/Cita.ts";
import Cita from "./classes/Cita.ts";
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
  tbody,
  dialog
} from "./selectores.ts";
import { instancia } from "./classes/Cita.ts";
import { openModal, closeModal } from "./funciones.ts";

let validado: boolean = false;


//capturar citas de localstorage y convertirlas a instancias de la clase Cita
export let citas: CitaType[] = localStorage.getItem('citas') ? JSON.parse(localStorage.getItem('citas')!).map((cita: CitaType) => new Cita(cita.id, cita.fecha, cita.nombre, cita.apellidos, cita.dni, cita.telefono, cita.nacimiento, cita.observaciones)) : [];



submitForm?.addEventListener('click', e => {
  e.preventDefault();

  if(submitForm?.value.toLowerCase() === 'crear') {
    Cita.crearCita();
  } else {
    Cita.actualizar(instancia);
  }

});


btnCita?.addEventListener('click', () => openModal('crear'));


formCita?.addEventListener('click', e => e.stopPropagation());
dialog?.addEventListener('click', e => e.stopPropagation());
modal?.addEventListener('click', closeModal);
cancelarBtn?.addEventListener('click', closeModal);
btnCerrar?.addEventListener('click', e => {
  e.preventDefault();
  closeModal();
});


document.addEventListener('DOMContentLoaded', () => Cita.listarCitas());