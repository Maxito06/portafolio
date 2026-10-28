import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Proyecto } from '../../models/proyecto.model';
import { ProjectCard } from './project-card';

const PROYECTO: Proyecto = {
  id: 'demo',
  titulo: 'Proyecto de prueba',
  descripcionCorta: 'Descripcion corta',
  descripcionDetallada: 'Descripcion detallada',
  stack: ['Angular', 'NestJS'],
  imagen: '/images/proyectos/demo.png',
  repoUrl: 'PENDIENTE',
  demoUrl: 'PENDIENTE',
};

describe('ProjectCard', () => {
  let fixture: ComponentFixture<ProjectCard>;
  let component: ProjectCard;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCard);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('proyecto', PROYECTO);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('el título es un botón real dentro del encabezado', () => {
    const boton = host.querySelector('h3 button');

    expect(boton).not.toBeNull();
    expect(boton!.getAttribute('type')).toBe('button');
  });

  it('emite "seleccionar" con el proyecto al hacer clic en el botón del título', () => {
    const seleccionar = vi.fn<(proyecto: Proyecto) => void>();
    component.seleccionar.subscribe((proyecto) => seleccionar(proyecto));

    host.querySelector<HTMLButtonElement>('h3 button')!.click();

    expect(seleccionar).toHaveBeenCalledTimes(1);
    expect(seleccionar).toHaveBeenCalledWith(PROYECTO);
  });
});
