# Portafolio | Maximiliano Correa

![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?logo=sass&logoColor=white)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

Portafolio personal de **Maximiliano Correa**, Ingeniero de Sistemas (UIS) y Desarrollador Full Stack Junior | Angular, NestJS, QA Automation. Mi experiencia laboral es en frontend y QA; el perfil full stack lo respalda Lienzo, un proyecto propio.

**🔗 Demo en vivo:** [portafolio-seven-fawn-70.vercel.app](https://portafolio-seven-fawn-70.vercel.app/)

---

## Sobre el proyecto

Es una **SPA de una sola vista** con scroll por anclas entre secciones, en este orden:

- **Header**, sticky, con navegación por anclas, enlace activo según la sección visible y menú overlay en mobile.
- **Hero**, presentación con diagrama esquemático del stack técnico.
- **Sobre mí**, resumen profesional y ficha de datos.
- **Proyectos**, grid de tarjetas con modal de detalle por proyecto.
- **Skills**, habilidades agrupadas por área.
- **Contacto**, formulario conectado a [Formspree](https://formspree.io/) (sin backend propio).

## Diseño

Tema oscuro y sobrio, pensado para reclutadores y equipos técnicos: contenido centrado con un ancho máximo de 1120px, esquinas rectas, tarjetas con borde sobre una cuadrícula limpia y un único color de acento. La elevación se marca con el tono de la superficie, sin sombras; el modal de proyecto es el único elemento con sombra.

**Paleta** (definida como variables CSS en `src/styles.scss`):

| Rol | Valor |
|---|---|
| Fondo | `#0F172A` |
| Tarjetas | `#1B2336` |
| Superficie elevada | `#272F42` |
| Bordes | `#475569` (campos de formulario: `#64748B`) |
| Texto | `#F8FAFC` |
| Texto secundario | `#94A3B8` |
| Acento | `#22C55E` |
| Error | `#EF4444` |

**Tipografías** (Google Fonts, cargadas con un solo `<link>`):

- **JetBrains Mono** (500 y 700) para títulos, nombre y etiquetas.
- **IBM Plex Sans** (400 y 600) para el cuerpo de texto, botones y navegación.

**Composición y componentes:**

- Escala tipográfica de 12, 14, 16, 18, 24 y 32px, más un tamaño de display para el nombre, y espaciado con base de 4px.
- Cada título de sección lleva una barra corta de acento; las secciones se separan con una línea fina.
- Botones sólidos (acento) y de contorno, etiquetas de tecnología con borde y tarjetas con borde que resaltan en acento al pasar el cursor.
- El diagrama del Hero es un esquema de nodos rectangulares con ángulos rectos y conectores continuos; el nodo central, con el nombre, lleva el borde en acento.
- Animaciones de entrada sutiles al hacer scroll (desplazamiento de 12px y aparición gradual, de 350ms, una sola vez), con duraciones y curvas definidas como tokens. El Hero no se anima. Con `prefers-reduced-motion` las transiciones y animaciones son instantáneas.

## Accesibilidad

Lo que está implementado en el código:

- Enlace **"Saltar al contenido"** como primer elemento de la página, visible al recibir foco.
- **Foco visible** en todos los controles (anillo blanco de 2px); en las tarjetas de proyecto se marca la tarjeta completa.
- **Tarjetas de proyecto como botones reales**, activables con Enter y Espacio.
- **Diálogos accesibles** (modal de proyecto y menú móvil): `role="dialog"`, `aria-modal`, foco inicial dentro, trampa de Tab, cierre con `Escape`, devolución del foco al elemento que los abrió y bloqueo del scroll del fondo.
- **Formulario de contacto** con validación por campo (nombre, email con formato válido y mensaje), `aria-invalid`, `aria-describedby`, `autocomplete` y foco al primer campo inválido; los mensajes de éxito y de error se anuncian con una región `aria-live="polite"`.
- **Objetivos táctiles de 44px** como mínimo en botones, enlaces con borde, campos y controles del menú.
- **Contraste AA**: la paleta está calculada para texto de 4,5:1 y bordes de campos de formulario de 3:1.
- Enlace activo de la navegación marcado con `aria-current`, y diagrama del Hero con `role="img"` y descripción en `aria-label`.

## Características

- ⚙️ **Angular 21** con *standalone components*, **signals** y detección de cambios `OnPush` (sin `NgModules`, sin RxJS para el estado de UI).
- 🎨 Sistema de diseño basado en variables CSS (`--color-*`, `--font-*`, `--text-*`, `--space-*`, `--duration-*`) para mantener consistencia visual.
- 📱 **Responsive** completo (mobile y desktop), incluyendo menú de navegación tipo overlay en pantallas pequeñas.
- ✨ Animaciones de entrada sutiles al hacer scroll (`IntersectionObserver`), respetando `prefers-reduced-motion`.
- 🖼️ Modal de detalle de proyecto con cierre por click fuera, botón o tecla `Escape`, e imágenes con `NgOptimizedImage`.
- 📩 Formulario de contacto con validación y envío vía Formspree, sin necesidad de backend propio.
- 🚀 Despliegue continuo en **Vercel**, con CI/CD automático desde este repositorio en GitHub.

## Stack tecnológico

| Categoría         | Tecnología                                  |
|-------------------|----------------------------------------------|
| Framework         | Angular 21 (standalone components + signals) |
| Lenguaje          | TypeScript                                    |
| Estilos           | SCSS con variables CSS globales (tokens)      |
| Tipografías       | JetBrains Mono e IBM Plex Sans (Google Fonts) |
| Formulario        | Formspree (envío por `fetch`, sin backend)    |
| Hosting / CI-CD   | Vercel (despliegue automático desde GitHub)   |

## Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── header/          # Navegación sticky + menú overlay mobile
│   │   ├── hero/             # Presentación + diagrama SVG del stack
│   │   ├── about/            # Sobre mí + ficha de datos
│   │   ├── projects/         # Grid de proyectos + estado del modal
│   │   ├── project-card/     # Tarjeta individual de proyecto
│   │   ├── project-modal/    # Modal de detalle de proyecto
│   │   ├── skills/           # Grid de habilidades por categoría
│   │   ├── contact/          # Formulario de contacto (Formspree)
│   │   └── footer/
│   ├── data/
│   │   └── proyectos.data.ts # Datos de los proyectos mostrados
│   ├── models/
│   │   └── proyecto.model.ts # Interfaz Proyecto
│   ├── directives/
│   │   └── scroll-reveal.ts  # Directiva de animación al hacer scroll
│   ├── utils/
│   │   └── dialogo.ts        # Trampa de foco y bloqueo de scroll para diálogos
│   ├── app.html / app.ts     # Shell principal de la SPA
│   └── app.config.ts
└── styles.scss                # Tokens de diseño (color, tipografía, espaciado, movimiento) y estilos compartidos
```

## Instalación y uso local

Requisitos: [Node.js](https://nodejs.org/) y [Angular CLI](https://angular.dev/tools/cli).

```bash
# 1. Clonar el repositorio
git clone <url-de-este-repo>
cd portafolio

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
ng serve
```

La aplicación quedará disponible en `http://localhost:4200/` con recarga automática al modificar el código.

Para generar el build de producción:

```bash
ng build
```

Los artefactos de build quedan en `dist/`.

## Despliegue

El proyecto está desplegado en **Vercel**, con integración continua directamente desde este repositorio: cada push genera automáticamente un nuevo despliegue.

## Otros proyectos de mi portafolio

Este sitio agrupa y enlaza mis otros proyectos personales, cada uno con su propio repositorio y demo en vivo:

| Proyecto | Repositorio | Demo |
|---|---|---|
| **Lienzo**, galería de arte full stack (demo, con obras de dominio público y sin cliente real) con backend en NestJS, PostgreSQL, panel de administración, pruebas automatizadas e integración continua. Es el proyecto más completo del portafolio | [github.com/Maxito06/lienzo-gallery](https://github.com/Maxito06/lienzo-gallery) | [Ver demo](https://lienzo-gallery.netlify.app) |
| **Book Search App**, buscador de libros con la API de OpenLibrary | [github.com/Maxito06/book-search-app](https://github.com/Maxito06/book-search-app) | [Ver demo](https://book-search-app-lac.vercel.app/) |
| **Movie Explorer**, explorador de películas y series con TMDB API | [github.com/Maxito06/movie-explorer](https://github.com/Maxito06/movie-explorer) | [Ver demo](https://movie-explorer-orpin-six.vercel.app/) |
| **Carta Virtual**, menú digital para un restaurante real, sin backend | Sin repositorio público | [Ver demo](https://carta-restaurante-two.vercel.app/) |

## Contacto

- 📧 Email: [maxicopi5@gmail.com](mailto:maxicopi5@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/maximiliano-correa-pico](https://linkedin.com/in/maximiliano-correa-pico)
- 🐙 GitHub: [github.com/Maxito06](https://github.com/Maxito06)
