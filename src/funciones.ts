import { formCita, submitForm, modal, toast, dialog, camposForm, dniInput, dniPattern, errorMsg } from "./selectores.ts";

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


// Handle modal
export function openModal(action: string) {

  if (action.toLowerCase() === 'editando') {
    submitForm!.value = 'Editar';
  } else if (action.toLowerCase() === 'crear') {
    submitForm!.value = 'Crear';
  } else {
    formCita?.classList.add('hidden');
    dialog?.classList.remove('hidden')
  }

  modal?.classList.remove('hidden');
}


export function closeModal() {
  modal?.classList.add('hidden');
  formCita?.classList.remove('hidden');
  dialog?.classList.add('hidden');
  formCita?.reset();
}


// validación del formulario
errorMsg.className = 'text-red-600 text-xl font-semibold mt-2 text-center';
submitForm?.insertAdjacentElement('afterend', errorMsg);

export function validarFormulario(): boolean {
  let valido = true;
  errorMsg.textContent = '';

  camposForm.forEach(input => {
    if (!input) return;

    // Resetear bordes
    input.classList.remove('border-2', 'border-red-500', 'border-yellow-600');

    // Validar vacío
    if (input.value.trim() === '') {
      input.classList.add('border-2!', 'border-red-500!');
      valido = false;
    }

    // Validar DNI
    if (input === dniInput && input.value.trim() !== '' && !dniPattern.test(input.value.trim())) {
      errorMsg.textContent = 'El DNI no es válido';
      valido = false;
    }
  });

  if (!valido && errorMsg.textContent === '') {
    errorMsg.textContent = 'Los campos señalados son obligatorios';
  }

  return valido;
}

// Quitar borde y mensaje cuando el usuario escribe
camposForm.forEach(input => {
  if (!input) return;
  input.addEventListener('input', () => {
    input.classList.remove('border-2!', 'border-red-500!');
    errorMsg.textContent = '';
  });
});


// Función para obtener fecha/hora actual en formato válido para datetime-local
export function getFechaActualFormatoLocal(): string {
  const ahora = new Date();
  const year = ahora.getFullYear();
  const month = String(ahora.getMonth() + 1).padStart(2, "0");
  const day = String(ahora.getDate()).padStart(2, "0");
  const hour = String(ahora.getHours()).padStart(2, "0");
  const minute = String(ahora.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hour}:${minute}`;
}

// Función para obtener fecha actual en formato yyyy-mm-dd
export function getFechaActual(): string {
  const ahora = new Date();
  const year = ahora.getFullYear();
  const month = String(ahora.getMonth() + 1).padStart(2, "0");
  const day = String(ahora.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}