import type { Cita as CitaType } from "./types/Cita.ts";
import Cita from "./classes/Cita.ts";
import { btnCita, formCita, submitForm, btnCerrar, modal, cancelarBtn, fechaInput, nacimientoInput, dialog } from "./selectores.ts";
import { instancia } from "./classes/Cita.ts";
import { openModal, closeModal, validarFormulario, getFechaActual, getFechaActualFormatoLocal } from "./funciones.ts";

// Capturar citas de localstorage y convertirlas a instancias de la clase Cita
export let citas: CitaType[] = localStorage.getItem('citas')
  ? JSON.parse(localStorage.getItem('citas')!).map((cita: CitaType) =>
    new Cita(
      cita.id, cita.fecha, cita.nombre, cita.apellidos,
      cita.dni, cita.telefono, cita.nacimiento, cita.observaciones
    )
  )
  : [];


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
document.addEventListener('DOMContentLoaded', () => {
  Cita.listarCitas();

  // 1. Impedir elegir fechas anteriores para la cita
  if (fechaInput) {
    const fechaMinima = getFechaActualFormatoLocal();
    fechaInput.min = fechaMinima;

    // Validación en tiempo real
    fechaInput.addEventListener("input", () => {
      if (fechaInput!.value < fechaInput!.min) {
        fechaInput!.value = fechaInput!.min;
      }
    });
  }

  // 2. Impedir fechas de nacimiento posteriores a hoy
  if (nacimientoInput) {
    const hoy = getFechaActual();
    nacimientoInput.max = hoy;

    nacimientoInput.addEventListener("input", () => {
      if (nacimientoInput!.value > hoy) {
        nacimientoInput!.value = hoy;
      }
    });
  }
});