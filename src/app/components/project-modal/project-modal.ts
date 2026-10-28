import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Proyecto } from '../../models/proyecto.model';
import { atraparTab, bloquearScroll } from '../../utils/dialogo';

@Component({
  selector: 'app-project-modal',
  imports: [],
  templateUrl: './project-modal.html',
  styleUrl: './project-modal.scss',
})
export class ProjectModal implements AfterViewInit, OnDestroy {
  proyecto = input.required<Proyecto>();
  cerrar = output<void>();

  private readonly contenido = viewChild.required<ElementRef<HTMLElement>>('contenido');
  private readonly botonCerrar = viewChild.required<ElementRef<HTMLButtonElement>>('botonCerrar');

  // Quien tenía el foco al abrir el modal, para devolvérselo al cerrar.
  private readonly elementoPrevio = document.activeElement;
  private readonly liberarScroll = bloquearScroll();

  ngAfterViewInit(): void {
    this.botonCerrar().nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.liberarScroll();
    if (this.elementoPrevio instanceof HTMLElement && document.contains(this.elementoPrevio)) {
      this.elementoPrevio.focus();
    }
  }

  @HostListener('document:keydown.escape')
  cerrarConEscape(): void {
    this.cerrar.emit();
  }

  atrapar(evento: KeyboardEvent): void {
    atraparTab(evento, this.contenido().nativeElement);
  }
}
