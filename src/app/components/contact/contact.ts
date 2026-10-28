import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Campo = 'nombre' | 'email' | 'mensaje';

const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CAMPOS_EN_ORDEN: Campo[] = ['nombre', 'email', 'mensaje'];

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  nombre = signal('');
  email = signal('');
  mensaje = signal('');
  estadoEnvio = signal<'idle' | 'enviando' | 'exito' | 'error'>('idle');

  private readonly tocados = signal<Record<Campo, boolean>>({
    nombre: false,
    email: false,
    mensaje: false,
  });
  private readonly intentoEnvio = signal(false);

  private readonly errorNombre = computed(() =>
    this.nombre().trim() ? '' : 'Escribe tu nombre.',
  );
  private readonly errorEmail = computed(() =>
    FORMATO_EMAIL.test(this.email().trim()) ? '' : 'Escribe un correo válido.',
  );
  private readonly errorMensaje = computed(() =>
    this.mensaje().trim() ? '' : 'Escribe un mensaje.',
  );

  // El error de un campo se muestra al salir de él o tras un intento de envío.
  errorNombreVisible = computed(() => this.visible('nombre', this.errorNombre()));
  errorEmailVisible = computed(() => this.visible('email', this.errorEmail()));
  errorMensajeVisible = computed(() => this.visible('mensaje', this.errorMensaje()));

  marcarTocado(campo: Campo): void {
    this.tocados.update((t) => ({ ...t, [campo]: true }));
  }

  async enviar() {
    this.intentoEnvio.set(true);

    const errores: Record<Campo, string> = {
      nombre: this.errorNombre(),
      email: this.errorEmail(),
      mensaje: this.errorMensaje(),
    };
    const primerInvalido = CAMPOS_EN_ORDEN.find((campo) => errores[campo]);
    if (primerInvalido) {
      document.getElementById(primerInvalido)?.focus();
      return;
    }

    this.estadoEnvio.set('enviando');
    try {
      const response = await fetch('https://formspree.io/f/xwvgjpoe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nombre: this.nombre(),
          email: this.email(),
          mensaje: this.mensaje(),
        }),
      });
      if (response.ok) {
        this.estadoEnvio.set('exito');
        this.nombre.set('');
        this.email.set('');
        this.mensaje.set('');
        this.tocados.set({ nombre: false, email: false, mensaje: false });
        this.intentoEnvio.set(false);
      } else {
        this.estadoEnvio.set('error');
      }
    } catch {
      this.estadoEnvio.set('error');
    }
  }

  private visible(campo: Campo, error: string): string {
    return this.tocados()[campo] || this.intentoEnvio() ? error : '';
  }
}
