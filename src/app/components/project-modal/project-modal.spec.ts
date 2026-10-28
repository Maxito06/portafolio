import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { Mock } from 'vitest';
import { Proyecto } from '../../models/proyecto.model';
import { ProjectModal } from './project-modal';

const PROYECTO_BASE: Proyecto = {
  id: 'demo',
  titulo: 'Proyecto de prueba',
  descripcionCorta: 'Descripcion corta',
  descripcionDetallada: 'Descripcion detallada',
  stack: ['Angular'],
  imagen: '/images/proyectos/demo.png',
  repoUrl: 'PENDIENTE',
  demoUrl: 'PENDIENTE',
};

describe('ProjectModal', () => {
  let fixture: ComponentFixture<ProjectModal>;
  let component: ProjectModal;
  let host: HTMLElement;
  let cerrar: Mock<() => void>;

  async function abrir(proyecto: Proyecto): Promise<void> {
    fixture = TestBed.createComponent(ProjectModal);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    cerrar = vi.fn<() => void>();
    component.cerrar.subscribe(() => cerrar());
    fixture.componentRef.setInput('proyecto', proyecto);
    fixture.detectChanges();
    await fixture.whenStable();
  }

  const dialogo = () => host.querySelector<HTMLElement>('[role="dialog"]')!;
  const botonCerrar = () => host.querySelector<HTMLButtonElement>('button[aria-label="Cerrar"]')!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectModal],
    }).compileComponents();
  });

  it('should create', async () => {
    await abrir(PROYECTO_BASE);
    expect(component).toBeTruthy();
  });

  it('se expone como diálogo modal etiquetado por su título', async () => {
    await abrir(PROYECTO_BASE);

    expect(dialogo().getAttribute('aria-modal')).toBe('true');
    const idTitulo = dialogo().getAttribute('aria-labelledby')!;
    expect(host.querySelector(`#${idTitulo}`)).not.toBeNull();
  });

  it('mueve el foco al botón de cierre al abrir', async () => {
    await abrir(PROYECTO_BASE);

    expect(document.activeElement).toBe(botonCerrar());
  });

  describe('cierre', () => {
    it('emite "cerrar" con Escape', async () => {
      await abrir(PROYECTO_BASE);

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(cerrar).toHaveBeenCalledTimes(1);
    });

    it('emite "cerrar" con el botón de cierre', async () => {
      await abrir(PROYECTO_BASE);

      botonCerrar().click();

      expect(cerrar).toHaveBeenCalledTimes(1);
    });

    it('emite "cerrar" al hacer clic en el fondo', async () => {
      await abrir(PROYECTO_BASE);

      dialogo().parentElement!.click();

      expect(cerrar).toHaveBeenCalledTimes(1);
    });

    it('no emite "cerrar" al hacer clic dentro del contenido', async () => {
      await abrir(PROYECTO_BASE);

      dialogo().click();
      host.querySelector<HTMLElement>('h3')!.click();

      expect(cerrar).not.toHaveBeenCalled();
    });
  });

  describe('alcance y limitaciones', () => {
    // Las limitaciones y los puntos destacados se pintan como listas .modal-destacados.
    const listas = () => host.querySelectorAll('ul.modal-destacados');

    it('muestra el bloque cuando el proyecto trae limitaciones', async () => {
      await abrir({ ...PROYECTO_BASE, limitaciones: ['Primera', 'Segunda'] });

      expect(listas().length).toBe(1);
      expect(listas()[0].querySelectorAll('li').length).toBe(2);
    });

    it('no muestra el bloque cuando el proyecto no trae limitaciones', async () => {
      await abrir(PROYECTO_BASE);

      expect(listas().length).toBe(0);
    });
  });

  describe('scroll del fondo', () => {
    it('bloquea el scroll al abrir y lo restaura al destruirse', async () => {
      document.body.style.overflow = '';
      await abrir(PROYECTO_BASE);
      expect(document.body.style.overflow).toBe('hidden');

      fixture.destroy();

      expect(document.body.style.overflow).toBe('');
    });
  });
});
