import { Hero } from "@/components/home/Hero";
import { Story } from "@/components/home/Story";
import { Signature } from "@/components/home/Signature";
import { Reviews } from "@/components/home/Reviews";
import { Gallery } from "@/components/home/Gallery";
import { Visit } from "@/components/home/Visit";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Story />
      <Signature />
      <Reviews />
      <Gallery />
      <Visit />
    </main>
  );
}
