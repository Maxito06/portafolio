import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { Mock } from 'vitest';
import { Contact } from './contact';

const URL_FORMSPREE = 'https://formspree.io/f/xwvgjpoe';

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;
  let component: Contact;
  let host: HTMLElement;
  let fetchSpy: Mock<(url: string, opciones: { body: string }) => Promise<{ ok: boolean }>>;

  const campo = (id: string) =>
    host.querySelector<HTMLInputElement | HTMLTextAreaElement>(`#${id}`)!;
  const hayError = (id: string) => host.querySelector(`#${id}-error`) !== null;

  async function escribir(id: string, valor: string): Promise<void> {
    const elemento = campo(id);
    elemento.value = valor;
    elemento.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
  }

  async function salir(id: string): Promise<void> {
    campo(id).dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    await fixture.whenStable();
  }

  async function enviar(): Promise<void> {
    host.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    fixture.detectChanges();
    await fixture.whenStable();
  }

  async function llenarValido(): Promise<void> {
    await escribir('nombre', 'Ana Perez');
    await escribir('email', 'ana@correo.com');
    await escribir('mensaje', 'Hola, quiero conversar.');
  }

  beforeEach(async () => {
    // Nunca se hacen peticiones reales a Formspree.
    fetchSpy = vi.fn<(url: string, opciones: { body: string }) => Promise<{ ok: boolean }>>();
    fetchSpy.mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchSpy);

    await TestBed.configureTestingModule({
      imports: [Contact],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('validación', () => {
    it('muestra error de nombre cuando está vacío', async () => {
      await escribir('email', 'ana@correo.com');
      await escribir('mensaje', 'Hola');
      await enviar();

      expect(hayError('nombre')).toBe(true);
      expect(hayError('email')).toBe(false);
      expect(hayError('mensaje')).toBe(false);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('muestra error de correo cuando está vacío', async () => {
      await escribir('nombre', 'Ana');
      await escribir('mensaje', 'Hola');
      await enviar();

      expect(hayError('email')).toBe(true);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('muestra error de correo con formato inválido', async () => {
      await escribir('nombre', 'Ana');
      await escribir('email', 'hola@');
      await escribir('mensaje', 'Hola');
      await enviar();

      expect(hayError('email')).toBe(true);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('muestra error de mensaje cuando está vacío', async () => {
      await escribir('nombre', 'Ana');
      await escribir('email', 'ana@correo.com');
      await enviar();

      expect(hayError('mensaje')).toBe(true);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it.each(['nombre', 'mensaje'])('cuenta solo espacios en blanco como vacío en %s', async (id) => {
      await escribir('nombre', id === 'nombre' ? '   ' : 'Ana');
      await escribir('email', 'ana@correo.com');
      await escribir('mensaje', id === 'mensaje' ? '   ' : 'Hola');
      await enviar();

      expect(hayError(id)).toBe(true);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('no muestra errores antes de interactuar', () => {
      expect(hayError('nombre')).toBe(false);
      expect(hayError('email')).toBe(false);
      expect(hayError('mensaje')).toBe(false);
    });

    it('muestra el error de un campo al salir de él, y solo de ese campo', async () => {
      await salir('nombre');

      expect(hayError('nombre')).toBe(true);
      expect(hayError('email')).toBe(false);
      expect(hayError('mensaje')).toBe(false);
    });

    it('marca el campo inválido con aria-invalid y aria-describedby', async () => {
      await salir('email');

      expect(campo('email').getAttribute('aria-invalid')).toBe('true');
      expect(campo('email').getAttribute('aria-describedby')).toBe('email-error');
      expect(campo('nombre').hasAttribute('aria-invalid')).toBe(false);
    });

    it('muestra todos los errores tras intentar enviar vacío', async () => {
      await enviar();

      expect(hayError('nombre')).toBe(true);
      expect(hayError('email')).toBe(true);
      expect(hayError('mensaje')).toBe(true);
    });

    it('con errores no llama a fetch y enfoca el primer campo inválido', async () => {
      await escribir('nombre', 'Ana');
      await escribir('email', 'hola@');
      await enviar();

      expect(fetchSpy).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(campo('email'));
    });

    it('enfoca el nombre cuando todo está vacío', async () => {
      await enviar();

      expect(document.activeElement).toBe(campo('nombre'));
    });
  });

  describe('envío válido', () => {
    it('llama a fetch una vez con los datos y reinicia el formulario', async () => {
      await llenarValido();
      await enviar();
      await vi.waitFor(() => expect(component.estadoEnvio()).toBe('exito'));

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [url, opciones] = fetchSpy.mock.calls[0];
      expect(url).toBe(URL_FORMSPREE);
      expect(JSON.parse(opciones.body)).toEqual({
        nombre: 'Ana Perez',
        email: 'ana@correo.com',
        mensaje: 'Hola, quiero conversar.',
      });

      expect(component.nombre()).toBe('');
      expect(component.email()).toBe('');
      expect(component.mensaje()).toBe('');
      await vi.waitFor(() => {
        fixture.detectChanges();
        expect(campo('nombre').value).toBe('');
        expect(campo('email').value).toBe('');
        expect(campo('mensaje').value).toBe('');
      });
      expect(hayError('nombre')).toBe(false);
      expect(hayError('email')).toBe(false);
      expect(hayError('mensaje')).toBe(false);
    });

    it('conserva los datos y marca error si Formspree responde con fallo', async () => {
      fetchSpy.mockResolvedValue({ ok: false });
      await llenarValido();
      await enviar();
      await vi.waitFor(() => expect(component.estadoEnvio()).toBe('error'));

      expect(component.nombre()).toBe('Ana Perez');
      expect(component.email()).toBe('ana@correo.com');
      expect(component.mensaje()).toBe('Hola, quiero conversar.');
    });
  });
});
