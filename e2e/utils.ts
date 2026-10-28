import { expect, Locator, Page } from '@playwright/test';

export const URL_FORMSPREE = 'https://formspree.io/f/xwvgjpoe';

export interface DatosFormulario {
  nombre: string;
  email: string;
  mensaje: string;
}

const CABECERAS_CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
};

// Intercepta Formspree: ninguna petición llega al servicio real. Devuelve la lista
// de cuerpos recibidos por POST (el preflight CORS no cuenta).
export async function simularFormspree(page: Page, estado = 200): Promise<DatosFormulario[]> {
  const recibidas: DatosFormulario[] = [];

  await page.route('https://formspree.io/**', async (route) => {
    const peticion = route.request();

    if (peticion.url() !== URL_FORMSPREE) {
      await route.abort();
      return;
    }
    if (peticion.method() === 'OPTIONS') {
      await route.fulfill({ status: 204, headers: CABECERAS_CORS });
      return;
    }

    recibidas.push(peticion.postDataJSON());
    await route.fulfill({
      status: estado,
      headers: CABECERAS_CORS,
      contentType: 'application/json',
      body: JSON.stringify({ ok: estado < 400 }),
    });
  });

  return recibidas;
}

// El html tiene scroll-behavior: smooth, así que hay que esperar a que el scroll termine.
export async function esperarScrollEstable(page: Page): Promise<void> {
  let previo = -1;
  await expect
    .poll(async () => {
      const actual = await page.evaluate(() => window.scrollY);
      const estable = actual === previo;
      previo = actual;
      return estable;
    })
    .toBe(true);
}

// Espera a que termine la animación de entrada y devuelve la caja final del elemento.
export async function cajaEstable(locator: Locator) {
  let previa = await locator.boundingBox();
  await expect
    .poll(async () => {
      const actual = await locator.boundingBox();
      const igual = JSON.stringify(actual) === JSON.stringify(previa);
      previa = actual;
      return igual;
    })
    .toBe(true);
  return previa!;
}

export const scrollActual = (page: Page): Promise<number> => page.evaluate(() => window.scrollY);

export const esMovil = (nombreProyecto: string): boolean => nombreProyecto === 'movil';
