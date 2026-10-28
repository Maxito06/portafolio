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
    // Se llega a la sección y se espera a que termine su reveal, como haría una persona.
    await page.evaluate(() =>
      window.scrollTo({ top: (document.querySelector('#proyectos') as HTMLElement).offsetTop + 100, behavior: 'instant' }),
    );
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.querySelector('#proyectos')!).transform))
      .toBe('none');
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

      // Se mide el estado asentado: el foco del diálogo desplaza la página y la sección termina su
      // reveal. Mientras la sección conserva un transform, el overlay fixed se mide contra ella
      // (solo ocurre al abrir por código una sección que nunca estuvo a la vista).
      await expect
        .poll(() => page.evaluate(() => getComputedStyle(document.querySelector('#proyectos')!).transform))
        .toBe('none');
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
