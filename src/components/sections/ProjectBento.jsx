// ProjectBento.jsx — bento grid de proyectos, compartido por Home y /work
// Patrón fijo de 5 slots por bloque (big 2×2, medium 1×2, tres small 1×1) — cada
// proyecto tiene su slot asignado y NUNCA cambia de lugar/identidad de celda
// (grid-column/grid-row jamás se tocan).
//
// Al hacer hover sobre medium/small, esa card crece hasta medir lo mismo que la
// card "big" del bloque (medido en píxeles reales) y "big" se achica al tamaño
// exacto que tenía la hovereada — swap de TAMAÑO, nunca de posición.
//
// IMPORTANTE — por qué width/height y no transform:scale:
// scaleX/scaleY no uniforme estira todo el subárbol, texto incluido (se ve
// deformado). Acá se anima width/height reales — el contenido reflowea normal,
// el texto nunca se distorsiona.
//
// IMPORTANTE — por qué cada slot ancla en un borde distinto (no siempre top-left):
// si todo creciera siempre hacia abajo-derecha, una card de la última fila/columna
// del bloque se saldría del grid (y de la pantalla). Cada slot ancla en el borde
// del bloque que ya toca (big→top-left, medium→top-right, smallA→bottom-left,
// smallB→bottom-left, smallC→bottom-right) — así el crecimiento siempre queda
// contenido dentro del bloque 3×3, sin overflow. El anclaje se logra con
// translateX/Y (rígido, no distorsiona) compensando el lado que crece.
//
// Columnas en minmax(0, 1fr): evita que el contenido más ancho de una card en
// pleno crecimiento fuerce a la pista del grid a ensancharse y reacomode a las
// demás (el "reflow" que justamente queremos evitar).
//
// Al hacer hover sobre la card "big" misma: solo un scale uniforme leve (3%),
// no distorsiona texto de forma perceptible y no hace falta swap.
// Al salir del hover, todo vuelve a su tamaño y posición original.
//
// Reveal por scroll: ScrollTrigger individual por card (no uno solo para todo el grid)

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ProjectBentoCard } from '../ui/ProjectBentoCard';
import { TransitionLink } from '../ui/TransitionLink';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const isDesktop = window.matchMedia('(min-width: 768px)').matches;

const DEFAULT_SLOTS = ['big', 'medium', 'smallA', 'smallB', 'smallC'];
const SLOT_SIZE = { big: 'big', medium: 'tall', smallA: 'small', smallB: 'small', smallC: 'small' };

// Borde del bloque que cada slot ya toca — el crecimiento ancla ahí para nunca
// salirse del bloque 3×3 (ver nota arriba).
const SLOT_ANCHOR = {
  big: { h: 'left', v: 'top' },
  medium: { h: 'right', v: 'top' },
  smallA: { h: 'left', v: 'bottom' },
  smallB: { h: 'left', v: 'bottom' },
  smallC: { h: 'right', v: 'bottom' },
};

function placementFor(slot, rowOffset) {
  switch (slot) {
    case 'big':
      return { gridColumn: '1 / 3', gridRow: `${rowOffset + 1} / ${rowOffset + 3}` };
    case 'medium':
      return { gridColumn: '3 / 4', gridRow: `${rowOffset + 1} / ${rowOffset + 3}` };
    case 'smallA':
      return { gridColumn: '1 / 2', gridRow: `${rowOffset + 3} / ${rowOffset + 4}` };
    case 'smallB':
      return { gridColumn: '2 / 3', gridRow: `${rowOffset + 3} / ${rowOffset + 4}` };
    default:
      return { gridColumn: '3 / 4', gridRow: `${rowOffset + 3} / ${rowOffset + 4}` };
  }
}

function getBlocks(projects) {
  const blocks = [];
  for (let i = 0; i < projects.length; i += 5) blocks.push(projects.slice(i, i + 5));
  return blocks;
}

export function ProjectBento({ projects, ctaHref }) {
  const gridRef = useRef(null);
  const cellRefs = useRef({});
  const prefersReduced = useReducedMotion();

  // Reveal al entrar en scroll — una sola vez al montar.
  useGSAP(
    () => {
      if (prefersReduced) return;
      gsap.utils.toArray('.bento-cell').forEach((cell) => {
        gsap.from(cell, {
          opacity: 0,
          y: 24,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: cell, start: 'top 90%', once: true },
        });
      });
    },
    { scope: gridRef }
  );

  const blocks = getBlocks(projects);

  // id → id de la card "big" de su mismo bloque (siempre block[0], nunca cambia)
  // e id → slot, para saber en qué borde anclar el crecimiento.
  const bigIdOf = {};
  const slotOf = {};
  blocks.forEach((block) => {
    const bigId = block[0]?.id;
    block.forEach((p, idx) => {
      bigIdOf[p.id] = bigId;
      slotOf[p.id] = DEFAULT_SLOTS[idx] ?? 'smallC';
    });
  });

  const baselineRef = useRef({});

  const resetAll = () => {
    const els = Object.values(cellRefs.current).filter(Boolean);
    gsap.killTweensOf(els);
    gsap.set(els, { clearProps: 'width,height,x,y,scale,zIndex' });
  };

  // Anima `el` desde `fromRect` (su tamaño actual) hasta el tamaño de `toRect`,
  // ancládolo en el borde que le corresponde según `anchor` — translateX/Y
  // compensa el lado "right"/"bottom" para que ese borde no se mueva.
  function growTo(el, fromRect, toRect, anchor, zIndex) {
    const x = anchor.h === 'right' ? -(toRect.width - fromRect.width) : 0;
    const y = anchor.v === 'bottom' ? -(toRect.height - fromRect.height) : 0;
    gsap.to(el, { width: toRect.width, height: toRect.height, x, y, zIndex, duration: 0.45, ease: 'power2.out' });
  }

  const handleHoverStart = (id) => {
    if (!isDesktop || prefersReduced) return;
    const hoveredEl = cellRefs.current[id];
    const bigId = bigIdOf[id];
    const bigEl = cellRefs.current[bigId];
    if (!hoveredEl || !bigEl) return;

    // Resetear a baseline ANTES de medir — si no, un hover rápido mide tamaños
    // a mitad de tween anterior y el cálculo de tamaño objetivo sale mal.
    resetAll();

    if (id === bigId) {
      gsap.to(hoveredEl, { scale: 1.03, zIndex: 5, transformOrigin: 'center', duration: 0.4, ease: 'power2.out' });
      return;
    }

    const hoveredRect = hoveredEl.getBoundingClientRect();
    const bigRect = bigEl.getBoundingClientRect();
    baselineRef.current[id] = hoveredRect;
    baselineRef.current[bigId] = bigRect;

    growTo(hoveredEl, hoveredRect, bigRect, SLOT_ANCHOR[slotOf[id]], 5);
    growTo(bigEl, bigRect, hoveredRect, SLOT_ANCHOR.big, 1);
  };

  const handleHoverEnd = () => {
    if (!isDesktop || prefersReduced) return;
    Object.entries(cellRefs.current).forEach(([id, el]) => {
      if (!el) return;
      gsap.killTweensOf(el);
      const base = baselineRef.current[id];
      gsap.to(el, {
        width: base ? base.width : undefined,
        height: base ? base.height : undefined,
        x: 0,
        y: 0,
        scale: 1,
        zIndex: 1,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => gsap.set(el, { clearProps: 'width,height,x,y,scale,zIndex' }),
      });
    });
    baselineRef.current = {};
  };

  return (
    <div
      ref={gridRef}
      className="project-bento"
      style={{
        display: 'grid',
        gridTemplateColumns: isDesktop ? 'repeat(3, minmax(0, 1fr))' : '1fr',
        gridAutoRows: isDesktop ? 'clamp(140px, 18vw, 220px)' : 'auto',
        gap: 'clamp(1rem, 2vw, 1.5rem)',
      }}
    >
      {blocks.map((block, blockIdx) => {
        const rowOffset = blockIdx * 3;
        return block.map((project, idx) => (
          <div
            key={project.id}
            ref={(el) => {
              if (el) cellRefs.current[project.id] = el;
            }}
            className="bento-cell"
            data-project-id={project.id}
            style={{
              position: 'relative',
              ...(isDesktop ? placementFor(DEFAULT_SLOTS[idx], rowOffset) : { aspectRatio: '4 / 3' }),
            }}
          >
            <ProjectBentoCard
              project={project}
              size={isDesktop ? SLOT_SIZE[DEFAULT_SLOTS[idx]] : 'small'}
              onHoverStart={() => handleHoverStart(project.id)}
              onHoverEnd={handleHoverEnd}
            />
          </div>
        ));
      })}

      {ctaHref &&
        (() => {
          const ctaBlockIdx = Math.floor(projects.length / 5);
          const ctaSlot = DEFAULT_SLOTS[projects.length % 5] ?? 'smallC';
          return (
            <div style={isDesktop ? placementFor(ctaSlot, ctaBlockIdx * 3) : { aspectRatio: '4 / 3' }}>
              <TransitionLink
                to={ctaHref}
                className="bento-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  height: '100%',
                  border: '1px solid var(--color-border)',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent-hot)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
              >
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--color-text-primary)' }}>
                  →
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--type-mono)',
                    letterSpacing: 'var(--ls-mono)',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-secondary)',
                    textAlign: 'center',
                  }}
                >
                  Ver todos los proyectos
                </span>
              </TransitionLink>
            </div>
          );
        })()}
    </div>
  );
}
