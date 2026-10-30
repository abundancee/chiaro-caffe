import Link from "next/link";
import Image from "next/image";
import { FacebookLogoIcon, InstagramLogoIcon, TiktokLogoIcon, WhatsappLogoIcon, XLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { dayLabels, fullAddress, navLinks, site } from "@/data/site";
import { Placeholder } from "./Placeholder";
import { FooterWord } from "./FooterWord";

const socialIcons = { instagram: InstagramLogoIcon, facebook: FacebookLogoIcon, tiktok: TiktokLogoIcon, x: XLogoIcon, whatsapp: WhatsappLogoIcon };

export function Footer() {
  const socials = Object.entries(site.socials).filter(([, url]) => url) as [keyof typeof socialIcons, string][];
  return (
    <footer className="on-dark overflow-hidden bg-ink text-cream">
      <div className="mx-auto grid max-w-[110rem] gap-10 px-4 pb-12 pt-16 md:grid-cols-12 md:px-8 md:pt-28">
        <div className="md:col-span-5">
          <Image src="/images/site/logo-full-oat.png" alt={site.name} width={116} height={126} className="h-auto w-24 md:w-28" />
          <p className="serif mt-6 text-[2rem] leading-tight md:text-[2.75rem]">
            That’s the day. <span className="italic">See you tomorrow?</span>
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="eyebrow font-sans text-clay">Explore</h2>
          <ul className="mt-4 space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-4 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-2">
          <h2 className="eyebrow font-sans text-clay">Hours</h2>
          {site.hours ? (
            <ul className="mt-4 space-y-1 text-[0.9375rem] tabular-nums">
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
            <p className="mt-4">
              <Placeholder>[OPENING HOURS]</Placeholder>
            </p>
          )}
        </div>
        <div className="md:col-span-3">
          <h2 className="eyebrow font-sans text-clay">Contact</h2>
          <address className="mt-4 not-italic">
            <p>{fullAddress}</p>
            <a href={`tel:${site.phoneInternational}`} className="mt-2 block underline-offset-4 hover:underline">
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
                      <a href={url} aria-label={name} className="flex size-11 items-center justify-center hover:text-clay">
                        <Icon size={24} weight="light" aria-hidden />
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
      <div className="mx-auto flex max-w-[110rem] flex-col gap-1 px-4 pb-24 pt-5 text-[0.875rem] text-cream/75 sm:flex-row sm:justify-between md:px-8 md:pb-6">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <Link href="/privacy" className="underline-offset-4 hover:underline">
          Privacy policy
        </Link>
      </div>
    </footer>
  );
}
