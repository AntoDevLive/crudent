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
let validado: boolean = false;


// Handle toast //
export function mostrarToast(msg: string): void {
  toast?.classList.remove('opacity-0', '-translate-x-full');
  toast!.textContent = msg;
}

export function ocultarToast(): void {
  setTimeout(() => {
    toast?.classList.add('opacity-0', '-translate-x-full');
  }, 2300);
}


// Handle modal
export function openModal(action: string) {

  if (action === 'editando') {
    submitForm!.value = 'Editar';
  } else {
    submitForm!.value = 'Crear';
  }

  modal?.classList.remove('hidden');
}

export function closeModal() {
  modal?.classList.add('hidden');
  formCita?.reset();
}