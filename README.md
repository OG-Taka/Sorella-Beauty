# Sorella Beauty

## Integrantes

- Walter Martín Alvarado.
- Esteban Wytrykus.
- Federico López.

## Descripción breve

Sitio web para Sorella Beauty, un centro de estética familiar en Tafí Viejo, Tucumán. Permite a los clientes conocer los servicios ofrecidos, información del negocio y reservar turnos online.

## Tecnologías utilizadas

- HTML5
- Bootstrap 5.3.8 (vía CDN)
- JavaScript

## ¿Dónde utilizaron Flexbox?

Flexbox se utilizó durante el desarrollo del TP2 (antes de migrar el proyecto a Bootstrap en el TP3), en las siguientes secciones:

- **`nav`**: para distribuir el logo y los links del menú en fila, con `justify-content: space-between` y alineación vertical centrada.
- **`.nav-links`**: para mostrar los ítems del menú en fila horizontal con espaciado uniforme entre ellos.
- **`.hero`**: para centrar el título y la bajada de la sección de inicio, tanto vertical como horizontalmente.
- **`form`** (sección Turnos): para apilar los campos del formulario en columna con espaciado consistente.
- **Media query responsive**: para cambiar el `nav` de fila a columna en pantallas menores a 768px.

En el TP3, estas soluciones fueron reemplazadas por las utilidades de Bootstrap (`navbar`, `d-flex`, sistema de grillas), que internamente también están construidas sobre Flexbox.

## ¿Dónde utilizaron Grid?

Grid se utilizó durante el desarrollo del TP2 , en la siguiente sección:

- **`.servicios-grid`**: para organizar las tarjetas de servicios (Depilación definitiva, Crio-radio frecuencia, Limpieza Facial) en una grilla adaptable, usando `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`. Esto permitía que las tarjetas se acomodaran automáticamente en una, dos o tres columnas según el ancho disponible de la pantalla, sin necesidad de media queries adicionales para ese comportamiento.

En el TP3, esta solución fue reemplazada por el sistema de grillas de Bootstrap (`row`, `row-cols-1`, `row-cols-md-2`, `row-cols-lg-3`).

## ¿Qué variables CSS crearon?

Las variables CSS se definieron durante el desarrollo del TP2 (antes de migrar el proyecto a Bootstrap en el TP3), dentro de `:root`:

```css
:root {
  --color-blanco: #ffffff;
  --color-morado: #6a1b9a;
  --color-morado-claro: #9c4dcc;
  --color-negro: #1a1a1a;
  --color-gris-claro: #f2f2f2;

  --fuente-principal: "Segoe UI", sans-serif;

  --espaciado-sm: 0.5rem;
  --espaciado-md: 1rem;
  --espaciado-lg: 2rem;

  --radio-borde: 8px;
  --sombra-suave: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

Estas variables centralizaban la paleta de colores de la marca, la tipografía, los espaciados y los estilos de borde/sombra reutilizados a lo largo de todo el sitio (navbar, hero, cards de servicios, formulario y footer).

En el TP3, al migrar a Bootstrap, se adoptó el mismo enfoque mediante las variables CSS propias del framework (por ejemplo `--bs-primary`), sobreescritas para mantener la paleta de colores original de Sorella Beauty.


## ¿Cómo implementaron el Responsive Design?

Mediante las clases utilitarias de Bootstrap 5.3.8: el sistema de grillas (`row`, `col`, `row-cols-1`, `row-cols-md-2`, `row-cols-lg-3`) y el componente `navbar-expand-md` con menú colapsable, logrando tres comportamientos según el ancho de pantalla:
- **Celular** (menor a 768px): navegación colapsada, contenido en una columna.
- **Tablet** (768px en adelante): navegación expandida, contenido en dos columnas.
- **PC** (992px en adelante): contenido en tres columnas.
