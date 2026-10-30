import { Photo } from "@/components/ui/Photo";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "./Parallax";

const tiles = [
  { src: "/images/site/gallery-pour.webp", alt: "Espresso running from a machine into a cup", className: "col-span-1 aspect-[4/5]" },
  { src: "/images/site/gallery-mojito.webp", alt: "A mojito with mint and dried orange on a black background", className: "col-span-1 aspect-[4/5] md:mt-16" },
  { space: true, className: "col-span-2 aspect-[4/3] md:col-span-1 md:aspect-[4/5]" },
  { src: "/images/site/gallery-cup.webp", alt: "A black cup of coffee with latte art on its saucer", className: "col-span-1 aspect-[4/5] md:mt-16" },
  { src: "/images/site/gallery-prawns.webp", alt: "Sautéed prawns served in a dark bowl", className: "col-span-1 aspect-[4/5] md:order-last md:col-span-2 md:aspect-[4/3]" },
  { src: "/images/site/gallery-hookah.webp", alt: "A row of hookahs on a warmly lit bar", className: "col-span-2 aspect-[4/3]" },
];

export function Gallery() {
  return (
    <section aria-labelledby="gallery-title" className="bg-oat-2">
      <div className="mx-auto max-w-[110rem] px-4 py-20 md:px-8 md:py-32">
        <Reveal>
          <p className="text-eyebrow text-roast">Gallery</p>
          <h2 id="gallery-title" className="mt-3 text-title">
            The mood at Chiaro.
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-6">
          {tiles.map((t) => (
            <Reveal key={t.src ?? "space"} className={t.className}>
              {t.space ? (
                <div className="arch flex h-full flex-col items-center justify-center bg-taupe p-6 text-center text-espresso">
                  <Placeholder>[PHOTOS OF THE SPACE]</Placeholder>
                </div>
              ) : (
                <div className="relative h-full overflow-hidden rounded-card bg-oat">
                  <Parallax amount={5}>
                    <Photo src={t.src!} alt={t.alt!} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
                  </Parallax>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
