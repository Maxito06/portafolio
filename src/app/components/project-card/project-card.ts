import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Proyecto } from '../../models/proyecto.model';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  proyecto = input.required<Proyecto>();
  seleccionar = output<Proyecto>();
}
