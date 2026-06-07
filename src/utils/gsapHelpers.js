// gsapHelpers.js — SRS §3.3 — Estrategias de reveal reutilizables
// REGLA: animar SOLO transform + opacity — nunca width/height/top/left

import { gsap } from 'gsap';

/**
 * Estrategias de reveal para uso con useGSAP + ScrollTrigger.
 * Todas retornan un tween pausado por defecto; pasar paused: false para auto-play.
 */
export const REVEAL_STRATEGIES = {
  /**
   * Chars desde abajo — para headings display y project names.
   * Usar con split-type: REVEAL_STRATEGIES.charsUp(split.chars)
   */
  charsUp: (targets, options = {}) =>
    gsap.from(targets, {
      opacity: 0,
      yPercent: 120,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.03,
      paused: true,
      ...options,
    }),

  /**
   * Fade + translate Y suave — para párrafos y elementos secundarios.
   */
  fadeUp: (targets, options = {}) =>
    gsap.from(targets, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      paused: true,
      ...options,
    }),

  /**
   * Lines desde abajo con clip — para subtítulos.
   */
  linesUp: (targets, options = {}) =>
    gsap.from(targets, {
      opacity: 0,
      yPercent: 100,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      paused: true,
      ...options,
    }),

  /**
   * ScaleX reveal desde la izquierda — para líneas divisoras y barras.
   */
  scaleX: (target, options = {}) =>
    gsap.fromTo(
      target,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.8, ease: 'power2.inOut', paused: true, ...options }
    ),

  /**
   * Fade in simple — para elementos decorativos.
   */
  fadeIn: (targets, options = {}) =>
    gsap.from(targets, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      paused: true,
      ...options,
    }),
};

/**
 * Crea un ScrollTrigger reveal estándar para secciones.
 * @param {Element|string} trigger — elemento que activa el reveal
 * @param {gsap.core.Tween} tween — tween pausado de REVEAL_STRATEGIES
 * @param {Object} stConfig — config adicional de ScrollTrigger
 */
export function createScrollReveal(trigger, tween, stConfig = {}) {
  return {
    trigger,
    start: 'top 85%',
    once: true,
    onEnter: () => tween.play(),
    ...stConfig,
  };
}

/**
 * Loader counter: anima un valor numérico de 0 a 100.
 * @param {Function} onUpdate — callback con valor actual (0-100)
 * @param {Function} onComplete — callback al terminar
 * @param {number} duration — segundos (default 1.0)
 */
export function createLoaderCounter(onUpdate, onComplete, duration = 1.0) {
  const proxy = { value: 0 };
  return gsap.to(proxy, {
    value: 100,
    duration,
    ease: 'power1.inOut',
    onUpdate: () => onUpdate(Math.round(proxy.value)),
    onComplete,
  });
}
