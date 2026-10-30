import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { Marquee } from "@/components/home/Marquee";
import { Deck } from "@/components/home/Deck";
import { Day } from "@/components/home/Day";
import { Reviews } from "@/components/home/Reviews";
import { Gallery } from "@/components/home/Gallery";
import { Visit } from "@/components/home/Visit";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Statement />
      <Marquee />
      <Day />
      <Deck />
      <Reviews />
      <Gallery />
      <Visit />
    </main>
  );
}
