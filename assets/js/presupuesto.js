// Presupuesto.js

// Configuración de cada rango
const configuraciones = {
  hasta1000: {
    inputId: "dineroHasta1000",
    min: 1,
    max: 1000,
    porcentajes: [45, 14, 13, 8, 6, 6, 5, 3],
  },
  entre1000y1500: {
    inputId: "dineroEntre1000y1500",
    min: 1000,
    max: 1500,
    porcentajes: [46, 14, 11, 7, 6, 6, 7, 3],
  },
  entre1500y2000: {
    inputId: "dineroEntre1500y2000",
    min: 1500,
    max: 2000,
    porcentajes: [48, 14, 10, 7, 6, 6, 6, 3],
  },
  entre2000y3000: {
    inputId: "dineroEntre2000y3000",
    min: 2000,
    max: 3000,
    porcentajes: [50, 13, 9, 7, 6, 6, 6, 3],
  },
  csgofortnitevalorant: {
    inputId: "dineroCsgofortnitevalorant",
    min: 1,
    max: Infinity, // sin límite superior
    porcentajes: [33, 23, 12, 7, 6, 6, 9, 4],
  },
};

// Función de cálculo
function validarYCalcular(rango) {
  const config = configuraciones[rango];
  const input = document.getElementById(config.inputId);
  const valor = parseFloat(input.value);

  if (isNaN(valor) || valor < config.min || valor > config.max) {
    input.classList.add("is-invalid");
    return;
  } else {
    input.classList.remove("is-invalid");
  }

  // Busca la tabla asociada al tab actual
  const tabla = input.closest(".tab-pane").querySelector("tbody");
  const filas = tabla.querySelectorAll("tr");

  config.porcentajes.forEach((porcentaje, i) => {
    const gasto = (valor * porcentaje) / 100;
    filas[i].children[2].textContent = `$${Math.round(gasto)}`;
  });
}

// Limpiar todos los formularios
function limpiar() {
  // Vacía todos los inputs
  Object.values(configuraciones).forEach((cfg) => {
    const input = document.getElementById(cfg.inputId);
    if (input) {
      input.value = "";
      input.classList.remove("is-invalid");
    }
  });

  // Borra todos los resultados
  document.querySelectorAll("tbody tr td:nth-child(3)").forEach((td) => {
    td.textContent = "";
  });
}

// Manejador para el evento submit
document.addEventListener("DOMContentLoaded", () => {
  Object.keys(configuraciones).forEach((rango) => {
    const form = document.getElementById("form" + rango.charAt(0).toUpperCase() + rango.slice(1));
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault(); // evita recarga de página
        validarYCalcular(rango);
      });
    }
  });
});
