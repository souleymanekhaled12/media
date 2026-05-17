import { prisma } from "@/lib/prisma";
import type { Article as ArticleType } from "@/types";

const articleInclude = {
  author: { select: { id: true, name: true, avatar: true, bio: true, role: true } },
  category: { select: { id: true, name: true, slug: true, description: true, color: true } },
  tags: { include: { tag: { select: { name: true, slug: true } } } },
} as const;

function toArticle(a: Awaited<ReturnType<typeof prisma.article.findFirst>> & {
  author: { id: string; name: string | null; avatar: string | null; bio: string | null; role: string };
  category: { id: string; name: string; slug: string; description: string | null; color: string };
  tags: { tag: { name: string; slug: string } }[];
}): ArticleType {
  const authorSlug = (a.author.name || "redaction")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    subtitle: a.subtitle || "",
    excerpt: a.excerpt,
    body: a.body,
    category: {
      id: a.category.id,
      name: a.category.name,
      slug: a.category.slug,
      description: a.category.description || "",
      color: a.category.color,
    },
    categorySlug: a.category.slug,
    author: {
      id: a.author.id,
      name: a.author.name || "Rédaction",
      slug: authorSlug,
      bio: a.author.bio || "",
      avatar: a.author.avatar || "/images/team/alassane-ibraima.jpg",
      role: a.author.role,
    },
    authorSlug,
    image: a.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop",
    imageCaption: a.imageCaption || undefined,
    publishedAt: (a.publishedAt || a.createdAt).toISOString(),
    readTime: a.readTime,
    views: a.views,
    status: a.status === "PUBLISHED" ? "published" : a.status === "DRAFT" ? "draft" : "scheduled",
    featured: a.featured,
    breaking: a.breaking,
    tags: a.tags.map((t) => t.tag.name),
    locale: (a.locale || "fr") as "fr" | "en",
  };
}

export async function getPublishedArticles(limit = 50): Promise<ArticleType[]> {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    include: articleInclude,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return articles.map((a) => toArticle(a as any));
}

export async function getArticleBySlugFromDb(slug: string): Promise<ArticleType | null> {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: articleInclude,
  });
  if (!article) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return toArticle(article as any);
}

export async function getArticlesByCategoryFromDb(categorySlug: string, limit = 10): Promise<ArticleType[]> {
  const articles = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      category: { slug: categorySlug },
    },
    include: articleInclude,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return articles.map((a) => toArticle(a as any));
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });
  return articles.map((a) => a.slug);
}

export async function getRelatedArticlesFromDb(articleId: string, categoryId: string, limit = 3): Promise<ArticleType[]> {
  const articles = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      categoryId,
      id: { not: articleId },
    },
    include: articleInclude,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return articles.map((a) => toArticle(a as any));
}

export async function searchArticlesInDb(query: string): Promise<ArticleType[]> {
  const articles = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { excerpt: { contains: query, mode: "insensitive" } },
        { body: { contains: query, mode: "insensitive" } },
      ],
    },
    include: articleInclude,
    orderBy: { publishedAt: "desc" },
    take: 20,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return articles.map((a) => toArticle(a as any));
}
