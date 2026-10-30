import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Chiaro",
    description: site.description,
    start_url: "/menu",
    display: "standalone",
    background_color: "#f6f2ea",
    theme_color: "#9e836e",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
