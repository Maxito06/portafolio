const SELECTOR_FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Mantiene el foco del teclado dentro de `contenedor` al pulsar Tab o Shift+Tab.
export function atraparTab(evento: KeyboardEvent, contenedor: HTMLElement): void {
  if (evento.key !== 'Tab') {
    return;
  }

  const focusables = Array.from(
    contenedor.querySelectorAll<HTMLElement>(SELECTOR_FOCUSABLE),
  ).filter((el) => el.getClientRects().length > 0);

  if (focusables.length === 0) {
    evento.preventDefault();
    contenedor.focus();
    return;
  }

  const primero = focusables[0];
  const ultimo = focusables[focusables.length - 1];
  const activo = document.activeElement;
  const fueraDelContenedor = !contenedor.contains(activo);

  if (evento.shiftKey && (activo === primero || fueraDelContenedor)) {
    evento.preventDefault();
    ultimo.focus();
  } else if (!evento.shiftKey && (activo === ultimo || fueraDelContenedor)) {
    evento.preventDefault();
    primero.focus();
  }
}

// Bloquea el scroll del fondo y devuelve la función que lo restaura (idempotente).
export function bloquearScroll(): () => void {
  const overflowPrevio = document.body.style.overflow;
  let liberado = false;
  document.body.style.overflow = 'hidden';

  return () => {
    if (!liberado) {
      liberado = true;
      document.body.style.overflow = overflowPrevio;
    }
  };
}
