import type { MetadataRoute } from "next";
import { profile } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!profile.siteUrl) return [];

  return [
    {
      url: profile.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
