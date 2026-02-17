import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://viveo.rs";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/zvezde`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/postani-zvezda`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/o-nama`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Dynamic celebrity pages
  let celebrityPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/celebrities?pageSize=500`);
    const body = await res.json();
    if (body.success && Array.isArray(body.data)) {
      celebrityPages = body.data.map(
        (c: { slug: string }) =>
          ({
            url: `${SITE_URL}/zvezda/${c.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          })
      );
    }
  } catch {
    // API not reachable during build — skip dynamic pages
  }

  // Dynamic category pages
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/categories`);
    const body = await res.json();
    if (body.success && Array.isArray(body.data)) {
      categoryPages = body.data.map(
        (cat: { slug: string }) =>
          ({
            url: `${SITE_URL}/kategorija/${cat.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          })
      );
    }
  } catch {
    // API not reachable during build — skip dynamic pages
  }

  return [...staticPages, ...celebrityPages, ...categoryPages];
}
