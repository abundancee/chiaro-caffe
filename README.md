# Chiaro Caffé website

Built with Next.js (App Router), TypeScript, Tailwind CSS, Motion, GSAP and Lenis. The page moves through a day at Chiaro as you scroll. All scroll and page motion switches off for visitors who ask for reduced motion.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Edit the menu

Everything is in [`src/data/menu.ts`](src/data/menu.ts). Each item looks like this:

```ts
{ id: 7, slug: "cafe-latte", name: "Cafe Latte", description: "…", price: 7000, image: "/images/menu/cafe-latte.webp", temperature: "hot", options: [...] }
```

- **Change a name, description or price:** edit that line. Prices are plain numbers in NGN.
- **Add an item:** copy a line, then give it a new `id` and `slug`.
- **Mark a favourite:** add `popular: true`. It gets a badge and appears under the Popular filter.
- **Hot and cold filters:** set `temperature` to `"hot"` or `"cold"`.
- **Options:** `options` is what customers choose in the item sheet. `required: true` means they must pick one.
- **Home page picks:** each stage of the day (Rise, Graze, Clink, Linger) lists its items by `slug` at the top of `src/components/home/Day.tsx`.

## Fill in the business details

Open [`src/data/site.ts`](src/data/site.ts). Dashed `[PLACEHOLDER]` labels disappear on their own once the matching value is added:

- `hours`: opening hours. This also switches on the "Open now / Closed" status.
- `socials`: social links. Icons appear in the footer.
- `reviews`: real guest reviews. The rating summary is calculated from them.

The brand story placeholder is in `src/components/home/Statement.tsx`, the space photo slot is in `src/components/home/Gallery.tsx`, and the privacy policy draft is in `src/app/privacy/page.tsx`.

## Swap a photo

1. Put your photo in `public/images/menu/` (about 800×1000 px, `.webp` or `.jpg`; photos are shown small and cropped to fit).
2. Point that item's `image` at the new file in `src/data/menu.ts`.
3. Run `npm run images:process` to generate its blur placeholder. Photos without one still work; they just load without the blur.

Home page photos are in `public/images/site/`. Current photos are Pexels stock images, and `content/photo-sources.json` lists the Pexels photo used for each item ID. `npm run images:process` needs internet access if a stock photo must be downloaded again.

## Deploy to Vercel

1. Push this folder to a Git repository.
2. Import it at vercel.com. No settings need changing.
3. When you have a domain, set the environment variable `NEXT_PUBLIC_SITE_URL` (for example `https://www.example.com`) so link previews, the sitemap and structured data use it.

Point the table QR codes at `/menu`.
