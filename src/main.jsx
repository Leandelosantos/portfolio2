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
import posthog from 'posthog-js';
import { PostHogProvider } from '@posthog/react';

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

// ── PostHog — init ──────────────────────────────────────────
const phToken = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN;
const phHost = import.meta.env.VITE_POSTHOG_HOST;

if (phToken && phHost) {
  posthog.init(phToken, {
    api_host: phHost,
    defaults: '2026-05-30',
    capture_pageview: 'history_change',
  });
} else if (import.meta.env.DEV) {
  console.error(
    'VITE_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_PROJECT_TOKEN is configured'
  );
}

// ── React Root ──────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </React.StrictMode>
);
