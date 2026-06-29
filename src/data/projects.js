// projects.js — SRS §4.3 — Única fuente de verdad de proyectos
// buenas-practicas §2 — Data Layer Pattern: componentes nunca importan datos directamente
// Estado: mezcla de placeholders + proyectos reales en curso de carga.
// Esquema case-study: businessContext (análisis previo) → problem → solution → results.
// role: rol real desempeñado (dev full-stack, diseño, Project Manager, etc.) — no asumir "developer" por defecto.
// accentColor: hex de marca del proyecto — fondo/glow de su card en ProjectShowcase.

export const projects = [
  {
    id: "huevos-point",
    title: "Huevos Point Web",
    year: 2025, // TODO: confirmar año de lanzamiento
    category: ["Web", "Development", "3D"],
    client: "Huevos Point",
    role: "Diseño & Desarrollo Full-Stack", // TODO: confirmar rol exacto
    accentColor: "#C8F04D",
    thumbnail: "/assets/projects/huevos-point/thumb.webp",
    video: "/assets/projects/huevos-point/preview.mp4",
    businessContext:
      "Negocio de venta de huevos sin presencia digital — operaba de forma local, sin canal online para mostrar catálogo, horarios o generar contacto con nuevos clientes.",
    problem:
      "Sin sitio web, el negocio dependía exclusivamente del boca en boca y no tenía forma de transmitir profesionalismo ni diferenciarse frente a otros proveedores con presencia genérica o nula en internet.",
    solution:
      "Sitio web a medida con identidad visual propia, animaciones GSAP y un elemento 3D (Three.js) para darle al negocio una presencia digital distintiva y profesional, en lugar de una landing genérica de plantilla.",
    results: ["Presencia digital profesional con identidad de marca propia"],
    techStack: ["React", "GSAP", "Three.js"],
    liveUrl: "https://huevos-point-web.vercel.app/",
    images: ["/assets/projects/huevos-point/01.webp"],
  },
  {
    id: "huevos-point-erp",
    title: "Sistema Huevos Point ERP-SaaS",
    year: 2025, // TODO: confirmar año de lanzamiento
    category: ["Web", "Development"],
    client: "Huevos Point",
    role: "Diseño & Desarrollo Full-Stack", // TODO: confirmar rol exacto
    accentColor: "#C8F04D",
    thumbnail: "/assets/projects/huevos-point-erp/thumb.webp",
    video: "/assets/projects/huevos-point-erp/preview.mp4",
    businessContext:
      "Distribuidora de huevos multi-sucursal operaba sin sistema de gestión digital — ventas registradas a mano, stock desactualizado, sin trazabilidad de egresos ni visibilidad de métricas entre locales.",
    problem:
      "Sin panel centralizado, el dueño no podía saber cuánto vendió cada sucursal, qué productos quedaban en stock, qué gastos tuvo el día ni detectar irregularidades. Imposible escalar ni controlar el negocio a distancia.",
    solution:
      "Sistema POS web multi-tenant con ventas, stock, egresos y métricas en tiempo real desde un único panel, con cobros integrados vía MercadoPago Point.",
    results: [
      "Control operativo centralizado: todas las sucursales visibles desde un solo panel",
      "Trazabilidad completa de ventas con detalle de productos, método de pago y descuentos",
      "Dashboard diario con ingresos, egresos y saldo neto en tiempo real",
      "Stock actualizado automáticamente con cada venta registrada",
      "Gestión de compras y cajas por sucursal con historial completo",
      "Cobros con terminal MercadoPago Point integrados al sistema",
      "Auditoría de cada acción por empleado para detectar irregularidades",
      "Exportación de reportes a Excel para cierre contable",
      "Roles diferenciados (admin / empleado) con acceso controlado por sucursal",
    ],
    techStack: ["React", "Express.Js", "PostgreSQL", "MercadoPago API"],
    liveUrl: null,
    images: [],
  },
  {
    id: "cecilia-brook",
    title: "Cecilia Brook",
    year: 2024, // TODO: confirmar año de lanzamiento
    category: ["Web", "Development"],
    client: "Cecilia Brook",
    role: "Diseño & Desarrollo Full-Stack", // TODO: confirmar rol exacto
    accentColor: "#C8F04D",
    thumbnail: "/assets/projects/cecilia-brook/thumb.webp",
    video: "/assets/projects/cecilia-brook/preview.mp4",
    businessContext:
      "Cecilia Brook es una artista plástica argentina de proyección internacional — expuso en Dubái, Doha, Niza y Buenos Aires, ganó premios en el Festival Internacional de Arte de Qatar y obtuvo una medalla en los International Excellence Awards en Rusia. Sin embargo, toda esa trayectoria no tenía canal digital propio: sin sitio web para mostrar su obra, compartir su historia o recibir consultas de galerías y coleccionistas.",
    problem:
      'Su obra existe en espacios físicos de primer nivel, pero online era invisible. Quien buscara "Ceci Brook" no encontraba nada que estuviera a la altura de lo que representa: rostros femeninos al óleo sobre alfombras persas, una propuesta visual única que merece una presencia digital igual de singular. Compartir su portfolio dependía de reenviar fotos por WhatsApp o esperar que alguien la viera en una galería.',
    solution:
      "Sitio a medida en Next.js con animaciones GSAP scroll-driven y elementos 3D en Three.js, llevando la experiencia digital al mismo nivel artístico que su obra.",
    results: [
      "Presencia digital profesional con identidad visual propia — a la altura de una artista que pinta en vivo en Dubái y dirige talleres en Qatar",
      "Su trayectoria y obra ahora tienen un hogar online que transmite el mismo nivel de su trabajo físico",
    ],
    techStack: ["Next.js", "GSAP"],
    liveUrl: null,
    images: [],
  },
  // Comentados — contenido ficticio/placeholder, portfolio ya en producción.
  // Completar con datos reales y descomentar.
  /*
  {
    id: "sistema-de-diseno",
    title: "Sistema de Diseño",
    year: 2024,
    category: ["Design", "Development"],
    client: "Placeholder",
    role: "Placeholder — rol en el proyecto.",
    accentColor: "#C8F04D",
    thumbnail: "/assets/projects/sistema-de-diseno/thumb.webp",
    video: null,
    businessContext: "Placeholder — contexto de negocio previo al proyecto.",
    problem: "Placeholder — descripción del problema del cliente.",
    solution: "Tokens & Componentes — sistema escalable.",
    results: ["KPI 1 — métrica real"],
    techStack: ["Figma", "React", "CSS Variables"],
    liveUrl: null,
    images: ["/assets/projects/sistema-de-diseno/01.webp"],
  },
  {
    id: "bold-flavor",
    title: "Bold Flavor",
    year: 2024,
    category: ["Web", "Development"],
    client: "Placeholder",
    role: "Placeholder — rol en el proyecto.",
    accentColor: "#C8F04D",
    thumbnail: "/assets/projects/bold-flavor/thumb.webp",
    video: null,
    businessContext: "Placeholder — contexto de negocio previo al proyecto.",
    problem: "Placeholder — descripción del problema del cliente.",
    solution: "E-commerce backend con gestión de inventario.",
    results: ["KPI 1 — métrica real"],
    techStack: ["Node.js", "React", "MongoDB"],
    liveUrl: null,
    images: ["/assets/projects/bold-flavor/01.webp"],
  },
  {
    id: "semantic-search-engine",
    title: "Semantic Search Engine",
    year: 2024,
    category: ["Development", "AI"],
    client: "Placeholder",
    role: "Placeholder — rol en el proyecto.",
    accentColor: "#C8F04D",
    thumbnail: "/assets/projects/semantic-search-engine/thumb.webp",
    video: null,
    businessContext: "Placeholder — contexto de negocio previo al proyecto.",
    problem: "Búsqueda en documentación técnica sin contexto semántico.",
    solution:
      "Motor de búsqueda contextual con embeddings vectoriales y Claude 3 Haiku.",
    results: ["KPI 1 — métrica real"],
    techStack: ["Python", "Claude API", "Vector DB"],
    liveUrl: null,
    images: ["/assets/projects/semantic-search-engine/01.webp"],
  },
  {
    id: "autonomous-code-reviewer",
    title: "Autonomous Code Reviewer",
    year: 2024,
    category: ["Development", "AI"],
    client: "Placeholder",
    role: "Placeholder — rol en el proyecto.",
    accentColor: "#C8F04D",
    thumbnail: "/assets/projects/autonomous-code-reviewer/thumb.webp",
    video: null,
    businessContext: "Placeholder — contexto de negocio previo al proyecto.",
    problem: "Revisión manual de PRs costosa en tiempo y propensa a errores.",
    solution:
      "Sistema automatizado en CI/CD que analiza PRs e identifica vulnerabilidades lógicas.",
    results: ["KPI 1 — métrica real"],
    techStack: ["Claude API", "GitHub Actions", "React"],
    liveUrl: null,
    images: ["/assets/projects/autonomous-code-reviewer/01.webp"],
  },
  */
];

// Categorías disponibles para el filtro Flip (SRS §4.3)
export const CATEGORIES = ["All", "Web", "Development", "Design", "3D", "AI"];

// Helper — obtener proyecto por slug
export const getProjectById = (id) => projects.find((p) => p.id === id) ?? null;

// Helper — filtrar por categoría
export const filterProjects = (category) =>
  category === "All"
    ? projects
    : projects.filter((p) => p.category.includes(category));
