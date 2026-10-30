import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Mascot } from "@/components/ui/Mascot";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[100svh] flex-col items-center justify-center bg-butter px-4 pb-24 pt-24 text-center">
      <Mascot mood="wow" className="bob w-32 md:w-44" />
      <h1 className="display mt-4 text-[6rem] md:text-[11rem]">404</h1>
      <p className="accent text-[2rem] leading-tight md:text-[3rem]">This page isn’t on the menu.</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/menu" className="btn bg-marmalade">
          See the menu <ArrowRightIcon size={18} weight="bold" aria-hidden />
        </Link>
        <Link href="/" className="btn bg-paper">
          Back to home
        </Link>
      </div>
    </main>
  );
}
