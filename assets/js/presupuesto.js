// Función genérica para calcular gastos
function calcularPresupuesto(idInput, idTabla, porcentajes) {
  // Obtener el valor ingresado por el usuario
  const dinero = parseFloat(document.getElementById(idInput).value);

  // Verificar si el valor ingresado es un número válido
/*   if (isNaN(dinero) || dinero <= 0) {
    alert("Por favor ingrese una cantidad válida de dinero.");
    return;
  } */

  // Iterar sobre cada componente y calcular el gasto
  porcentajes.forEach((porcentaje, index) => {
    // Calcular el gasto basado en el porcentaje
    const gasto = Math.round((dinero * porcentaje) / 100);

    // Actualizar el valor de la columna "Resultado" en la tabla
    const resultadoCelda = document.querySelectorAll(`#${idTabla} tbody tr`)[
      index
    ].cells[2];
    resultadoCelda.textContent = "$" + gasto;
  });
}

// Función genérica para limpiar todas las pestañas
function limpiar() {
  const inputs = [
    "dineroHasta1000",
    "dineroEntre1000y1500",
    "dineroEntre1500y2000",
    "dineroEntre2000y3000",
    "dineroCsgofortnitevalorant",
  ];
  const tablas = [
    "hasta1000",
    "entre1000y1500",
    "entre1500y2000",
    "entre2000y3000",
    "csgofortnitevalorant",
  ];

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

// Funciones específicas para cada rango
function calcularHasta1000() {
  calcularPresupuesto(
    "dineroHasta1000",
    "hasta1000",
    [45, 14, 13, 8, 6, 6, 5, 3]
  );
}

function calcularEntre1000y1500() {
  calcularPresupuesto(
    "dineroEntre1000y1500",
    "entre1000y1500",
    [46, 14, 11, 7, 6, 6, 7, 3]
  );
}

function calcularEntre1500y2000() {
  calcularPresupuesto(
    "dineroEntre1500y2000",
    "entre1500y2000",
    [48, 14, 10, 7, 6, 6, 6, 3]
  );
}

function calcularEntre2000y3000() {
  calcularPresupuesto(
    "dineroEntre2000y3000",
    "entre2000y3000",
    [50, 13, 9, 7, 6, 6, 6, 3]
  );
}

function calcularCsgofortnitevalorant() {
  calcularPresupuesto(
    "dineroCsgofortnitevalorant",
    "csgofortnitevalorant",
    [33, 23, 12, 7, 6, 6, 9, 4]
  );
}
