const botonesVerMas = document.querySelectorAll(".btn-ver-mas");

botonesVerMas.forEach((boton) => {
  boton.addEventListener("click", () => {
    const descripcion = boton.previousElementSibling;

    descripcion.hidden = !descripcion.hidden;

    if (descripcion.hidden) {
      boton.textContent = "Ver más";
    } else {
      boton.textContent = "Ver menos";
    }
  });
});