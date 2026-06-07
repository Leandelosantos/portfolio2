// projects.js — SRS §4.3 — Única fuente de verdad de proyectos
// buenas-practicas §2 — Data Layer Pattern: componentes nunca importan datos directamente
// Estado: placeholders estructurados. Reemplazar en branch content/proyectos.
// Proyectos del Figma usados como base de naming.

export const projects = [
  {
    id: 'diamondrose-sanctuary',
    title: 'DiamondRose Sanctuary',
    year: 2024,
    category: ['Web', 'Development', 'Design'],
    client: 'DiamondRose',
    thumbnail: '/assets/projects/diamondrose-sanctuary/thumb.webp',
    video: null,
    problem: 'Placeholder — descripción del problema del cliente.',
    solution: 'Placeholder — solución implementada.',
    results: ['KPI 1 — métrica real', 'KPI 2 — métrica real'],
    techStack: ['React', 'GSAP', 'Three.js'],
    liveUrl: null,
    images: [
      '/assets/projects/diamondrose-sanctuary/01.webp',
      '/assets/projects/diamondrose-sanctuary/02.webp',
    ],
  },
  {
    id: 'vital-stats-app',
    title: 'Vital Stats App',
    year: 2024,
    category: ['Development', '3D'],
    client: 'Placeholder',
    thumbnail: '/assets/projects/vital-stats-app/thumb.webp',
    video: null,
    problem: 'Placeholder — descripción del problema del cliente.',
    solution: 'Placeholder — solución implementada.',
    results: ['KPI 1 — métrica real', 'KPI 2 — métrica real'],
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    liveUrl: null,
    images: [
      '/assets/projects/vital-stats-app/01.webp',
    ],
  },
  {
    id: 'sistema-de-diseno',
    title: 'Sistema de Diseño',
    year: 2024,
    category: ['Design', 'Development'],
    client: 'Placeholder',
    thumbnail: '/assets/projects/sistema-de-diseno/thumb.webp',
    video: null,
    problem: 'Placeholder — descripción del problema del cliente.',
    solution: 'Tokens & Componentes — sistema escalable.',
    results: ['KPI 1 — métrica real'],
    techStack: ['Figma', 'React', 'CSS Variables'],
    liveUrl: null,
    images: [
      '/assets/projects/sistema-de-diseno/01.webp',
    ],
  },
  {
    id: 'bold-flavor',
    title: 'Bold Flavor',
    year: 2024,
    category: ['Web', 'Development'],
    client: 'Placeholder',
    thumbnail: '/assets/projects/bold-flavor/thumb.webp',
    video: null,
    problem: 'Placeholder — descripción del problema del cliente.',
    solution: 'E-commerce backend con gestión de inventario.',
    results: ['KPI 1 — métrica real'],
    techStack: ['Node.js', 'React', 'MongoDB'],
    liveUrl: null,
    images: [
      '/assets/projects/bold-flavor/01.webp',
    ],
  },
  {
    id: 'semantic-search-engine',
    title: 'Semantic Search Engine',
    year: 2024,
    category: ['Development', 'AI'],
    client: 'Placeholder',
    thumbnail: '/assets/projects/semantic-search-engine/thumb.webp',
    video: null,
    problem: 'Búsqueda en documentación técnica sin contexto semántico.',
    solution: 'Motor de búsqueda contextual con embeddings vectoriales y Claude 3 Haiku.',
    results: ['KPI 1 — métrica real'],
    techStack: ['Python', 'Claude API', 'Vector DB'],
    liveUrl: null,
    images: [
      '/assets/projects/semantic-search-engine/01.webp',
    ],
  },
  {
    id: 'autonomous-code-reviewer',
    title: 'Autonomous Code Reviewer',
    year: 2024,
    category: ['Development', 'AI'],
    client: 'Placeholder',
    thumbnail: '/assets/projects/autonomous-code-reviewer/thumb.webp',
    video: null,
    problem: 'Revisión manual de PRs costosa en tiempo y propensa a errores.',
    solution: 'Sistema automatizado en CI/CD que analiza PRs e identifica vulnerabilidades lógicas.',
    results: ['KPI 1 — métrica real'],
    techStack: ['Claude API', 'GitHub Actions', 'React'],
    liveUrl: null,
    images: [
      '/assets/projects/autonomous-code-reviewer/01.webp',
    ],
  },
];

// Categorías disponibles para el filtro Flip (SRS §4.3)
export const CATEGORIES = ['All', 'Web', 'Development', 'Design', '3D', 'AI'];

// Helper — obtener proyecto por slug
export const getProjectById = (id) => projects.find((p) => p.id === id) ?? null;

// Helper — filtrar por categoría
export const filterProjects = (category) =>
  category === 'All' ? projects : projects.filter((p) => p.category.includes(category));
