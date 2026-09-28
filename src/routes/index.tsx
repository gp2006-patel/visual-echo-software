import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { SelectedWork } from "@/components/work/SelectedWork";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Journal } from "@/components/sections/Journal";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/data/site";

const title = `${site.studio} — Interior Design in ${site.city} | Spaces With Soul`;
const description = `${site.studio} creates thoughtful residential, commercial, and hospitality interiors shaped by light, material, proportion, and personality.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "theme-color", content: "#0A0A0B" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: site.canonical }],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <div className="grain-overlay" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <SelectedWork />
        <Services />
        <Process />
        <Journal />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
