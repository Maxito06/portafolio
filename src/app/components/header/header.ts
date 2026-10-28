import {
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
})
export class Header implements OnDestroy {
  private readonly injector = inject(Injector);
  private readonly botonMenu = viewChild<ElementRef<HTMLButtonElement>>('botonMenu');
  private readonly botonCerrar = viewChild<ElementRef<HTMLButtonElement>>('botonCerrar');
  private readonly overlay = viewChild<ElementRef<HTMLElement>>('overlay');
  private liberarScroll: (() => void) | null = null;

  menuAbierto = signal(false);

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
