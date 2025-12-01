import type { Cita as CitaType } from "./types/Cita.ts";
import Cita from "./classes/Cita.ts";
import {
  btnCita, formCita, submitForm, btnCerrar, modal, cancelarBtn,
  camposForm, dniInput, dialog
} from "./selectores.ts";
import { instancia } from "./classes/Cita.ts";
import { openModal, closeModal } from "./funciones.ts";

// Capturar citas de localstorage y convertirlas a instancias de la clase Cita
export let citas: CitaType[] = localStorage.getItem('citas')
  ? JSON.parse(localStorage.getItem('citas')!).map((cita: CitaType) =>
    new Cita(
      cita.id, cita.fecha, cita.nombre, cita.apellidos,
      cita.dni, cita.telefono, cita.nacimiento, cita.observaciones
    )
  )
  : [];

// Mensaje de error debajo del submit
let errorMsg = document.createElement('p');
errorMsg.className = 'text-red-600 text-xl font-semibold mt-2 text-center';
submitForm?.insertAdjacentElement('afterend', errorMsg);

// Expresión regular simple para DNI (números + letra al final)
const dniPattern = /^\d{8}[A-Za-z]$/;

// validación del formulario
function validarFormulario(): boolean {
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

// Eventos del formulario y botones
submitForm?.addEventListener('click', e => {
  e.preventDefault();

  if (!validarFormulario()) return;

  if (submitForm?.value.toLowerCase() === 'crear') {
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

// Listar citas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => Cita.listarCitas());