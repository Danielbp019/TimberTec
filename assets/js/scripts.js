// Cambio dia y noche script
// *    Inicializar el tema guardado
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-bs-theme", savedTheme);
document.getElementById("themeSwitch").checked = savedTheme === "dark";

// *    Cambiar el tema al activar el switch
document.getElementById("themeSwitch").addEventListener("change", function () {
  const theme = this.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-bs-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeIcon(theme);
});

// *    Actualizar el icono SVG según el tema
function updateThemeIcon(theme) {
  const icon = document.querySelector(".theme-icon-active use");
  if (theme === "dark") {
    icon.setAttribute("href", "#moon-stars-fill");
    document.querySelector(".theme-icon-active").classList.add("theme-dark");
  } else {
    icon.setAttribute("href", "#sun-fill");
    document.querySelector(".theme-icon-active").classList.remove("theme-dark");
  }
}
// *    Llamar a la función para actualizar el icono al cargar la página
updateThemeIcon(savedTheme);

// Tooltip
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
