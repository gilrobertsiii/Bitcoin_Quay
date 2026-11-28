import type { MetadataRoute } from "next";

import { SITE_DATE_MODIFIED, absoluteUrl } from "@/lib/copy";
import { ALL_ROUTES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: SITE_DATE_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.sitemapPriority,
  }));
}
