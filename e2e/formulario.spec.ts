import { expect, test } from '@playwright/test';
import { simularFormspree } from './utils';

const DATOS = {
  nombre: 'Ana Perez',
  email: 'ana@correo.com',
  mensaje: 'Hola, quiero conversar.',
};

test.describe('Formulario de contacto', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  const enviar = (page: import('@playwright/test').Page) =>
    page.locator('form button[type="submit"]');

  async function llenar(page: import('@playwright/test').Page, datos = DATOS): Promise<void> {
    await page.locator('#nombre').fill(datos.nombre);
    await page.locator('#email').fill(datos.email);
    await page.locator('#mensaje').fill(datos.mensaje);
  }

  test('enviar vacío muestra los tres errores, enfoca Nombre y no hace peticiones', async ({ page }) => {
    const peticiones = await simularFormspree(page);

    await enviar(page).click();

    await expect(page.locator('#nombre-error')).toBeVisible();
    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#mensaje-error')).toBeVisible();
    await expect(page.locator('#nombre')).toBeFocused();
    expect(peticiones).toHaveLength(0);
  });

  test('un correo inválido pide un correo válido y no envía', async ({ page }) => {
    const peticiones = await simularFormspree(page);
    await llenar(page, { ...DATOS, email: 'hola@' });

    await enviar(page).click();

    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#email')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#email')).toBeFocused();
    await expect(page.locator('#nombre-error')).toHaveCount(0);
    await expect(page.locator('#mensaje-error')).toHaveCount(0);
    expect(peticiones).toHaveLength(0);
  });

  test('un envío válido muestra éxito, hace una sola petición y vacía el formulario', async ({ page }) => {
    const peticiones = await simularFormspree(page);
    await llenar(page);

    await enviar(page).click();

    await expect(page.locator('form [aria-live="polite"] p')).toBeVisible();
    expect(peticiones).toEqual([DATOS]);
    await expect(page.locator('#nombre')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
    await expect(page.locator('#mensaje')).toHaveValue('');
    await expect(page.locator('#nombre-error')).toHaveCount(0);
  });

  test('si Formspree responde con error, muestra el aviso y conserva los datos', async ({ page }) => {
    const peticiones = await simularFormspree(page, 500);
    await llenar(page);

    await enviar(page).click();

    const aviso = page.locator('form [aria-live="polite"] p');
    await expect(aviso).toBeVisible();
    await expect(aviso).toContainText('maxicopi5@gmail.com');
    expect(peticiones).toHaveLength(1);
    await expect(enviar(page)).toBeEnabled();
    await expect(page.locator('#nombre')).toHaveValue(DATOS.nombre);
    await expect(page.locator('#email')).toHaveValue(DATOS.email);
    await expect(page.locator('#mensaje')).toHaveValue(DATOS.mensaje);
  });
});
