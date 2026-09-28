export interface JournalEntry {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  alt: string;
}

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const journal: JournalEntry[] = [
  {
    id: "j1",
    title: "The Tactile Weight of Malwa Stone",
    category: "Material Study",
    date: "March 2026",
    excerpt:
      "On limestone, oiled oak, and the quiet pleasure of surfaces that age rather than wear out.",
    image: "/projects/project_3.jpg",
    alt: "Bespoke joinery and material details",
  },
  {
    id: "j2",
    title: "Morning Light in High-Ceiling Haveli Interiors",
    category: "Light",
    date: "January 2026",
    excerpt:
      "How a single window, correctly proportioned, can do more for a room than any light fitting.",
    image: "/projects/project_4.jpg",
    alt: "Natural light illuminating courtyard kitchen architecture",
  },
  {
    id: "j3",
    title: "Conversations with Central India's Timber Artisans",
    category: "Studio Notes",
    date: "November 2025",
    excerpt:
      "Notes from a year of residential work, and what clients actually remember about their homes.",
    image: "/projects/project_5.jpg",
    alt: "Sculptural fluted timber craftsmanship in Indore",
  },
];
