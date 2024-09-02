// Cambio dia y noche script
document.querySelectorAll('[data-bs-theme-value]').forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-bs-theme-value');
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
    });
});
const savedTheme = localStorage.getItem('theme') || 'auto';
document.documentElement.setAttribute('data-bs-theme', savedTheme);

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

const calculos = [];

function calcularGasto() {
    // Si el valor no esta presente se pone 0 o Sin Alias segun corresponda
    const alias = document.getElementById('alias').value || 'Sin Alias';
    const costeEnergia = parseFloat(document.getElementById('costeEnergia').value) || 0;
    const consumo = parseFloat(document.getElementById('consumo').value) || 0;
    const usoDiario = parseFloat(document.getElementById('usoDiario').value) || 0;

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
    if (calculos.length > 10) {
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