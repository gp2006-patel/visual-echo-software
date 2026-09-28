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

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const projects: Project[] = [
  {
    id: "p1",
    title: "[Project Name]",
    location: "[City]",
    year: 2026,
    category: "Residential",
    image: u("1616486338812-3dadae4b4ace"),
    alt: "Warm minimal living room with travertine coffee table and soft daylight",
    description: "A family home reworked around light, proportion, and quiet material contrast.",
  },
  {
    id: "p2",
    title: "[Project Name]",
    location: "[City]",
    year: 2025,
    category: "Hospitality",
    image: u("1618221195710-dd6b41faaea6"),
    alt: "Hotel lounge with deep seating, brass details and layered lighting",
    description: "A lobby lounge designed as a slow, tactile arrival moment.",
  },
  {
    id: "p3",
    title: "[Project Name]",
    location: "[City]",
    year: 2025,
    category: "Commercial",
    image: u("1497366216548-37526070297c"),
    alt: "Contemporary workspace with timber joinery and diffuse natural light",
    description: "A studio headquarters translating a brand into atmosphere.",
  },
  {
    id: "p4",
    title: "[Project Name]",
    location: "[City]",
    year: 2024,
    category: "Residential",
    image: u("1600210492486-724fe5c67fb0"),
    alt: "Sculptural bedroom with linen textures and warm evening light",
    description: "A primary suite composed around stillness and touch.",
  },
  {
    id: "p5",
    title: "[Project Name]",
    location: "[City]",
    year: 2024,
    category: "Styling",
    image: u("1567016432779-094069958ea5"),
    alt: "Styled dining table with ceramics, textiles and sculptural objects",
    description: "Objects, artwork, and textiles composed with intention.",
  },
  {
    id: "p6",
    title: "[Project Name]",
    location: "[City]",
    year: 2023,
    category: "Hospitality",
    image: u("1560448204-e02f11c3d0e2"),
    alt: "Boutique hotel suite with stone bath and soft ambient glow",
    description: "A boutique suite where every surface rewards a second look.",
  },
];
