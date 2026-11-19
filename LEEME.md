# Teatro Consciente — sitio estático (listo para GitHub Pages)

Sitio hecho a mano, liviano y responsive. Cada página es un solo archivo HTML,
con el CSS compartido en `/css/`, los scripts en `/js/` y las imágenes en `/img/`.

## Estructura

```
index.html        → Home
nosotros.html
clases.html
teatro.html
obras.html
contacto.html
inscripcion.html  → Preinscripción 2027
favicon.svg
css/styles.css    → estilos compartidos (menú, animaciones, etc.)
js/site.js        → menú móvil, aparición al scroll, carruseles, tabs, reseñas
img/              → imágenes (hoy placeholders; ver IMAGENES.md)
IMAGENES.md       → qué foto va en cada archivo de /img/
```

## Cómo publicar en GitHub Pages

1. Subí **todo el contenido de esta carpeta** a tu repositorio (que `index.html`
   quede en la raíz del repo, o en `/docs` si preferís esa opción).
2. En el repo: **Settings → Pages → Build and deployment → Deploy from a branch**,
   elegí la rama (`main`) y la carpeta (`/root` o `/docs`).
3. En unos minutos tu sitio queda online en `https://tuusuario.github.io/turepo/`.

Como todas las rutas son **relativas** (sin barra inicial), funciona igual si el
sitio vive en un subdirectorio (`/turepo/`) o en un dominio propio.

## Imágenes

Las imágenes de `/img/` son hoy **placeholders** con el nombre correcto.
Reemplazá cada una por la foto real **con el mismo nombre de archivo** y listo.
El detalle de qué va en cada lugar está en `IMAGENES.md`.
(La única imagen real ya incluida es `img/textura-papel.svg`, el fondo del Teatro.)

## El formulario de preinscripción

`inscripcion.html` envía los datos a tu Google Apps Script (el mismo endpoint que
ya tenías). No necesita backend: funciona tal cual en GitHub Pages.
