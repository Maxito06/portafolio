export interface Proyecto {
  id: string;
  titulo: string;
  descripcionCorta: string;
  descripcionDetallada: string;
  stack: string[];
  imagen: string;
  repoUrl: string;
  demoUrl: string;
  destacado?: boolean;
  aviso?: string;
  destacados?: string[];
  limitaciones?: string[];
  stackPorCapa?: { capa: string; items: string[] }[];
}
