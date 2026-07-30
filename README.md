# Portafolio — Maximiliano Correa

![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?logo=sass&logoColor=white)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

Portafolio personal de **Maximiliano Correa**, Ingeniero de Sistemas (UIS) — Frontend Developer & QA Automation.

**🔗 Demo en vivo:** [portafolio-seven-fawn-70.vercel.app](https://portafolio-seven-fawn-70.vercel.app/)

---

## Sobre el proyecto

Este portafolio tiene una identidad visual propia: el concepto de **"plano de ingeniería técnica"**. Es monocromático (negro, blancos y grises, sin colores vivos), organiza el contenido como si fueran **hojas de un plano numeradas** (HOJA 01 — PERFIL, HOJA 02 — SOBRE MÍ, etc.) y usa tipografía técnica (`Space Grotesk`, `Inter` e `IBM Plex Mono`) junto con un diagrama esquemático de tecnologías dibujado en SVG dentro del Hero.

Es una **SPA de una sola vista** con scroll por anclas entre secciones:

- **Header** — sticky, con navegación por anclas y menú overlay en mobile.
- **Hero** — presentación con diagrama esquemático del stack técnico.
- **Sobre mí** — resumen profesional y ficha técnica de datos.
- **Skills** — habilidades agrupadas por categoría.
- **Proyectos** — grid de tarjetas con modal de detalle por proyecto.
- **Contacto** — formulario conectado a [Formspree](https://formspree.io/) (sin backend propio).

## Características

- ⚙️ **Angular 21** con *standalone components* y **signals** (sin `NgModules`, sin RxJS para el estado de UI).
- 🎨 Sistema de diseño basado en variables CSS (`--color-*`, `--font-*`, `--space-*`) para mantener consistencia visual.
- 📱 **Responsive** completo (mobile y desktop), incluyendo menú de navegación tipo overlay en pantallas pequeñas.
- ✨ Animaciones de entrada sutiles al hacer scroll (`IntersectionObserver`), respetando `prefers-reduced-motion`.
- 🖼️ Modal de detalle de proyecto con cierre por click fuera, botón o tecla `Escape`.
- 📩 Formulario de contacto funcional vía Formspree, sin necesidad de backend propio.
- 🚀 Despliegue continuo en **Vercel**, con CI/CD automático desde este repositorio en GitHub.

## Stack tecnológico

| Categoría         | Tecnología                                  |
|-------------------|----------------------------------------------|
| Framework         | Angular 21 (standalone components + signals) |
| Lenguaje          | TypeScript                                    |
| Estilos           | SCSS con variables CSS globales               |
| Formulario        | Formspree (envío por `fetch`, sin backend)    |
| Hosting / CI-CD   | Vercel (despliegue automático desde GitHub)   |

## Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── header/          # Navegación sticky + menú overlay mobile
│   │   ├── hero/             # Presentación + diagrama SVG del stack
│   │   ├── about/            # Sobre mí + ficha técnica
│   │   ├── skills/           # Grid de habilidades por categoría
│   │   ├── projects/         # Grid de proyectos + estado del modal
│   │   ├── project-card/     # Tarjeta individual de proyecto
│   │   ├── project-modal/    # Modal de detalle de proyecto
│   │   ├── contact/          # Formulario de contacto (Formspree)
│   │   └── footer/
│   ├── data/
│   │   └── proyectos.data.ts # Datos de los proyectos mostrados
│   ├── models/
│   │   └── proyecto.model.ts # Interfaz Proyecto
│   ├── directives/
│   │   └── scroll-reveal.ts  # Directiva de animación al hacer scroll
│   ├── app.html / app.ts     # Shell principal de la SPA
│   └── app.config.ts
└── styles.scss                # Variables globales de diseño (colores, tipografía, espaciado)
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
| **Book Search App** — buscador de libros con la API de OpenLibrary | [github.com/Maxito06/book-search-app](https://github.com/Maxito06/book-search-app) | [Ver demo](https://book-search-app-lac.vercel.app/) |
| **Movie Explorer** — explorador de películas y series con TMDB API | [github.com/Maxito06/movie-explorer](https://github.com/Maxito06/movie-explorer) | [Ver demo](https://movie-explorer-orpin-six.vercel.app/) |
| **Carta Virtual** — menú digital para un restaurante real, sin backend | — | [Ver demo](https://carta-restaurante-two.vercel.app/) |

## Contacto

- 📧 Email: [maxicopi5@gmail.com](mailto:maxicopi5@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/maximiliano-correa-pico](https://linkedin.com/in/maximiliano-correa-pico)
- 🐙 GitHub: [github.com/Maxito06](https://github.com/Maxito06)
