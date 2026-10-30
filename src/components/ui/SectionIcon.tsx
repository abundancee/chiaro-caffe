import type { Icon } from "@phosphor-icons/react";
import {
  BeerSteinIcon, CakeIcon, CoffeeBeanIcon, CoffeeIcon, DropIcon, EggCrackIcon, ForkKnifeIcon, HamburgerIcon, IceCreamIcon, LeafIcon,
  MartiniIcon, OrangeSliceIcon, PackageIcon, PintGlassIcon, PizzaIcon, ShrimpIcon, SnowflakeIcon, SparkleIcon, TeaBagIcon, WindIcon, WineIcon,
} from "@phosphor-icons/react/dist/ssr";

// One playful icon for each menu section, plus its sticker colour.
export const sectionStyle: Record<string, { Icon: Icon; bg: string }> = {
  breakfast: { Icon: EggCrackIcon, bg: "bg-butter" },
  "vibrant-salads": { Icon: LeafIcon, bg: "bg-pistachio" },
  "signature-sandwiches": { Icon: HamburgerIcon, bg: "bg-blush" },
  "gourmet-pizza": { Icon: PizzaIcon, bg: "bg-marmalade" },
  pizza: { Icon: PizzaIcon, bg: "bg-butter" },
  "main-dish": { Icon: ForkKnifeIcon, bg: "bg-pistachio" },
  bites: { Icon: ShrimpIcon, bg: "bg-marmalade" },
  desert: { Icon: CakeIcon, bg: "bg-blush" },
  "take-out": { Icon: PackageIcon, bg: "bg-taupe" },
  espresso: { Icon: CoffeeBeanIcon, bg: "bg-taupe" },
  "warm-up-your-heart": { Icon: CoffeeIcon, bg: "bg-blush" },
  "tea-garden": { Icon: TeaBagIcon, bg: "bg-pistachio" },
  "cool-me-down": { Icon: SnowflakeIcon, bg: "bg-butter" },
  "smooth-out-your-day": { Icon: OrangeSliceIcon, bg: "bg-marmalade" },
  shakelicious: { Icon: IceCreamIcon, bg: "bg-blush" },
  "on-the-rocks": { Icon: PintGlassIcon, bg: "bg-taupe" },
  "italian-soda": { Icon: SparkleIcon, bg: "bg-pistachio" },
  "cool-classics": { Icon: DropIcon, bg: "bg-butter" },
  "sparkling-sensations": { Icon: DropIcon, bg: "bg-pistachio" },
  wine: { Icon: WineIcon, bg: "bg-blush" },
  cocktails: { Icon: MartiniIcon, bg: "bg-marmalade" },
  beer: { Icon: BeerSteinIcon, bg: "bg-butter" },
  shisha: { Icon: WindIcon, bg: "bg-taupe" },
};

export function SectionSticker({ id, size = 26, className = "" }: { id: string; size?: number; className?: string }) {
  const { Icon, bg } = sectionStyle[id] ?? { Icon: ForkKnifeIcon, bg: "bg-butter" };
  return (
    <span className={`wiggle inline-flex shrink-0 items-center justify-center rounded-[28%] border-2 border-ink text-ink ${bg} ${className}`}>
      <Icon size={size} weight="duotone" aria-hidden />
    </span>
  );
}
