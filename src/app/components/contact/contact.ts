import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  nombre = signal('');
  email = signal('');
  mensaje = signal('');
  estadoEnvio = signal<'idle' | 'enviando' | 'exito' | 'error'>('idle');

  async enviar() {
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
      } else {
        this.estadoEnvio.set('error');
      }
    } catch {
      this.estadoEnvio.set('error');
    }
  }
}
