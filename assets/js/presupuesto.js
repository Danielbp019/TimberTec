// Presupuesto.js

// Función genérica para validar y calcular el presupuesto
function calcularPresupuesto(idInput, idTabla, porcentajes) {
  const dineroInput = document.getElementById(idInput);
  const dinero = parseFloat(dineroInput.value);

  // Verificar si el valor ingresado es un número válido
  if (isNaN(dinero) || dinero <= 0) {
    alert("Por favor ingrese una cantidad válida de dinero.");
    return;
  }

  // Iterar sobre cada componente y calcular el gasto
  porcentajes.forEach((porcentaje, index) => {
    const gasto = Math.round((dinero * porcentaje) / 100);
    const resultadoCelda = document.querySelectorAll(`#${idTabla} tbody tr`)[index].cells[2];
    resultadoCelda.textContent = "$" + gasto;
  });
}

// Función para validar y calcular "Hasta 1000"
function validarYCalcularHasta1000() {
  const form = document.getElementById("formHasta1000");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  form.classList.add("was-validated");
  calcularPresupuesto("dineroHasta1000", "hasta1000", [45, 14, 13, 8, 6, 6, 5, 3]);
}

// Función para validar y calcular "Entre 1000 y 1500"
function validarYCalcularEntre1000y1500() {
  const form = document.getElementById("formEntre1000y1500");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  form.classList.add("was-validated");
  calcularPresupuesto("dineroEntre1000y1500", "entre1000y1500", [46, 14, 11, 7, 6, 6, 7, 3]);
}

// Función para validar y calcular "Entre 1500 y 2000"
function validarYCalcularEntre1500y2000() {
  const form = document.getElementById("formEntre1500y2000");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  form.classList.add("was-validated");
  calcularPresupuesto("dineroEntre1500y2000", "entre1500y2000", [48, 14, 10, 7, 6, 6, 6, 3]);
}

// Función para validar y calcular "Entre 2000 y 3000"
function validarYCalcularEntre2000y3000() {
  const form = document.getElementById("formEntre2000y3000");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  form.classList.add("was-validated");
  calcularPresupuesto("dineroEntre2000y3000", "entre2000y3000", [50, 13, 9, 7, 6, 6, 6, 3]);
}

// Función para validar y calcular "CSGO/Fortnite/Valorant"
function validarYCalcularCsgofortnitevalorant() {
  const form = document.getElementById("formCsgofortnitevalorant");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  form.classList.add("was-validated");
  calcularPresupuesto("dineroCsgofortnitevalorant", "csgofortnitevalorant", [33, 23, 12, 7, 6, 6, 9, 4]);
}

// Función para limpiar las entradas y las tablas
function limpiar() {
  const inputs = [
    "dineroHasta1000",
    "dineroEntre1000y1500",
    "dineroEntre1500y2000",
    "dineroEntre2000y3000",
    "dineroCsgofortnitevalorant",
  ];
  const tablas = ["hasta1000", "entre1000y1500", "entre1500y2000", "entre2000y3000", "csgofortnitevalorant"];

  // Limpiar los campos de entrada
  inputs.forEach((idInput) => {
    document.getElementById(idInput).value = "";
  });

  // Limpiar las celdas de las tablas
  tablas.forEach((idTabla) => {
    const filas = document.querySelectorAll(`#${idTabla} tbody tr`);
    filas.forEach((fila) => {
      fila.cells[2].textContent = "";
    });
  });
}
