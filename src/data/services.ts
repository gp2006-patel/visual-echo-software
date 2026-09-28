export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: "compass" | "sofa" | "palette" | "message";
}

export const services: Service[] = [
  {
    id: "s1",
    number: "01",
    title: "Interior Architecture",
    description:
      "Spatial planning, material direction, architectural detailing, and complete interior concepts.",
    icon: "compass",
  },
  {
    id: "s2",
    number: "02",
    title: "Interior Design",
    description:
      "Layered environments where furniture, lighting, texture, and proportion work as one.",
    icon: "sofa",
  },
  {
    id: "s3",
    number: "03",
    title: "Styling & Art Direction",
    description:
      "The finishing language of a space: objects, artwork, textiles, and visual composition.",
    icon: "palette",
  },
  {
    id: "s4",
    number: "04",
    title: "Design Consultation",
    description:
      "Focused creative direction for homeowners, developers, hospitality teams, and brands.",
    icon: "message",
  },
];
