import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Injector,
  OnDestroy,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { atraparTab, bloquearScroll } from '../../utils/dialogo';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header implements OnDestroy {
  private readonly injector = inject(Injector);
  private readonly botonMenu = viewChild<ElementRef<HTMLButtonElement>>('botonMenu');
  private readonly botonCerrar = viewChild<ElementRef<HTMLButtonElement>>('botonCerrar');
  private readonly overlay = viewChild<ElementRef<HTMLElement>>('overlay');
  private liberarScroll: (() => void) | null = null;
  private observador?: IntersectionObserver;

  menuAbierto = signal(false);
  // Id de la sección que cruza la zona de lectura; null mientras se ve el hero.
  seccionActiva = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      this.observador = new IntersectionObserver(
        (entradas) => {
          for (const entrada of entradas) {
            if (entrada.isIntersecting) {
              this.seccionActiva.set(entrada.target.id === 'inicio' ? null : entrada.target.id);
            }
          }
        },
        { rootMargin: '-40% 0px -55% 0px' },
      );

      for (const id of ['inicio', 'sobre-mi', 'skills', 'proyectos', 'contacto']) {
        const seccion = document.getElementById(id);
        if (seccion) {
          this.observador.observe(seccion);
        }
      }
    });
  }

  toggleMenu() {
    if (this.menuAbierto()) {
      this.cerrarMenu();
    } else {
      this.abrirMenu();
    }
  }

  cerrarMenu() {
    if (!this.menuAbierto()) {
      return;
    }
    this.menuAbierto.set(false);
    this.liberarScroll?.();
    this.liberarScroll = null;
    this.botonMenu()?.nativeElement.focus({ preventScroll: true });
  }

  @HostListener('document:keydown.escape')
  cerrarConEscape(): void {
    this.cerrarMenu();
  }

  atrapar(evento: KeyboardEvent): void {
    const overlay = this.overlay();
    if (overlay) {
      atraparTab(evento, overlay.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observador?.disconnect();
    this.liberarScroll?.();
  }

  private abrirMenu() {
    this.menuAbierto.set(true);
    this.liberarScroll = bloquearScroll();
    afterNextRender(() => this.botonCerrar()?.nativeElement.focus(), {
      injector: this.injector,
    });
  }
}
