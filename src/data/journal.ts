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
    title: "[Journal Title]",
    category: "Material Study",
    date: "March 2026",
    excerpt:
      "On limestone, oiled oak, and the quiet pleasure of surfaces that age rather than wear out.",
    image: u("1615529182904-14819c35db37"),
    alt: "Close study of stone and timber material samples",
  },
  {
    id: "j2",
    title: "[Journal Title]",
    category: "Light",
    date: "January 2026",
    excerpt:
      "How a single window, correctly proportioned, can do more for a room than any light fitting.",
    image: u("1505691938895-1758d7feb511"),
    alt: "Sunlight falling across a plastered interior wall",
  },
  {
    id: "j3",
    title: "[Journal Title]",
    category: "Studio Notes",
    date: "November 2025",
    excerpt:
      "Notes from a year of residential work, and what clients actually remember about their homes.",
    image: u("1493809842364-78817add7ffb"),
    alt: "Armchair and side table in a softly lit corner",
  },
];
