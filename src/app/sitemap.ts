import type { MetadataRoute } from "next";
import { articles } from "@/lib/data/articles";
import { categories } from "@/lib/data/categories";
import { authors } from "@/lib/data/authors";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const articleUrls = articles
    .filter((a) => a.status === "published")
    .map((article) => ({
      url: `${baseUrl}/article/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt),
      changeFrequency: "weekly" as const,
      priority: article.featured ? 0.9 : 0.7,
    }));

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const authorUrls = authors.map((author) => ({
    url: `${baseUrl}/author/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const staticPages = [
    { url: baseUrl, changeFrequency: "hourly" as const, priority: 1.0 },
    { url: `${baseUrl}/search`, changeFrequency: "daily" as const, priority: 0.6 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${baseUrl}/legal`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.2 },
  ].map((page) => ({ ...page, lastModified: new Date() }));

  return [...staticPages, ...articleUrls, ...categoryUrls, ...authorUrls];
}
