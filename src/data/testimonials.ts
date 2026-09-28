export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "The studio understood how we wanted the house to feel before we knew how to describe it.",
    author: "[Client Name]",
    context: "Private Residence",
  },
  {
    id: "t2",
    quote:
      "Every room arrived with a sense of calm we did not think was possible in a building this busy.",
    author: "[Client Name]",
    context: "Hospitality Group",
  },
  {
    id: "t3",
    quote:
      "They translated our brand into material and light without ever making it feel like branding.",
    author: "[Client Name]",
    context: "Luxury Brand",
  },
];
