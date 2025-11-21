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
  validado,
  tbody
} from "./selectores.ts";
import {v4 as uuidv4} from 'uuid';


//Declarar que citas es un array de objetos - ternario para declarar que localstorage citas puede contener valores o no. En el caso de que los contenga aseguramos que esos valores existen, en el caso de que no, devolverá un arreglo vacío
let citas: CitaType[] = localStorage.getItem('citas') ? JSON.parse(localStorage.getItem('citas')!) : [];



submitForm?.addEventListener('click', e => {
  e.preventDefault();
  crearCita()
});

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
}


function listarCitas() {

  if(!tbody) return;

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

    btnsAcciones.append(btnEditar, btnEliminar);
    accionesTd.append(btnsAcciones);
    fila.append(idTd, fechaTd, dniTd, nombreTd, apellidosTd, telefonoTd, nacimientoTd, observacionesTd, accionesTd);
    tbody.appendChild(fila);
  });

};


document.addEventListener('DOMContentLoaded', listarCitas);