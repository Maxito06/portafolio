import { Component, HostListener, input, output } from '@angular/core';
import { Proyecto } from '../../models/proyecto.model';

@Component({
  selector: 'app-project-modal',
  imports: [],
  templateUrl: './project-modal.html',
  styleUrl: './project-modal.scss',
})
export class ProjectModal {
  proyecto = input.required<Proyecto>();
  cerrar = output<void>();

  @HostListener('document:keydown.escape')
  cerrarConEscape(): void {
    this.cerrar.emit();
  }
}
