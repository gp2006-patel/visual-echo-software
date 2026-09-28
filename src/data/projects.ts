export interface Project {
  id: string;
  title: string;
  location: string;
  year: number;
  category: string;
  image: string;
  alt: string;
  description?: string;
}

export const projects: Project[] = [
  {
    id: "p1",
    title: "Palatial Living Hall",
    location: "Indore",
    year: 2026,
    category: "Residential / Living",
    image: "/projects/project_1.jpg",
    alt: "Grand symmetrical living hall with Italian marble floor, cream sofas, chandelier and fluted brass wall panels",
    description: "A formal grand hall featuring Italian marble flooring, brushed brass wall trims, symmetrical plush cream seating, and architectural recessed cove lighting.",
  },
  {
    id: "p2",
    title: "The Sovereign Master Suite",
    location: "Indore",
    year: 2026,
    category: "Residential / Bedroom",
    image: "/projects/project_2.jpg",
    alt: "Master bedroom suite with fluted panelling, brass geometric inlays and custom wardrobe",
    description: "Serene bedroom chamber composed of geometric wall panelling with brass inlays, ribbed headboard, integrated wardrobe joinery, and ambient illumination.",
  },
  {
    id: "p3",
    title: "Bespoke Vanity & Dressing Wardrobe",
    location: "Indore",
    year: 2025,
    category: "Custom Joinery",
    image: "/projects/project_3.jpg",
    alt: "Floor to ceiling cashmere wardrobe with illuminated arched vanity mirror",
    description: "Full-height wardrobe joinery in cashmere finish paired with a warm backlit arched mirror, floating timber drawer, and display alcove.",
  },
  {
    id: "p4",
    title: "Courtyard Island Kitchen",
    location: "Indore",
    year: 2025,
    category: "Kitchen & Dining",
    image: "/projects/project_4.jpg",
    alt: "Minimalist timber kitchen island overlooking landscaped internal lightwell",
    description: "Open kitchen architecture planned around a fluted natural wood island, framed by a floor-to-ceiling glass wall looking onto an internal green lightwell.",
  },
  {
    id: "p5",
    title: "Sculptural Timber Kitchen Bar",
    location: "Indore",
    year: 2025,
    category: "Kitchen Architecture",
    image: "/projects/project_5.jpg",
    alt: "Curved fluted timber island counter with warm LED under-illumination",
    description: "Crafted fluted timber island counter featuring seamless under-counter ambient illumination, matching upper cabinetry, and an open display niche.",
  },
  {
    id: "p6",
    title: "Panoramic Chef's Kitchen Suite",
    location: "Indore",
    year: 2024,
    category: "Residential / Kitchen",
    image: "/projects/project_6.jpg",
    alt: "Dual-tone contemporary kitchen with fluted island and integrated appliances",
    description: "Dual-tone kitchen suite uniting warm vertical timber grains with smooth matte cabinetry, integrated refrigeration, and lush exterior courtyard views.",
  },
  {
    id: "p7",
    title: "Architectural Millwork & Specifications",
    location: "Indore",
    year: 2024,
    category: "Technical Shop Drawings",
    image: "/projects/project_7.jpg",
    alt: "Detailed architectural elevation and shop drawings with imperial dimensions and 3D render",
    description: "Comprehensive technical shop drawings and 3D visualization detailing wardrobe elevations, internal layout dimensions (11'-0\"), PU ivory finishes, and brass accents.",
  },
  {
    id: "p8",
    title: "Studio Principal — Ganesh Patel",
    location: "Indore",
    year: 2024,
    category: "Studio & Leadership",
    image: "/projects/project_8.jpg",
    alt: "Ganesh Patel, founder and principal designer in Indore",
    description: "Ganesh Patel leads the studio with an uncompromising commitment to material authenticity, precision joinery, and soulful architectural spaces in Indore.",
  },
];
