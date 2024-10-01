// Cambio dia y noche script
// *    Inicializar el tema guardado
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-bs-theme', savedTheme);
document.getElementById('themeSwitch').checked = savedTheme === 'dark';

// *    Cambiar el tema al activar el switch
document.getElementById('themeSwitch').addEventListener('change', function () {
    const theme = this.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

// *    Actualizar el icono SVG según el tema
function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-icon-active use');
    if (theme === 'dark') {
        icon.setAttribute('href', '#moon-stars-fill');
        document.querySelector('.theme-icon-active').classList.add('theme-dark');
    } else {
        icon.setAttribute('href', '#sun-fill');
        document.querySelector('.theme-icon-active').classList.remove('theme-dark');
    }
}
// *    Llamar a la función para actualizar el icono al cargar la página
updateThemeIcon(savedTheme);


// Generar opciones para el select de Uso Diario (horas)
const usoDiarioSelect = document.getElementById('usoDiario');
for (let i = 1; i <= 24; i++) {
    const option = document.createElement('option');
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
    'use strict';
    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    var forms = document.querySelectorAll('.needs-validation');
    // Bucle sobre ellos y evitar el envío
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
})();

function calcularGasto() {
    // Obtener el formulario
    const form = document.getElementById('form');

    // Verificar si el formulario es válido
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    // Obtener los valores de los campos
    const alias = document.getElementById('alias').value;
    const costeEnergia = parseFloat(document.getElementById('costeEnergia').value);
    const consumo = parseFloat(document.getElementById('consumo').value);
    const usoDiario = parseFloat(document.getElementById('usoDiario').value);

    const consumoDiarioKWh = (consumo * usoDiario) / 1000;
    const gastoDiario = consumoDiarioKWh * costeEnergia;
    const gastoMensual = gastoDiario * 30;
    const gastoAnual = gastoDiario * 365;

    const calculo = {
        // Se guardan los valores
        alias: alias,
        costeEnergia: costeEnergia,
        consumo: consumo,
        usoDiario: usoDiario,
        gastoMensual: gastoMensual.toFixed(2),
        gastoAnual: gastoAnual.toFixed(2)
    };

    // Agregar el cálculo a la lista y mantener solo los últimos 10
    calculos.unshift(calculo);
    if (calculos.length > 9) {
        calculos.pop();
    }
    // Actualizar la tabla del historial
    actualizarTabla();
}

// Actualizar la tabla del historial
function actualizarTabla() {
    const tbody = document.getElementById('tablaCalculos').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    calculos.forEach(calculo => {
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
        cellGasto.textContent = calculo.gastoMensual;
        cellAnual.textContent = calculo.gastoAnual;
    });
}