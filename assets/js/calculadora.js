// Generar opciones para el select de Uso Diario (horas)
const usoDiarioSelect = document.getElementById("usoDiario");
for (let i = 1; i <= 24; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;

  // Establecer 8 horas como la opción predeterminada
  if (i === 8) {
    option.selected = true;
  }
  usoDiarioSelect.appendChild(option);
}

// Almacena los resultados de los cálculos que realizas cada vez que se ejecuta la función calcularGasto
const calculos = [];

// Activar la validación de Bootstrap
(function () {
  "use strict";
  // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
  var forms = document.querySelectorAll(".needs-validation");
  // Bucle sobre ellos y evitar el envío
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function calcularGasto() {
  // Obtener el formulario
  const form = document.getElementById("form");

  // Verificar si el formulario es válido
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  // Obtener los valores de los campos
  const alias = document.getElementById("alias").value;
  const costeEnergia = parseFloat(
    document.getElementById("costeEnergia").value
  );
  const consumo = parseFloat(document.getElementById("consumo").value);
  const usoDiario = parseFloat(document.getElementById("usoDiario").value);
  const moneda = document.getElementById("moneda").value;

  const consumoDiarioKWh = (consumo * usoDiario) / 1000;
  const gastoDiario = consumoDiarioKWh * costeEnergia;
  const gastoMensual = gastoDiario * 30;
  const gastoAnual = gastoDiario * 365;

  // Definir el formato de moneda según la selección del usuario
  let formatoMoneda;
  let simboloMoneda;
  if (moneda === "COP") {
    formatoMoneda = ["es-CO", { style: "currency", currency: "COP" }];
    simboloMoneda = "COP";
  } else if (moneda === "USD") {
    formatoMoneda = ["en-US", { style: "currency", currency: "USD" }];
    simboloMoneda = "USD";
  } else if (moneda === "EUR") {
    formatoMoneda = ["de-DE", { style: "currency", currency: "EUR" }];
    simboloMoneda = "EUR";
  }

  // Formatear el gasto anual y mensual usando el formato de moneda seleccionado
  const gastoAnualFormateado = `${simboloMoneda} ${gastoAnual.toLocaleString(
    ...formatoMoneda
  )}`;
  const gastoMensualFormateado = `${simboloMoneda} ${gastoMensual.toLocaleString(
    ...formatoMoneda
  )}`;

  const calculo = {
    // Se guardan los valores
    alias: alias,
    costeEnergia: costeEnergia,
    consumo: consumo,
    usoDiario: usoDiario,
    gastoAnualFormateado: gastoAnualFormateado,
    gastoMensualFormateado: gastoMensualFormateado,
  };

  // Agregar el cálculo a la lista y mantener solo los últimos 10
  calculos.unshift(calculo);
  if (calculos.length > 10) {
    calculos.pop();
  }
  // Actualizar la tabla del historial
  actualizarTabla();
}

// Actualizar la tabla del historial
function actualizarTabla() {
  const tbody = document
    .getElementById("tablaCalculos")
    .getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  calculos.forEach((calculo) => {
    const row = tbody.insertRow();
    const cellAlias = row.insertCell(0);
    const cellcosteEnergia = row.insertCell(1);
    const cellConsumo = row.insertCell(2);
    const cellUsoDiario = row.insertCell(3);
    const cellGasto = row.insertCell(4);
    const cellAnual = row.insertCell(5);

    cellAlias.textContent = calculo.alias;
    cellcosteEnergia.textContent = calculo.costeEnergia;
    cellConsumo.textContent = calculo.consumo;
    cellUsoDiario.textContent = calculo.usoDiario;
    cellGasto.textContent = calculo.gastoMensualFormateado;
    cellAnual.textContent = calculo.gastoAnualFormateado;
  });
}
