// splitTextHelpers.js — SRS §3.2 — Abstracción de split-type
// Reemplaza SplitText de Club GSAP. API compatible.
// REGLA: siempre llamar split.revert() en cleanup de useGSAP

import SplitType from 'split-type';

/**
 * Divide un elemento en chars individuales.
 * @param {string|Element} selector
 * @param {Object} options — opciones adicionales de SplitType
 * @returns {SplitType} instancia — llamar .revert() en cleanup
 */
export function splitChars(selector, options = {}) {
  return new SplitType(selector, { types: 'chars', ...options });
}

/** Divide en words. */
export function splitWords(selector, options = {}) {
  return new SplitType(selector, { types: 'words', ...options });
}

/** Divide en lines (re-calcula en resize). */
export function splitLines(selector, options = {}) {
  return new SplitType(selector, { types: 'lines', ...options });
}

/** Divide en chars + words (para hero y headings principales). */
export function splitCharsWords(selector, options = {}) {
  return new SplitType(selector, { types: 'chars,words', ...options });
}

/** Divide en chars + words + lines (uso completo). */
export function splitAll(selector, options = {}) {
  return new SplitType(selector, { types: 'chars,words,lines', ...options });
}
