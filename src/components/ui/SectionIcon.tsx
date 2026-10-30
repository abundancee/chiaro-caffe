import type { Icon } from "@phosphor-icons/react";
import {
  BeerSteinIcon, CakeIcon, CoffeeBeanIcon, CoffeeIcon, DropIcon, EggCrackIcon, ForkKnifeIcon, HamburgerIcon, IceCreamIcon, LeafIcon,
  MartiniIcon, OrangeSliceIcon, PackageIcon, PintGlassIcon, PizzaIcon, ShrimpIcon, SnowflakeIcon, SparkleIcon, TeaBagIcon, WindIcon, WineIcon,
} from "@phosphor-icons/react/dist/ssr";

// One fine-line icon for each menu section.
export const sectionIcon: Record<string, Icon> = {
  breakfast: EggCrackIcon, "vibrant-salads": LeafIcon, "signature-sandwiches": HamburgerIcon, "gourmet-pizza": PizzaIcon, pizza: PizzaIcon, "main-dish": ForkKnifeIcon,
  bites: ShrimpIcon, desert: CakeIcon, "take-out": PackageIcon, espresso: CoffeeBeanIcon, "warm-up-your-heart": CoffeeIcon, "tea-garden": TeaBagIcon, "cool-me-down": SnowflakeIcon,
  "smooth-out-your-day": OrangeSliceIcon, shakelicious: IceCreamIcon, "on-the-rocks": PintGlassIcon, "italian-soda": SparkleIcon, "cool-classics": DropIcon,
  "sparkling-sensations": DropIcon, wine: WineIcon, cocktails: MartiniIcon, beer: BeerSteinIcon, shisha: WindIcon,
};

export function SectionGlyph({ id, size = 22, className = "" }: { id: string; size?: number; className?: string }) {
  const Glyph = sectionIcon[id] ?? ForkKnifeIcon;
  return <Glyph size={size} weight="light" aria-hidden className={`shrink-0 ${className}`} />;
}
