import type { CSSProperties } from "react";
import { loaderLogo } from "./loader-logo";

// CSS-only so it plays on every page load, before any JavaScript runs. Skipped only for reduced motion.
export const loaderScript = `try{if(matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('no-loader')}}catch(e){}`;

// Two pleated drapes meet at a brass seam, then gather to the sides of the screen.
export function Loader() {
  return (
    <div className="loader" aria-hidden>
      <div className="drape drape-left" />
      <div className="drape drape-right" />
      <div className="loader-trim loader-trim-left" />
      <div className="loader-trim loader-trim-right" />
      <div className="loader-stage">
        <div className="loader-logo" style={{ "--logo": loaderLogo } as CSSProperties}>
          <div className="loader-logo-mask loader-logo-dim" />
          <div className="loader-logo-mask loader-logo-lit" />
        </div>
        <div className="loader-line" />
        <p className="loader-pct mt-3 font-serif text-lg italic text-cream/80" />
      </div>
    </div>
  );
}
