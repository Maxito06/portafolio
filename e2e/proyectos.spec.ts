import { expect, Page, test } from '@playwright/test';
import { PROYECTOS } from '../src/app/data/proyectos.data';
import { cajaEstable, esperarScrollEstable, scrollActual } from './utils';

const lienzo = PROYECTOS.find((p) => p.id === 'lienzo')!;

const tarjeta = (page: Page, titulo: string) =>
  page.getByRole('button', { name: titulo, exact: true });
const dialogo = (page: Page) => page.getByRole('dialog');
const botonCerrar = (page: Page) => dialogo(page).getByRole('button', { name: 'Cerrar', exact: true });
const foco = (page: Page) =>
  page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'));

test.describe('Proyectos y modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('abrir con clic: el foco entra al diálogo, Escape lo cierra y el foco vuelve a la tarjeta', async ({ page }) => {
    const boton = tarjeta(page, lienzo.titulo);

    await boton.click();

    await expect(dialogo(page)).toBeVisible();
    await expect(botonCerrar(page)).toBeFocused();
    expect(await foco(page)).toBe(true);

    await page.keyboard.press('Escape');

    await expect(dialogo(page)).toBeHidden();
    await expect(boton).toBeFocused();
  });

  test('abrir con teclado, Enter y Espacio sobre la tarjeta', async ({ page }) => {
    const boton = tarjeta(page, lienzo.titulo);
    await boton.focus();

    await page.keyboard.press('Enter');
    await expect(dialogo(page)).toBeVisible();
    expect(await foco(page)).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialogo(page)).toBeHidden();
    await expect(boton).toBeFocused();

    await page.keyboard.press('Space');
    await expect(dialogo(page)).toBeVisible();
    expect(await foco(page)).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialogo(page)).toBeHidden();
    await expect(boton).toBeFocused();
  });

  test('el diálogo de Lienzo muestra aviso, puntos destacados y alcance y limitaciones', async ({ page }) => {
    await tarjeta(page, lienzo.titulo).click();
    const modal = dialogo(page);

    await expect(modal).toContainText(lienzo.aviso!);
    for (const punto of lienzo.destacados!) {
      await expect(modal).toContainText(punto);
    }
    await expect(modal.getByText(/puntos destacados/i)).toBeVisible();
    await expect(modal.getByText(/alcance y limitaciones/i)).toBeVisible();
    for (const limitacion of lienzo.limitaciones!) {
      await expect(modal).toContainText(limitacion);
    }
  });

  test('con el diálogo abierto el fondo no hace scroll; al cerrarlo, sí', async ({ page }) => {
    await page.evaluate(() =>
      window.scrollTo({ top: (document.querySelector('#proyectos') as HTMLElement).offsetTop + 100, behavior: 'instant' }),
    );
    // Clic programático: no mueve el scroll de la página.
    await tarjeta(page, lienzo.titulo).evaluate((el: HTMLElement) => el.click());
    await expect(dialogo(page)).toBeVisible();
    await cajaEstable(dialogo(page));

    const conDialogo = await scrollActual(page);
    await page.mouse.move(5, 5);
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(400);
    expect(await scrollActual(page)).toBe(conDialogo);

    await page.keyboard.press('Escape');
    await expect(dialogo(page)).toBeHidden();
    await esperarScrollEstable(page);

    const sinDialogo = await scrollActual(page);
    await page.mouse.move(5, 5);
    await page.mouse.wheel(0, 600);
    await expect.poll(() => scrollActual(page)).toBeGreaterThan(sinDialogo);
  });

  // Regresión: ningún ancestro del modal puede tener transform. Si la sección Proyectos conserva el
  // transform inicial del scroll reveal (aún no revelada), el overlay fixed se mide contra la sección
  // y el diálogo aparece fuera de pantalla hasta que termina el reveal. Se abre el modal por código,
  // sin llegar a la sección, y se comprueba la posición en cada cuadro desde el primer instante.
  test('el diálogo está en su sitio desde el primer instante, sin esperar al reveal', async ({ page }) => {
    await page.locator('app-project-card button').first().evaluate((el: HTMLElement) => el.click());

    const muestras = await page.evaluate(async () => {
      const siguienteCuadro = () => new Promise<void>((resolver) => requestAnimationFrame(() => resolver()));
      const limite = performance.now() + 3000;
      while (!document.querySelector('[role="dialog"]') && performance.now() < limite) {
        await siguienteCuadro();
      }

      const salida: {
        caja: { x: number; y: number; width: number; height: number };
        fondo: { x: number; y: number; width: number; height: number };
        ancho: number;
        alto: number;
      }[] = [];
      const fin = performance.now() + 400;
      while (performance.now() < fin) {
        const dialogoEl = document.querySelector('[role="dialog"]') as HTMLElement;
        const caja = dialogoEl.getBoundingClientRect();
        const fondo = (dialogoEl.parentElement as HTMLElement).getBoundingClientRect();
        salida.push({
          caja: { x: caja.x, y: caja.y, width: caja.width, height: caja.height },
          fondo: { x: fondo.x, y: fondo.y, width: fondo.width, height: fondo.height },
          ancho: window.innerWidth,
          alto: window.innerHeight,
        });
        await siguienteCuadro();
      }
      return salida;
    });

    expect(muestras.length).toBeGreaterThan(0);
    for (const { caja, fondo, ancho, alto } of muestras) {
      expect(caja.x).toBeGreaterThanOrEqual(0);
      expect(caja.y).toBeGreaterThanOrEqual(0);
      expect(caja.x + caja.width).toBeLessThanOrEqual(ancho);
      expect(caja.y + caja.height).toBeLessThanOrEqual(alto);
      expect(Math.abs(caja.x + caja.width / 2 - ancho / 2)).toBeLessThanOrEqual(20);
      expect(Math.abs(caja.y + caja.height / 2 - alto / 2)).toBeLessThanOrEqual(30);
      expect(fondo.x).toBe(0);
      expect(fondo.y).toBe(0);
      expect(fondo.height).toBe(alto);
      expect(fondo.width).toBeGreaterThanOrEqual(ancho - 20);
    }
  });

  for (const posicion of ['arriba', 'en medio', 'abajo'] as const) {
    test(`el diálogo queda dentro y centrado en la pantalla con la página ${posicion}`, async ({ page }) => {
      await page.evaluate((donde) => {
        const maximo = document.documentElement.scrollHeight - window.innerHeight;
        const top = donde === 'arriba' ? 0 : donde === 'abajo' ? maximo : maximo / 2;
        window.scrollTo({ top, behavior: 'instant' });
      }, posicion);

      // Clic programático para abrir sin mover el scroll que acabamos de fijar.
      await page.locator('app-project-card button').first().evaluate((el: HTMLElement) => el.click());
      await expect(dialogo(page)).toBeVisible();

      // cajaEstable espera solo a que termine la animación de entrada del propio diálogo.
      const caja = await cajaEstable(dialogo(page));
      const fondo = await cajaEstable(dialogo(page).locator('xpath=..'));
      const { width, height } = page.viewportSize()!;

      expect(caja.x).toBeGreaterThanOrEqual(0);
      expect(caja.y).toBeGreaterThanOrEqual(0);
      expect(caja.x + caja.width).toBeLessThanOrEqual(width);
      expect(caja.y + caja.height).toBeLessThanOrEqual(height);
      // Centrado (con margen por la barra de scroll reservada).
      expect(Math.abs(caja.x + caja.width / 2 - width / 2)).toBeLessThanOrEqual(20);
      expect(Math.abs(caja.y + caja.height / 2 - height / 2)).toBeLessThanOrEqual(30);
      // El oscurecimiento cubre toda la pantalla.
      expect(fondo.y).toBe(0);
      expect(fondo.height).toBe(height);
      expect(fondo.width).toBeGreaterThanOrEqual(width - 20);
    });
  }
});
