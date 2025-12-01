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
  toast
} from "./selectores.ts";
import { citas, openModal, closeModal } from "./main.ts";
import type { Cita as CitaType } from "./types/Cita.ts";
import Cita from "./classes/Cita.ts";


//Handle toast
export function mostrarToast(msg: string) {
  toast?.classList.remove('opacity-0');
  toast?.classList.remove('-translate-x-full');
  toast!.textContent = msg;
}

export function ocultarToast() {
  toast?.classList.add('opacity-0');
  toast?.classList.add('-translate-x-full');
}