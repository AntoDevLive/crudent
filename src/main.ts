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
  tbody
} from "./selectores.ts";
import {v4 as uuidv4} from 'uuid';
import { instancia } from "./classes/Cita.ts";

let validado: boolean = false;


//capturar citas de localstorage y convertirlas a instancias de la clase Cita
export let citas: CitaType[] = localStorage.getItem('citas') ? JSON.parse(localStorage.getItem('citas')!).map((cita: CitaType) => new Cita(cita.id, cita.fecha, cita.nombre, cita.apellidos, cita.dni, cita.telefono, cita.nacimiento, cita.observaciones)) : [];



submitForm?.addEventListener('click', e => {
  e.preventDefault();

  if(submitForm?.value.toLowerCase() === 'crear') {
    crearCita();
  } else {
    Cita.actualizar(instancia);
  }

});


btnCita?.addEventListener('click', () => openModal('crear'));

export function openModal(action: string) {

  if(action === 'editando') {
    submitForm!.value = 'Editar';
  } else {
    submitForm!.value = 'Crear';
  }
  
  modal?.classList.remove('hidden');
}


formCita?.addEventListener('click', e => e.stopPropagation());
modal?.addEventListener('click', closeModal);
btnCerrar?.addEventListener('click', e => {
  e.preventDefault();
  closeModal();
});



export function closeModal() {
  modal?.classList.add('hidden');
  formCita?.reset();
}


function crearCita() {
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
}



document.addEventListener('DOMContentLoaded', () => Cita.listarCitas());