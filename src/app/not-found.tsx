import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-[85svh] max-w-[110rem] flex-col items-start justify-center px-4 pb-16 pt-28 md:px-8">
      <div className="arch mb-8 flex h-44 w-32 items-center justify-center border-2 border-taupe font-display text-[3rem] text-roast md:h-60 md:w-44 md:text-[4rem]" aria-hidden>
        404
      </div>
      <h1 className="max-w-[14ch] text-title">This page isn’t on the menu.</h1>
      <p className="mt-4 max-w-prose text-lg text-roast">It may have moved, or the link may be wrong. The menu is still right here.</p>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Link href="/menu" className="inline-flex h-13 items-center gap-3 rounded-card bg-espresso px-6 text-oat transition-colors hover:bg-espresso-2">
          View menu <ArrowRightIcon size={18} aria-hidden />
        </Link>
        <Link href="/" className="border-b border-espresso pb-0.5">
          Back to home
        </Link>
      </div>
    </main>
  );
}
