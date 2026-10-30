import Link from "next/link";
import Image from "next/image";
import { FacebookLogoIcon, InstagramLogoIcon, TiktokLogoIcon, WhatsappLogoIcon, XLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { dayLabels, fullAddress, navLinks, site } from "@/data/site";
import { Placeholder } from "./Placeholder";

const socialIcons = {
  instagram: InstagramLogoIcon,
  facebook: FacebookLogoIcon,
  tiktok: TiktokLogoIcon,
  x: XLogoIcon,
  whatsapp: WhatsappLogoIcon,
};

export function Footer() {
  const socials = Object.entries(site.socials).filter(([, url]) => url) as [keyof typeof socialIcons, string][];
  return (
    <footer className="on-dark bg-espresso text-oat">
      <div className="mx-auto grid max-w-[110rem] gap-12 px-4 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-4">
          <Image src="/images/site/logo-full-oat.png" alt={site.name} width={132} height={143} className="h-auto w-28 md:w-32" />
          <p className="mt-6 max-w-xs font-display text-subtitle">{site.tagline}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="font-sans text-eyebrow text-taupe-light">Explore</h2>
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

        <div className="md:col-span-3">
          <h2 className="font-sans text-eyebrow text-taupe-light">Hours</h2>
          {site.hours ? (
            <ul className="mt-4 space-y-1 tabular-nums">
              {dayLabels.map(({ key, label }) => {
                const h = site.hours?.[key];
                return (
                  <li key={key} className="flex justify-between gap-6">
                    <span>{label}</span>
                    <span>{h ? `${h.open} to ${h.close}` : "Closed"}</span>
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
          <h2 className="font-sans text-eyebrow text-taupe-light">Contact</h2>
          <address className="mt-4 not-italic">
            <p>{fullAddress}</p>
            <p className="mt-2">
              <a href={`tel:${site.phoneInternational}`} className="underline-offset-4 hover:underline">
                {site.phone}
              </a>
            </p>
          </address>
          <div className="mt-5">
            {socials.length ? (
              <ul className="-ml-2.5 flex gap-1">
                {socials.map(([name, url]) => {
                  const Icon = socialIcons[name];
                  return (
                    <li key={name}>
                      <a href={url} aria-label={name} className="flex size-11 items-center justify-center rounded-full hover:bg-oat/10">
                        <Icon size={22} aria-hidden />
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
      <div className="border-t border-line-dark">
        <div className="mx-auto flex max-w-[110rem] flex-col gap-2 px-4 py-6 text-[0.875rem] text-oat/75 sm:flex-row sm:justify-between md:px-8">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <Link href="/privacy" className="underline-offset-4 hover:underline">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
