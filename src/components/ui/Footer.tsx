import Link from "next/link";
import Image from "next/image";
import { FacebookLogoIcon, InstagramLogoIcon, TiktokLogoIcon, WhatsappLogoIcon, XLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { dayLabels, fullAddress, navLinks, site } from "@/data/site";
import { Placeholder } from "./Placeholder";
import { Mascot } from "./Mascot";
import { FooterWord } from "./FooterWord";

const socialIcons = { instagram: InstagramLogoIcon, facebook: FacebookLogoIcon, tiktok: TiktokLogoIcon, x: XLogoIcon, whatsapp: WhatsappLogoIcon };

export function Footer() {
  const socials = Object.entries(site.socials).filter(([, url]) => url) as [keyof typeof socialIcons, string][];
  return (
    <footer className="on-dark overflow-hidden bg-ink text-cream">
      <div className="mx-auto grid max-w-[100rem] gap-10 px-4 pb-10 pt-16 md:grid-cols-12 md:px-8 md:pt-24">
        <div className="md:col-span-5">
          <div className="relative w-fit text-cream">
            <Mascot mood="sleepy" className="w-24" />
            <span aria-hidden className="zzz display absolute -right-8 top-0 text-3xl text-butter">
              z
            </span>
            <span aria-hidden className="zzz display absolute -right-14 -top-3 text-xl text-butter [animation-delay:1s]">
              z
            </span>
          </div>
          <p className="display mt-5 text-[2.5rem] md:text-[3.25rem]">
            That’s the <span className="accent text-butter">day.</span>
            <br />
            See you tomorrow?
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="eyebrow font-sans text-butter">Explore</h2>
          <ul className="mt-3 space-y-1.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-medium underline-offset-4 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-2">
          <h2 className="eyebrow font-sans text-butter">Hours</h2>
          {site.hours ? (
            <ul className="mt-3 space-y-1 text-[0.9375rem] tabular-nums">
              {dayLabels.map(({ key, label }) => {
                const h = site.hours?.[key];
                return (
                  <li key={key} className="flex justify-between gap-3">
                    <span>{label.slice(0, 3)}</span>
                    <span>{h ? `${h.open}–${h.close}` : "Closed"}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3">
              <Placeholder>[OPENING HOURS]</Placeholder>
            </p>
          )}
        </div>
        <div className="md:col-span-3">
          <h2 className="eyebrow font-sans text-butter">Contact</h2>
          <address className="mt-3 not-italic">
            <p>{fullAddress}</p>
            <a href={`tel:${site.phoneInternational}`} className="mt-1 block font-medium underline-offset-4 hover:underline">
              {site.phone}
            </a>
          </address>
          <div className="mt-4">
            {socials.length ? (
              <ul className="-ml-2.5 flex gap-1">
                {socials.map(([name, url]) => {
                  const Icon = socialIcons[name];
                  return (
                    <li key={name}>
                      <a href={url} aria-label={name} className="flex size-11 items-center justify-center rounded-full hover:bg-cream/10">
                        <Icon size={24} weight="duotone" aria-hidden />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <Placeholder>[SOCIAL LINKS]</Placeholder>
            )}
          </div>
        </div>
      </div>
      <FooterWord />
      <div className="mx-auto flex max-w-[100rem] flex-col gap-1 px-4 pb-28 pt-5 text-[0.875rem] text-cream/75 sm:flex-row sm:justify-between md:px-8 md:pb-6">
        <p className="flex items-center gap-3">
          <Image src="/images/site/logo-full-oat.png" alt="" width={46} height={50} className="h-auto w-10" />
          © {new Date().getFullYear()} {site.name}
        </p>
        <Link href="/privacy" className="underline-offset-4 hover:underline">
          Privacy policy
        </Link>
      </div>
    </footer>
  );
}
