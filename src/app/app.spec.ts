import { TestBed } from '@angular/core/testing';
import { App } from './app';

// jsdom no implementa IntersectionObserver (lo usan el header y el scroll reveal).
class IntersectionObserverFalso {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

describe('App', () => {
  beforeEach(async () => {
    vi.stubGlobal('IntersectionObserver', IntersectionObserverFalso);
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renderiza las secciones en el orden esperado', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    const ids = Array.from(host.querySelectorAll('main > section')).map((seccion) => seccion.id);

    expect(ids).toEqual(['inicio', 'sobre-mi', 'proyectos', 'skills', 'contacto']);
  });
});
