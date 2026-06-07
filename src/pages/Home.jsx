// Home.jsx — SRS §4 — Página principal (scroll completo)
// Secciones: Hero → ImpactoReal → SelectedWork → Contact

import { Hero } from '../components/sections/Hero';
import { ImpactoReal } from '../components/sections/ImpactoReal';
import { SelectedWork } from '../components/sections/SelectedWork';
import { Contact } from '../components/sections/Contact';

export function Home() {
  return (
    <main id="main-content">
      <Hero />
      <ImpactoReal />
      <SelectedWork />
      <Contact />
    </main>
  );
}
