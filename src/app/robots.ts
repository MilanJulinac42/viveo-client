import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://viveo.rs";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/zvezda-panel",
          "/moje-porudzbine",
          "/prijava",
          "/registracija",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
