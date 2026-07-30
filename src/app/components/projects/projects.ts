import { Component, signal } from '@angular/core';
import { PROYECTOS } from '../../data/proyectos.data';
import { Proyecto } from '../../models/proyecto.model';
import { ProjectCard } from '../project-card/project-card';
import { ProjectModal } from '../project-modal/project-modal';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard, ProjectModal],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  proyectos = PROYECTOS;
  proyectoSeleccionado = signal<Proyecto | null>(null);

  abrirModal(proyecto: Proyecto) {
    this.proyectoSeleccionado.set(proyecto);
  }

  cerrarModal() {
    this.proyectoSeleccionado.set(null);
  }
}
