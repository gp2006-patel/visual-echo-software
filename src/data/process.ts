export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "d1",
    number: "01",
    title: "Discover",
    description: "We listen, observe, and understand how the space needs to live.",
  },
  {
    id: "d2",
    number: "02",
    title: "Concept",
    description: "We establish the visual language, spatial direction, and material story.",
  },
  {
    id: "d3",
    number: "03",
    title: "Design",
    description:
      "Every detail is developed, from furniture to lighting and architectural elements.",
  },
  {
    id: "d4",
    number: "04",
    title: "Build",
    description: "We coordinate the transformation with clarity, precision, and care.",
  },
  {
    id: "d5",
    number: "05",
    title: "Style",
    description: "The final layer brings personality, warmth, and life into the space.",
  },
];
