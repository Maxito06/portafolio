import { Proyecto } from '../models/proyecto.model';

export const PROYECTOS: Proyecto[] = [
  {
    id: 'lienzo',
    titulo: 'Lienzo',
    descripcionCorta:
      'Galería de arte con panel de administración y contacto directo por WhatsApp.',
    descripcionDetallada:
      'Aplicación web full stack para que un artista o un pequeño negocio publique su catálogo: galería pública con filtros, detalle de cada obra con una vista previa colgada en una pared a escala real, y un panel privado para cargar fotos, cambiar el estado (disponible, reservada, vendida) y publicar borradores. El interés del visitante se canaliza por WhatsApp con un mensaje que ya incluye la obra consultada y su enlace. Incluye SEO técnico, pruebas automáticas y despliegue en producción. El catálogo de demostración usa obras de dominio público.',
    stack: ['Angular', 'NestJS', 'PostgreSQL', 'Prisma', 'SSR', 'Playwright'],
    imagen: '/images/proyectos/lienzo.png',
    repoUrl: 'https://github.com/Maxito06/lienzo-gallery',
    demoUrl: 'https://lienzo-gallery.netlify.app',
    destacado: true,
    aviso:
      'Demo en alojamiento gratuito: si lleva un rato sin visitas, la primera carga puede tardar hasta 30 segundos.',
    destacados: [
      'Autenticación con sesiones en base de datos y cookie __Host- (httpOnly, Secure, SameSite=Strict), más protección CSRF',
      'Panel de administración: fotos, estados, series, borradores y publicación',
      'Vista "en la pared": la obra a escala real sobre la fotografía de una sala',
      'SEO técnico con renderizado en servidor: URL por obra, canonical, datos estructurados, sitemap y robots',
      'Más de 300 pruebas automáticas (unitarias, e2e de la API y Playwright) con integración continua en GitHub Actions',
      'Despliegue en producción con proxy en el borde, monitoreo de salud y registro documentado de decisiones de arquitectura',
    ],
    stackPorCapa: [
      { capa: 'Frontend', items: ['Angular 22', 'Signals', 'OnPush', 'TypeScript estricto', 'SSR', 'CSS con tokens de diseño'] },
      { capa: 'Backend', items: ['NestJS 12', 'Node 24', 'Sesiones en BD', 'CSRF', 'argon2'] },
      { capa: 'Base de datos', items: ['PostgreSQL (Neon)', 'Prisma 7', 'Migraciones versionadas'] },
      { capa: 'Servicios', items: ['Cloudinary', 'Netlify', 'Render', 'UptimeRobot'] },
      { capa: 'Testing', items: ['Vitest', 'Pruebas e2e de la API', 'Playwright'] },
      { capa: 'CI/CD', items: ['GitHub Actions', 'Despliegue continuo desde GitHub'] },
    ],
  },
  {
    id: 'libros',
    titulo: 'Book Search App',
    descripcionCorta: 'Buscador de libros usando la API de OpenLibrary',
    descripcionDetallada:
      'Aplicación que permite buscar libros por título, autor o palabra clave consumiendo la API pública de OpenLibrary, mostrando portadas y detalles de cada resultado.',
    stack: ['Angular', 'TypeScript', 'OpenLibrary API'],
    imagen: '/images/proyectos/book-search.png',
    repoUrl: 'https://github.com/Maxito06/book-search-app',
    demoUrl: 'https://book-search-app-lac.vercel.app/',
  },
  {
    id: 'peliculas',
    titulo: 'Movie Explorer',
    descripcionCorta:
      'Explorador de películas y series con watchlist y filtros, usando TMDB API',
    descripcionDetallada:
      'Explorador de películas y series con rutas dinámicas por título, lista de seguimiento (watchlist) persistida con signals, y filtros por género y año, con tema visual oscuro tipo cine.',
    stack: ['Angular', 'TypeScript', 'TMDB API', 'Signals'],
    imagen: '/images/proyectos/movie-explorer.png',
    repoUrl: 'https://github.com/Maxito06/movie-explorer',
    demoUrl: 'https://movie-explorer-orpin-six.vercel.app/',
  },
  {
    id: 'carta-virtual',
    titulo: 'Carta Virtual',
    descripcionCorta: 'Menú digital para un restaurante real, sin backend',
    descripcionDetallada:
      'Carta digital para un restaurante real de parrilla santandereana, con categorías de platos, precios en pesos colombianos, y sin necesidad de backend ni panel de administración.',
    stack: ['Angular', 'TypeScript'],
    imagen: '/images/proyectos/carta-virtual.png',
    repoUrl: 'PENDIENTE',
    demoUrl: 'https://carta-restaurante-two.vercel.app/',
  },
];
