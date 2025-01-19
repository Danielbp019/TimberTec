function calcularHasta1000() {
  // Obtener el valor ingresado por el usuario
  const dinero = parseFloat(document.getElementById("dineroHasta1000").value);

  // Verificar si el valor ingresado es un número válido
  if (isNaN(dinero) || dinero <= 0) {
    alert("Por favor ingrese una cantidad válida de dinero.");
    return;
  }

  // Definir los porcentajes para cada componente
  const componentes = [
    { nombre: "Gráfica", porcentaje: 45 },
    { nombre: "CPU", porcentaje: 14 },
    { nombre: "Placa Madre", porcentaje: 13 },
    { nombre: "Fuente", porcentaje: 8 },
    { nombre: "SSD", porcentaje: 6 },
    { nombre: "CAJA / Gabinete", porcentaje: 6 },
    { nombre: "RAM", porcentaje: 5 },
    { nombre: "Disipador", porcentaje: 3 },
  ];

  // Iterar sobre cada componente y calcular el gasto
  componentes.forEach((componente, index) => {
    // Calcular el gasto basado en el porcentaje
    const gasto = Math.round((dinero * componente.porcentaje) / 100); // Redondear a la unidad más cercana

    // Actualizar el valor de la columna "Resultado" en la tabla
    const resultadoCelda = document.querySelectorAll("#hasta1000 tbody tr")[
      index
    ].cells[2];
    resultadoCelda.textContent = "$" + gasto; // Mostrar sin decimales
  });
}

function limpiar() {
  // Limpiar el campo de entrada
  document.getElementById("dineroHasta1000").value = "";

  // Limpiar las celdas de la columna "Resultado"
  const resultados = document.querySelectorAll("#hasta1000 tbody tr");
  resultados.forEach((row) => {
    row.cells[2].textContent = ""; // Limpiar el contenido de la celda de resultado
  });
}
