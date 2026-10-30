import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { Parallax } from "./Parallax";

export function Story() {
  return (
    <section id="about" className="mx-auto grid max-w-[110rem] gap-10 px-4 py-20 md:grid-cols-12 md:items-center md:gap-8 md:px-8 md:py-36">
      <Reveal className="md:col-span-5 md:col-start-2">
        <div className="arch relative aspect-[4/5] overflow-hidden bg-oat-2">
          <Parallax>
            <Photo src="/images/site/story.webp" alt="Milk being poured into a cup of coffee, forming latte art" fill sizes="(min-width: 768px) 40vw, 92vw" className="object-cover" />
          </Parallax>
        </div>
      </Reveal>
      <div className="md:col-span-5 md:col-start-8">
        <Reveal>
          <p className="text-eyebrow text-roast">About</p>
          <h2 className="mt-3 text-title">Chiaro is Italian for light.</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-6 text-lg text-roast">
            On Victoria Arobieke Street in Lekki Phase 1, the menu moves easily between two traditions. Flaky croissants sit next to zaatar manakish. Espresso
            and ten organic teas share a page with cocktails, wine and shisha.
          </p>
          <p className="mt-4 text-lg text-roast">Pull up a chair, take your time, and start a list of what you fancy.</p>
          <p className="mt-6 text-roast">
            <Placeholder>[BRAND STORY: founders and history, from the café]</Placeholder>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
