# Product

## Register

brand

## Users

Technical decision-makers and creative collaborators: engineering leads, startup founders, product managers, and creative directors who need to hire or contract a Software Developer & Project Manager. They arrive from LinkedIn, GitHub, or referrals. Context: professional evaluation — comparing candidates, looking for evidence of taste + technical depth + delivery track record.

## Product Purpose

Personal portfolio for Leandro De Los Santos Aboy (Buenos Aires, Argentina). Exists to convert visits into conversations — not to list skills, but to demonstrate judgment. The site itself is the proof that he can build high-quality, intentional digital experiences. Success: a message or call initiated from the contact section.

## Brand Personality

Precise. Ambitious. Deliberate.

Engineer's rigour + art director's eye + editor's economy. Three things simultaneously and without apology.

Reference: artemiilebedev.com (Lebedev studio). High-density visual content, text as graphic element, editorial authority without decorative excess. Not "dark developer portfolio." Not "creative agency." The site should feel like it was made by someone who reads both Tufte and Emigre.

Emotional goal for the visitor: confidence. Not "this looks cool" — "this person knows what they're doing."

## Anti-references

- Generic SaaS landing pages: purple-blue gradients, glassmorphism cards, feature grids with icon+heading+text
- Typical developer portfolio: project cards on dark bg, Inter everywhere, teal or purple accent, CV disguised as website
- Behance-style portfolio: big images everywhere, minimal text, mood board aesthetic
- Agency templates: full-bleed video heroes, hamburger navigation, scattered micro-animations for their own sake
- Anything with: rounded corners, ripple effects, nested cards, grey text on colored backgrounds, numbered section markers (01/02/03 on every heading), tiny uppercase tracked eyebrows on every section

## Design Principles

1. **Text as material** — Playfair 900 at display scale is structural, not decorative. Headings carry visual weight equal to imagery.
2. **Density with intention** — High information density controlled by hierarchy, not by decoration or whitespace excess.
3. **Show, don't describe** — The Three.js hero and GSAP animations demonstrate capabilities; the copy doesn't explain them.
4. **Restraint as power** — `--color-accent-hot` (#C8F04D) appears in exactly two places: the cursor dot and the primary CTA. Its rarity is its power.
5. **Scroll as narrative** — Each section earns the next. The page is a sequence, not a dashboard.

## Accessibility & Inclusion

WCAG 2.1 AA.
- Text contrast: primary ≥7:1, secondary ≥4.5:1
- prefers-reduced-motion: GSAP globalTimeline.timeScale(0) applied in main.jsx
- Keyboard navigation: full tab order, focus-visible with --color-accent-hot outline
- Screen reader: semantic HTML (nav, main, section aria-label), skip link, descriptive aria-labels on icon-only buttons
- Touch targets: minimum 44×44px on all interactive elements
