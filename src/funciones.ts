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
import { citas, openModal, closeModal } from "./main.ts";
import type { Cita as CitaType } from "./types/Cita.ts";
import Cita from "./classes/Cita.ts";

