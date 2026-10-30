// Business details. Anything the current site does not publish is null or empty, and the
// site shows a clearly marked placeholder until it is filled in here.

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export interface Review { name: string; rating: number; text: string }

export const site = {
  name: "Chiaro Caffé",
  tagline: "From first croissant to last cocktail.",
  description:
    "The menu at Chiaro Caffé in Lekki Phase 1, Lagos: manakish, croissants, pizza, pasta, espresso, tea, cocktails and shisha.",
  address: {
    street: "12 Victoria Arobieke Street",
    area: "Lekki Phase 1",
    city: "Lagos",
    country: "Nigeria",
    countryCode: "NG",
  },
  phone: "08189090909",
  phoneInternational: "+2348189090909",
  timeZone: "Africa/Lagos",
  // [OPENING HOURS] Not on the current site. Use 24-hour times, for example
  // mon: { open: "08:00", close: "22:00" }. Set a day to null if closed.
  // The "Open now / Closed" status appears automatically once this is filled in.
  hours: null as Record<DayKey, { open: string; close: string } | null> | null,
  // [SOCIAL LINKS] Not on the current site.
  socials: { instagram: null, facebook: null, tiktok: null, x: null, whatsapp: null } as Record<
    "instagram" | "facebook" | "tiktok" | "x" | "whatsapp",
    string | null
  >,
  // [CUSTOMER REVIEWS] The current site publishes none. Add real reviews only.
  reviews: [] as Review[],
};

export const fullAddress = `${site.address.street}, ${site.address.area}, ${site.address.city}, ${site.address.country}`;
export const mapsQuery = encodeURIComponent(fullAddress);
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

export const dayLabels: { key: DayKey; label: string }[] = [
  { key: "mon", label: "Monday" },
  { key: "tue", label: "Tuesday" },
  { key: "wed", label: "Wednesday" },
  { key: "thu", label: "Thursday" },
  { key: "fri", label: "Friday" },
  { key: "sat", label: "Saturday" },
  { key: "sun", label: "Sunday" },
];

export const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/#about", label: "About" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#visit", label: "Visit" },
];
