import type { Metadata } from "next";
import { MenuBrowser } from "@/components/menu/MenuBrowser";

export const metadata: Metadata = {
  title: "Menu",
  description: "The full Chiaro Caffé menu with prices: breakfast, salads, sandwiches, pizza, mains, desserts, espresso, tea, smoothies, cocktails, wine, beer and shisha.",
  alternates: { canonical: "/menu" },
  openGraph: { title: "Menu | Chiaro Caffé", url: "/menu" },
};

export default function MenuPage() {
  return (
    <main id="main">
      <MenuBrowser />
    </main>
  );
}
