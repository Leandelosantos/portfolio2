// main.jsx — SRS §3.1 — GSAP global setup + prefers-reduced-motion
// buenas-practicas §3 — useGSAP hook register (nunca useEffect para GSAP)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import { lenis } from './lib/lenis.js';
import App from './App.jsx';
import './styles/globals.css';
import './styles/typography.css';

// ── GSAP — Registro de plugins — SRS §3.1 ─────────────────
gsap.registerPlugin(ScrollTrigger, Flip, TextPlugin, useGSAP);

// ── ScrollTrigger — Configuración global — SRS §3.1 ────────
ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

// ── Lenis + GSAP ticker — smooth scroll sincronizado ───────
if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// ── prefers-reduced-motion — SRS §5.3 / buenas-practicas §6 ─
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(0);
}

// ── React Root ──────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
