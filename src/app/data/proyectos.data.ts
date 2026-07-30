import { Proyecto } from '../models/proyecto.model';

export const PROYECTOS: Proyecto[] = [
  {
    id: 'libros',
    titulo: 'Book Search App',
    descripcionCorta: 'Buscador de libros usando la API de OpenLibrary',
    descripcionDetallada:
      'Aplicación que permite buscar libros por título, autor o palabra clave consumiendo la API pública de OpenLibrary, mostrando portadas y detalles de cada resultado.',
    stack: ['Angular', 'TypeScript', 'OpenLibrary API'],
    imagen: '',
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
    imagen: '',
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
    imagen: '',
    repoUrl: 'PENDIENTE',
    demoUrl: 'https://carta-restaurante-two.vercel.app/',
  },
];
