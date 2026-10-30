import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <main id="main" className="on-dark flex min-h-[100svh] flex-col items-start justify-center bg-ink px-4 pb-24 pt-24 text-cream md:px-8">
      <h1 className="display text-[38vw] leading-[.85] md:text-[22vw]">404</h1>
      <p className="serif mt-4 text-[2rem] leading-tight md:text-[3rem]">
        This page isn’t <span className="italic">on the menu.</span>
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Link href="/menu" className="btn bg-cream text-ink">
          See the menu <ArrowRightIcon size={18} aria-hidden />
        </Link>
        <Link href="/" className="border-b border-cream/60 pb-0.5 hover:border-cream">
          Back to home
        </Link>
      </div>
    </main>
  );
}
