import { expect, test } from '@playwright/test';
import { esMovil, esperarScrollEstable } from './utils';

const SECCIONES = ['#sobre-mi', '#proyectos', '#skills', '#contacto'];

test.describe('Navegación', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('barra de escritorio', () => {
    test.beforeEach(({}, testInfo) => {
      test.skip(esMovil(testInfo.project.name), 'La barra de enlaces solo existe en escritorio');
    });

    for (const hash of SECCIONES) {
      test(`el enlace ${hash} lleva a su sección y el título no queda tapado por el header`, async ({ page }) => {
        await page.locator(`header nav a[href="${hash}"]`).click();
        await esperarScrollEstable(page);

        await expect(page).toHaveURL(new RegExp(`${hash}$`));
        const titulo = await page.locator(`${hash} h2`).boundingBox();
        const header = await page.locator('header').boundingBox();
        const { height } = page.viewportSize()!;

        expect(titulo).not.toBeNull();
        expect(titulo!.y).toBeGreaterThanOrEqual(header!.y + header!.height - 1);
        expect(titulo!.y).toBeLessThan(height);
      });
    }
  });

  test.describe('menú móvil', () => {
    test.beforeEach(({}, testInfo) => {
      test.skip(!esMovil(testInfo.project.name), 'El menú overlay solo existe en móvil');
    });

    const abrir = async (page: import('@playwright/test').Page) => {
      await page.getByRole('button', { name: 'Abrir menú' }).click();
      const menu = page.getByRole('dialog', { name: 'Menú de navegación' });
      await expect(menu).toBeVisible();
      return menu;
    };
    const focoDentro = (page: import('@playwright/test').Page) =>
      page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'));

    test('se abre, atrapa el foco, Escape lo cierra y devuelve el foco al botón', async ({ page }) => {
      const menu = await abrir(page);

      await expect(menu.getByRole('button', { name: 'Cerrar menú' })).toBeFocused();
      for (let i = 0; i < 6; i++) {
        await page.keyboard.press('Tab');
        expect(await focoDentro(page)).toBe(true);
      }
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Shift+Tab');
        expect(await focoDentro(page)).toBe(true);
      }

      await page.keyboard.press('Escape');

      await expect(menu).toBeHidden();
      await expect(page.getByRole('button', { name: 'Abrir menú' })).toBeFocused();
    });

    for (const hash of SECCIONES) {
      test(`tocar el enlace ${hash} cierra el menú y navega a la sección`, async ({ page }) => {
        const menu = await abrir(page);

        await menu.locator(`a[href="${hash}"]`).click();

        await expect(menu).toBeHidden();
        await expect(page).toHaveURL(new RegExp(`${hash}$`));
        await esperarScrollEstable(page);
        await expect(page.locator(hash)).toBeInViewport();
      });
    }
  });

  test('"Saltar al contenido" es el primer elemento enfocable y lleva al contenido', async ({ page }) => {
    await page.keyboard.press('Tab');

    const enlace = page.locator('a[href="#contenido"]');
    await expect(enlace).toBeFocused();
    await expect(enlace).toBeInViewport();

    await page.keyboard.press('Enter');

    await expect(page.locator('main#contenido')).toBeFocused();
  });

  test('el botón de descargar CV apunta a un PDF que responde 200', async ({ page }) => {
    const enlace = page.locator('a[download]');
    const href = await enlace.getAttribute('href');

    expect(href).toMatch(/\.pdf$/);
    const respuesta = await page.request.get(href!);
    expect(respuesta.status()).toBe(200);
    expect(respuesta.headers()['content-type']).toContain('pdf');
  });
});
