import { Proyecto } from '../models/proyecto.model';

export const PROYECTOS: Proyecto[] = [
  {
    id: 'lienzo',
    titulo: 'Lienzo',
    descripcionCorta:
      'Galería de arte full stack (demo) con panel de administración y contacto por WhatsApp.',
    descripcionDetallada:
      'Aplicación web full stack que simula el catálogo de un artista: galería pública con filtros por técnica, serie y estado, y paginación; detalle de cada obra con carrusel y vista de la obra colgada en una pared a escala real; y un panel de administración protegido para gestionar obras, fotos, series y técnicas, con borradores, publicación y estados de venta. El interés del visitante llega por WhatsApp con un mensaje que ya incluye la obra consultada. Es un proyecto de demostración con obras de dominio público, sin cliente real.',
    stack: ['Angular', 'NestJS', 'PostgreSQL', 'Prisma', 'SSR', 'Playwright'],
    imagen: '/images/proyectos/lienzo.png',
    repoUrl: 'https://github.com/Maxito06/lienzo-gallery',
    demoUrl: 'https://lienzo-gallery.netlify.app',
    destacado: true,
    aviso:
      'Demo en alojamiento gratuito: la API se suspende tras 15 minutos sin visitas, pero un monitor la consulta cada 5 minutos para mantenerla activa. Si aun así lleva un rato dormida, la primera carga puede tardar hasta 30 segundos.',
    destacados: [
      'Sesión con cookie segura (__Host-, httpOnly, Secure, SameSite=Strict), protección CSRF, hash de contraseñas con argon2 y límite de intentos de login',
      'Panel de administración protegido: obras, fotos, series y técnicas, con borradores, publicación y estados de venta',
      'Vista de la obra en pared a escala real y carrusel de imágenes en el detalle',
      'SEO técnico con SSR: URL por obra, canonical, datos estructurados JSON-LD, sitemap y robots',
      '344 pruebas automatizadas (42 unitarias API, 114 e2e e integración API, 175 unitarias web, 13 e2e en navegador con Playwright) e integración continua con GitHub Actions',
      'Documentación: registro de decisiones técnicas, requerimientos (RF y RNF) e historias de usuario con criterios de aceptación en Trello',
    ],
    stackPorCapa: [
      { capa: 'Frontend', items: ['Angular 22', 'Signals', 'OnPush', 'SSR', 'TypeScript estricto'] },
      { capa: 'Backend', items: ['NestJS 12', 'Node 24', 'argon2'] },
      { capa: 'Base de datos', items: ['PostgreSQL (Neon)', 'Prisma 7'] },
      { capa: 'Servicios', items: ['Cloudinary', 'Netlify', 'Render', 'UptimeRobot'] },
      { capa: 'Testing', items: ['Vitest', 'Playwright'] },
      { capa: 'CI/CD', items: ['GitHub Actions'] },
    ],
    limitaciones: [
      'Proyecto de demostración con obras de dominio público, sin cliente real',
      'Interfaz solo en español',
      'Sin pagos en línea; el contacto es por WhatsApp',
      'Un solo administrador',
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
